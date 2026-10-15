// K-Learning design tokens — Apple HIG pass (2026-10)
//
// Identity: Eggshell canvas + Bordeaux (kept from "Fineline"), carried by colour and
// content. Navigation and controls follow iOS conventions.
//
// Layers: Global (palette) → Semantic (Colors, by role, light + dark) → Component (in screens).
// Contrast figures are WCAG ratios against `bg` of the same appearance.

import { useColorScheme } from 'react-native';
import type { TextStyle } from 'react-native';

// ── Global palette ──────────────────────────────────────────────────────────
const palette = {
  eggshell:   '#FBF9F5',
  vellum:     '#FFFFFF',
  linen:      '#F5F2EC',
  charcoal:   '#161618',
  bordeaux:   '#7A1C30',
  bordeaux2:  '#9B2840',
  rose:       '#D9667E',
  ink:        '#141213',
  inkRaised:  '#1E1B1C',
  inkHigh:    '#2A2627',
  paper:      '#F2EEE8',
} as const;

// ── Semantic colours ────────────────────────────────────────────────────────
export interface ColorTokens {
  bg: string;            // screen background
  surface: string;       // cards, grouped rows
  surfaceHigh: string;   // pressed / lifted / input fill
  separator: string;     // hairlines
  border: string;        // card outlines

  text: string;          // primary label
  textSub: string;       // secondary label (≥4.5:1)
  textMuted: string;     // tertiary: placeholders, captions (≥4.5:1)

  accent: string;        // tint: primary actions, selection, links
  onAccent: string;      // text/icons on accent fill
  accentSoft: string;    // tinted backgrounds (selected chips, badges)

  green: string;
  red: string;
  yellow: string;
  blue: string;
  greenSoft: string;
  redSoft: string;
  yellowSoft: string;

  overlay: string;       // modal scrims, video gradients
  tabBar: string;
}

export const LightColors: ColorTokens = {
  bg:          palette.eggshell,
  surface:     palette.vellum,
  surfaceHigh: palette.linen,
  separator:   'rgba(22,22,24,0.10)',
  border:      '#EAE6DF',

  text:        palette.charcoal, // 17.2:1
  textSub:     '#6B6862',        // 5.3:1
  textMuted:   '#75716A',        // 4.85:1 on #FFFFFF, 4.62:1 on #FBF9F5

  accent:      palette.bordeaux, // 9.8:1
  onAccent:    '#FFFFFF',        // 10.3:1 on accent
  accentSoft:  'rgba(122,28,48,0.08)',

  green:       '#3F6E4E',        // 5.9:1 on white
  red:         '#A8322A',        // 6.7:1
  yellow:      '#8A6510',        // 5.3:1
  blue:        '#2B5FA3',
  greenSoft:   'rgba(63,110,78,0.10)',
  redSoft:     'rgba(168,50,42,0.10)',
  yellowSoft:  'rgba(138,101,16,0.10)',

  overlay:     'rgba(0,0,0,0.45)',
  tabBar:      'rgba(251,249,245,0.94)',
};

export const DarkColors: ColorTokens = {
  bg:          palette.ink,
  surface:     palette.inkRaised,
  surfaceHigh: palette.inkHigh,
  separator:   'rgba(242,238,232,0.12)',
  border:      '#2E2A2B',

  text:        palette.paper,    // 16.1:1
  textSub:     '#A8A39A',        // 7.4:1
  textMuted:   '#8C877D',        // 5.22:1 on #141213, 4.78:1 on #1E1B1C

  accent:      palette.rose,     // 5.5:1
  onAccent:    palette.ink,      // 5.5:1 on accent
  accentSoft:  'rgba(217,102,126,0.14)',

  green:       '#7FBF92',        // 8.0:1 on surface
  red:         '#EE8A7E',        // 7.0:1
  yellow:      '#E0B657',        // 9.0:1
  blue:        '#7FA8E0',
  greenSoft:   'rgba(127,191,146,0.14)',
  redSoft:     'rgba(238,138,126,0.14)',
  yellowSoft:  'rgba(224,182,87,0.14)',

  overlay:     'rgba(0,0,0,0.6)',
  tabBar:      'rgba(20,18,19,0.94)',
};

export function useColors(): ColorTokens {
  return useColorScheme() === 'dark' ? DarkColors : LightColors;
}

export function useIsDark(): boolean {
  return useColorScheme() === 'dark';
}

// ── Typography: iOS text styles at the default (Large) Dynamic Type size ────
// Sizes/leading from HIG typography.md › Specifications › Large (default).
// RN scales these with the system text size (allowFontScaling defaults to true).
export const T = {
  largeTitle: { fontSize: 34, lineHeight: 41, fontWeight: '700', letterSpacing: 0.4 },
  title1:     { fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: 0.38 },
  title2:     { fontSize: 22, lineHeight: 28, fontWeight: '700', letterSpacing: -0.26 },
  title3:     { fontSize: 20, lineHeight: 25, fontWeight: '600', letterSpacing: -0.45 },
  headline:   { fontSize: 17, lineHeight: 22, fontWeight: '600', letterSpacing: -0.43 },
  body:       { fontSize: 17, lineHeight: 22, fontWeight: '400', letterSpacing: -0.43 },
  callout:    { fontSize: 16, lineHeight: 21, fontWeight: '400', letterSpacing: -0.31 },
  subhead:    { fontSize: 15, lineHeight: 20, fontWeight: '400', letterSpacing: -0.23 },
  footnote:   { fontSize: 13, lineHeight: 18, fontWeight: '400', letterSpacing: -0.08 },
  caption1:   { fontSize: 12, lineHeight: 16, fontWeight: '400', letterSpacing: 0 },
  caption2:   { fontSize: 11, lineHeight: 13, fontWeight: '400', letterSpacing: 0.06 },
} as const satisfies Record<string, TextStyle>;

// Cap for dense chrome (tab labels, badges) so layouts survive AX sizes.
export const MAX_SCALE_CHROME = 1.4;

// ── Spacing: 4pt grid ───────────────────────────────────────────────────────
export const S = { xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 } as const;

// Standard screen gutter (iOS readable margin on compact width)
export const GUTTER = S.lg;

// Minimum touch target (HIG accessibility: 44×44 pt)
export const HIT = 44;
export const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 } as const;

// ── Radius ──────────────────────────────────────────────────────────────────
export const R = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, full: 999 } as const;

// ── Motion ──────────────────────────────────────────────────────────────────
export const DURATION = { fast: 150, base: 250 } as const;

// ── Legacy aliases (remove once all screens use useColors/T) ────────────────
export const C = {
  ...LightColors,
  border2: LightColors.border,
  accentLight: LightColors.accent,
  accentGlow: LightColors.accentSoft,
  sakura: '#E8D5CE',
  sakuraMid: 'rgba(122,28,48,0.12)',
} as const;

export const F = { xs: 11, sm: 13, base: 15, md: 17, lg: 20, xl: 24, xxl: 30 } as const;
