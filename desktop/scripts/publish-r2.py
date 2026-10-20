#!/usr/bin/env python3
"""Upload only a verified signed release; credentials remain in process memory."""
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote
import requests

release_dir = Path(__file__).resolve().parent.parent / 'dist'
version = json.loads((release_dir.parent / 'package.json').read_text())['version']
artifact = release_dir / f'K-Learning-{version}-universal.dmg'
notarization = json.loads((release_dir / 'notarization.json').read_text())
if notarization.get('status') != 'Accepted' or not (release_dir / 'verification.txt').exists():
    sys.exit('Verified signing, stapling, Gatekeeper evidence and Apple acceptance required.')
raw = subprocess.run(['sudo', '-n', 'cat', '/home/claude/.keys/tokens.env'], check=True, capture_output=True, text=True).stdout
match = re.search(r'^CLOUDFLARE_API_TOKEN\s*=\s*[\"\']?([^\"\'\n]+)', raw, re.M)
if not match:
    sys.exit('Cloudflare token unavailable.')
token = match.group(1).strip()
raw = ''
account = '4567be498d4437b735df9c22a7313c06'
key = 'k-learning/' + artifact.name
base = 'https://pub-f8a055810aee4622b6883b39e71485fe.r2.dev'
api = f'https://api.cloudflare.com/client/v4/accounts/{account}/r2/buckets/k-advisory-releases/objects/' + quote(key, safe='/')
sha = hashlib.file_digest(artifact.open('rb'), 'sha256').hexdigest()
with artifact.open('rb') as data:
    response = requests.put(api, headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/x-apple-diskimage'}, data=data, timeout=(30, 900))
if response.status_code != 200:
    sys.exit(f'R2 upload failed HTTP {response.status_code}. No release manifest changed.')
url = base + '/' + quote(key, safe='/')
head = requests.head(url, timeout=30)
if head.status_code != 200 or int(head.headers.get('content-length', '-1')) != artifact.stat().st_size:
    sys.exit(f'Public download verification failed HTTP {head.status_code}. No release manifest changed.')
manifest_path = Path('/storage/Public/K-Dev/Projekte/K-Adv/website/releases.json')
manifest = json.loads(manifest_path.read_text())
manifest['products']['k-learning'] = {
    'version': version,
    'universal': key,
    'sha256': sha,
    'bytes': artifact.stat().st_size,
    'note': 'macOS 13+ · Apple Silicon + Intel · Signiert & notarisiert · Internet erforderlich',
}
manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
(release_dir / 'publication.json').write_text(json.dumps({'url': url, 'sha256': sha, 'bytes': artifact.stat().st_size, 'headStatus': head.status_code}, indent=2) + '\n')
print(json.dumps({'publicDownload': url, 'sha256': sha, 'bytes': artifact.stat().st_size, 'status': head.status_code}, indent=2))
