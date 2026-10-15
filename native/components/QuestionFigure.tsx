import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useColors, R } from '../constants/theme';

// Renders a question's figure (HTML table, inline SVG chart or image) from exam content.
// The figures were authored for a dark surface, so they always sit on a dark panel.
// Relative asset paths resolve against the web app, which hosts exam assets.
const ASSET_BASE = 'https://k-learning.pages.dev/';
const PANEL = '#111827';
const MIN_HEIGHT = 80;

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

export default function QuestionFigure({ html, label }: { html: string; label?: string }) {
  const c = useColors();
  const [height, setHeight] = useState(MIN_HEIGHT);

  const doc = `<!doctype html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=3">
<style>
  html,body{margin:0;padding:0;background:${PANEL};color:#e5e7eb;
    font:-apple-system-body;font-family:-apple-system,system-ui,sans-serif;}
  body{padding:12px;}
  img,svg{max-width:100%;height:auto;}
  table{max-width:100%;}
</style></head><body>${html}</body></html>`;

  return (
    <View
      style={[styles.wrap, { borderColor: c.border, height }]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={label ?? 'Abbildung zur Frage'}
    >
      <WebView
        originWhitelist={['*']}
        source={{ html: doc, baseUrl: ASSET_BASE }}
        injectedJavaScript={MEASURE}
        onMessage={e => {
          const h = Number(e.nativeEvent.data);
          if (Number.isFinite(h) && h > 0) setHeight(Math.max(MIN_HEIGHT, Math.ceil(h)));
        }}
        scrollEnabled={false}
        javaScriptEnabled
        setSupportMultipleWindows={false}
        onShouldStartLoadWithRequest={req => req.url === 'about:blank' || req.url.startsWith(ASSET_BASE)}
        style={styles.web}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: R.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    backgroundColor: PANEL,
  },
  web: { backgroundColor: PANEL },
});
