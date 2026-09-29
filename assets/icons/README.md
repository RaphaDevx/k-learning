# UI Icons

SVG-Icons für die App-Benutzeroberfläche.

## Konventionen
- Format: SVG, viewBox="0 0 24 24", stroke-basiert (nicht fill)
- Grösse im Code: 20px (Standard), 16px (klein), 24px (gross)
- Farbe: currentColor (erbt von Elternelement)
- Naming: `[kategorie]-[name].svg` z.B. `nav-home.svg`, `action-plus.svg`

## Empfohlene Quellen (Open Source)
- Lucide Icons: https://lucide.dev (MIT)
- Heroicons: https://heroicons.com (MIT)
- Phosphor Icons: https://phosphoricons.com (MIT)

## Verwendung in K-Learning (Vanilla JS)

```js
// Inline SVG als String
const iconHome = `<svg viewBox="0 0 24 24" width="20" height="20"
  fill="none" stroke="currentColor" stroke-width="2">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
</svg>`;
```
