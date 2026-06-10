// CalorAI Taste Profile — Design Tokens
// Extracted from Figma: https://www.figma.com/design/nvjb77Pfwk9Sr87odJsKPZ/CalorAI---Test-Task---React-Native-IOS

export const Colors = {
  // Backgrounds
  backgroundDark: '#0A0F0D',
  backgroundCard: '#111916',
  backgroundCardAlt: '#0D1512',

  // Gradient stops (dark → slightly lighter dark with green tint)
  gradientStart: '#070C0A',
  gradientMid: '#0D1A12',
  gradientEnd: '#0A110D',

  // Accent
  accentGreen: '#22C55E',
  accentGreenDim: '#16A34A',
  accentGreenBright: '#4ADE80',

  // Action buttons
  buttonLike: '#22C55E',    // Green heart
  buttonDislike: '#EF4444', // Red X
  buttonNotSure: '#6B7280', // Gray ?
  buttonSuperLike: '#6366F1', // Purple/Blue star

  // Glass morphism
  glassBackground: 'rgba(255, 255, 255, 0.08)',
  glassBackgroundDark: 'rgba(0, 0, 0, 0.4)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  glassBorderLight: 'rgba(255, 255, 255, 0.2)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.45)',
  textGreen: '#22C55E',

  // Progress bar
  progressTrack: 'rgba(255, 255, 255, 0.12)',
  progressFill: '#22C55E',

  // Bottom nav
  navBackground: 'rgba(15, 20, 17, 0.85)',
  navBorder: 'rgba(255, 255, 255, 0.1)',
  navIconActive: '#22C55E',
  navIconInactive: 'rgba(255, 255, 255, 0.45)',

  // Card
  cardBorder: 'rgba(255, 255, 255, 0.15)',
  cardShadow: '#000000',
  cardOverlay: 'rgba(0, 0, 0, 0.35)',

  // Misc
  white: '#FFFFFF',
  transparent: 'transparent',
};

export const Gradients = {
  // Main screen background gradient (top-to-bottom, dark with subtle green tint)
  background: ['#070C0A', '#0A1410', '#0D1A12', '#0A110D'] as string[],
  // Card overlay gradient (bottom of card for text readability)
  cardOverlay: ['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.75)'] as string[],
  // Intro screen hero section
  introCard: ['#111916', '#0A1410'] as string[],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 36,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  nav: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
  },
};

// Button sizes
export const ButtonSize = {
  actionButton: 60,  // Like/Dislike buttons
  actionButtonLg: 68, // Main like/dislike
};

// Card dimensions
export const CardDimensions = {
  width: 320,
  height: 420,
  borderRadius: 20,
};

// Progress bar
export const ProgressBar = {
  height: 4,
  borderRadius: 2,
};

// Bottom nav
export const BottomNav = {
  height: 70,
  borderRadius: 20,
};
