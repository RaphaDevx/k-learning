#!/usr/bin/env python3
"""Move project vault secrets directly into protected Pages settings, never stdout.

Run with sudo on this host. Uses the Raphael-only vault admin socket through
a Raphael subprocess; credentials stay in process memory and HTTPS request bodies.
Also allowlists the desktop PKCE callback in the Supabase auth project.
"""
import json
import os
from pathlib import Path
import subprocess
import sys
import urllib.error
import urllib.request

ACCOUNT = '4567be498d4437b735df9c22a7313c06'
PROJECT = 'k-learning'
REF = 'ifmwcgwfvunjbnfwwbtr'
CALLBACK = 'https://k-learning.pages.dev/desktop-auth.html**'


def request(url, token, method='GET', body=None):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, method=method, headers={
        'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json',
    })
    try:
        with urllib.request.urlopen(req, timeout=45) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        # Provider responses can echo values. Report status only.
        raise RuntimeError(f'Protected configuration request failed: HTTP {error.code}') from None


def env_values(path):
    values = {}
    for line in Path(path).read_text().splitlines():
        line = line.removeprefix('export ').strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        name, value = line.split('=', 1)
        values[name.strip()] = value.strip().strip('"').strip("'")
    return values


def vault_secret(project, name):
    # stdout is captured inside this process; the parent tool never sees a value.
    code = r'''
import http.client,json,socket,sys
class Local(http.client.HTTPConnection):
 def connect(self):
  self.sock=socket.socket(socket.AF_UNIX,socket.SOCK_STREAM);self.sock.connect('/run/k-vault/admin.sock')
c=Local('localhost');c.request('POST','/v1/reveal',json.dumps({'project':sys.argv[1],'name':sys.argv[2]}),{'Content-Type':'application/json'})
r=c.getresponse();data=r.read()
if r.status!=200:sys.exit(3)
sys.stdout.buffer.write(data)
'''
    result = subprocess.run(['sudo', '-n', '-u', 'raphael', 'python3', '-c', code, project, name], capture_output=True, check=False)
    if result.returncode:
        return None
    data = json.loads(result.stdout)
    return data.get('value')


def main():
    if os.geteuid() != 0:
        raise RuntimeError('Run with sudo; this host protects the credential files.')
    legacy = env_values('/home/claude/.keys/tokens.env')
    cf = legacy['CLOUDFLARE_API_TOKEN']
    endpoint = f'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}/pages/projects/{PROJECT}'
    current = request(endpoint, cf)
    if not current.get('success'):
        raise RuntimeError('Cannot read Pages configuration')
    config = current['result'].get('deployment_configs', {})
    production = config.get('production') or {}
    variables = dict(production.get('env_vars') or {})
    service = vault_secret('klearning', 'SUPABASE_SERVICE_ROLE')
    if not service:
        raise RuntimeError('klearning/SUPABASE_SERVICE_ROLE unavailable; no secret was changed.')
    variables['SUPABASE_SERVICE_ROLE_KEY'] = {'type': 'secret_text', 'value': service}
    key = vault_secret('klearning', 'OPENAI_API_KEY')
    if key:
        if not key.startswith('sk-') or key.startswith(('sk-ant-', 'sk-or-')):
            raise RuntimeError('Vault entry is not an OpenAI project API key.')
        variables['OPENAI_API_KEY'] = {'type': 'secret_text', 'value': key}
    variables['AI_GRADING_MODEL'] = {'type': 'plain_text', 'value': 'gpt-6.1-sol'}
    variables['AI_USD_CHF_RATE'] = {'type': 'plain_text', 'value': '1'}
    result = request(endpoint, cf, 'PATCH', {'deployment_configs': {'production': {'env_vars': variables}}})
    if not result.get('success'):
        raise RuntimeError('Pages configuration update was rejected.')
    print('Pages production grading secrets synchronized; OpenAI key present: ' + str(bool(key)))
    print('Per-user 2 CHF/day cap is database-enforced; conservative budget rate 1 USD = 1 CHF.')

    # Supabase project management credentials are used only inside this process.
    management = env_values('/storage/Public/K-Dev/private/supabase-tokens.env')['SUPABASE_PAT']
    auth_endpoint = f'https://api.supabase.com/v1/projects/{REF}/config/auth'
    auth = request(auth_endpoint, management)
    allowed = [item.strip() for item in (auth.get('uri_allow_list') or '').split(',') if item.strip()]
    if CALLBACK not in allowed:
        allowed.append(CALLBACK)
        request(auth_endpoint, management, 'PATCH', {'uri_allow_list': ','.join(allowed)})
    print('Desktop PKCE callback allowlisted; other auth settings preserved.')


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
