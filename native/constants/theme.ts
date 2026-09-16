// Fineline Palette · Eggshell Canvas & Bordeaux
// Based on wireframe-final.html design system

export const C = {
  // Backgrounds
  bg:           '#FBF9F5', // Eggshell Canvas
  surface:      '#FFFFFF', // Vellum Surface
  surfaceHigh:  '#F5F2EC', // Lifted surface

  // Borders
  border:       '#EFECE6', // Fineline Border
  border2:      '#E5E1DA',

  // Text
  text:         '#161618', // Deep Charcoal
  textSub:      '#82807A', // Muted Pencil
  textMuted:    '#B8B4AC', // Tertiary

  // Accent — Bordeaux
  accent:       '#7A1C30',
  accentLight:  '#9B2840',
  accentGlow:   'rgba(122,28,48,0.06)', // Sakura-bg tint

  // Sakura
  sakura:       '#E8D5CE',
  sakuraMid:    'rgba(122,28,48,0.12)',

  // Semantic (muted to match editorial palette)
  green:        '#4A7A5A',
  red:          '#B33A2D',
  yellow:       '#A07815',
  blue:         '#2B5FA3',
} as const;

export const R = { sm: 8, md: 12, lg: 16, xl: 20, full: 999 } as const;
export const F = { xs: 11, sm: 13, base: 15, md: 17, lg: 20, xl: 24, xxl: 30 } as const;
