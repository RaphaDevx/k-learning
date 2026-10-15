import { useMemo, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import { WebView } from 'react-native-webview';
import { useColors, T } from '../constants/theme';

// Rendert Karten-/Prüfungstext mit Markdown-Fett (**x**) und LaTeX ($…$, $$…$$).
// Ohne `$` reines RN-Text-Rendering; mit `$` ein WebView mit KaTeX (CDN).
// cloze: 'hide' ersetzt {{x}} durch […], 'reveal' hebt x fett hervor.

export type RichTextVariant = 'title' | 'headline' | 'body';

interface Props {
  text: string;
  variant?: RichTextVariant;
  align?: 'left' | 'center';
  color?: string;
  cloze?: 'hide' | 'reveal';
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

const KATEX = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist';
const MIN_HEIGHT = 24;
const MATH_RE = /\$\$[\s\S]*?\$\$|\$[^$\n]+?\$/g;

const VARIANT = {
  title: { size: T.title3.fontSize, line: T.title3.lineHeight, weight: '600' },
  headline: { size: T.headline.fontSize, line: T.headline.lineHeight, weight: '600' },
  body: { size: T.body.fontSize, line: T.body.lineHeight, weight: '400' },
} as const;

const STYLE_KEY = { title: 'title3', headline: 'headline', body: 'body' } as const;

function applyCloze(text: string, mode?: 'hide' | 'reveal'): string {
  if (!mode) return text;
  return text.replace(/\{\{(?:c\d+::)?([\s\S]*?)(?:::[^}]*)?\}\}/g, (_, inner: string) =>
    mode === 'hide' ? '[…]' : `**${inner}**`,
  );
}

function plain(text: string): string {
  return text.replace(MATH_RE, m => m.replace(/\$/g, '')).replace(/\*\*/g, '');
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Fett nur ausserhalb von Formeln umwandeln.
function toHtml(text: string): string {
  let out = '';
  let last = 0;
  const bold = (s: string) =>
    escapeHtml(s).replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  for (const m of text.matchAll(MATH_RE)) {
    const i = m.index ?? 0;
    out += bold(text.slice(last, i)) + escapeHtml(m[0]);
    last = i + m[0].length;
  }
  return out + bold(text.slice(last));
}

const MEASURE = `
  (function () {
    function post() {
      window.ReactNativeWebView.postMessage(String(document.body.scrollHeight));
    }
    window.addEventListener('load', post);
    new ResizeObserver(post).observe(document.body);
    post();
  })();
  true;
`;

function PlainText({ text, variant, align, color, style, numberOfLines }: Required<Pick<Props, 'text' | 'variant' | 'align'>> & Pick<Props, 'color' | 'style' | 'numberOfLines'>) {
  const c = useColors();
  const parts = text.split(/(\*\*[\s\S]+?\*\*)/g).filter(Boolean);
  return (
    <Text numberOfLines={numberOfLines} style={[T[STYLE_KEY[variant]], { color: color ?? c.text, textAlign: align }, style]}>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') && p.length > 4
          ? <Text key={i} style={styles.bold}>{p.slice(2, -2)}</Text>
          : p,
      )}
    </Text>
  );
}

export default function RichText({ text, variant = 'body', align = 'left', color, cloze, numberOfLines, style }: Props) {
  const c = useColors();
  const [height, setHeight] = useState<number>(VARIANT[variant].line);
  const src = applyCloze(text ?? '', cloze);
  const hasMath = src.includes('$');
  const textColor = color ?? c.text;

  const doc = useMemo(() => {
    const v = VARIANT[variant];
    return `<!doctype html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<link rel="stylesheet" href="${KATEX}/katex.min.css">
<script defer src="${KATEX}/katex.min.js"></script>
<script defer src="${KATEX}/contrib/auto-render.min.js"></script>
<style>
  html,body{margin:0;padding:0;background:transparent;}
  body{color:${textColor};font-family:-apple-system,system-ui,sans-serif;
    font-size:${v.size}px;line-height:${v.line}px;font-weight:${v.weight};
    text-align:${align};-webkit-text-size-adjust:none;overflow-wrap:anywhere;}
  strong{font-weight:700;}
  .katex-display{margin:8px 0;overflow-x:auto;overflow-y:hidden;}
</style></head><body><div id="c">${toHtml(src)}</div>
<script>
  window.addEventListener('load', function () {
    if (window.renderMathInElement) {
      renderMathInElement(document.getElementById('c'), {
        delimiters: [{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],
        throwOnError: false
      });
    }
  });
</script></body></html>`;
  }, [src, variant, align, textColor]);

  if (!hasMath) {
    return <PlainText text={src} variant={variant} align={align} color={color} style={style} numberOfLines={numberOfLines} />;
  }

  return (
    <View
      style={{
        height: numberOfLines ? Math.min(height, numberOfLines * VARIANT[variant].line) : height,
        alignSelf: 'stretch',
        overflow: 'hidden',
      }}
      pointerEvents="none"
      accessible
      accessibilityLabel={plain(src)}
    >
      <WebView
        originWhitelist={['*']}
        source={{ html: doc }}
        injectedJavaScript={MEASURE}
        onMessage={e => {
          const h = Number(e.nativeEvent.data);
          if (Number.isFinite(h) && h > 0) setHeight(Math.max(MIN_HEIGHT, Math.ceil(h)));
        }}
        scrollEnabled={false}
        javaScriptEnabled
        setSupportMultipleWindows={false}
        onShouldStartLoadWithRequest={req => req.url === 'about:blank'}
        style={styles.web}
        containerStyle={styles.web}
        opaque={false}
        androidLayerType="hardware"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bold: { fontWeight: '700' },
  web: { backgroundColor: 'transparent' },
});
