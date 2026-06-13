export const COLORS = {
  primary: '#3498db',
  primaryDark: '#2980b9',
  primaryLight: '#e8f4fc',
  success: '#27ae60',
  successDark: '#229954',
  successLight: '#f0f8e8',
  warning: '#f39c12',
  warningDark: '#d68910',
  warningLight: '#fef5e7',
  danger: '#e74c3c',
  dangerLight: '#fdedec',
  purple: '#9b59b6',
  purpleLight: '#f5eef8',
  orange: '#e67e22',
  orangeLight: '#fdebd0',
  dark: '#2c3e50',
  gray: '#7f8c8d',
  grayMid: '#95a5a6',
  grayLight: '#bdc3c7',
  grayBorder: '#ddd',
  grayBorderLight: '#eee',
  bgPage: '#f5f7fa',
  bgSection: '#f8f9fa',
  white: '#ffffff',
  textLight: '#ecf0f1',
} as const;

export const SPACING = {
  xxs: '3px',
  xs: '5px',
  sm: '10px',
  md: '15px',
  lg: '20px',
  xl: '25px',
  xxl: '40px',
} as const;

export const RADIUS = {
  xs: '3px',
  sm: '5px',
  md: '8px',
  lg: '10px',
  pill: '20px',
} as const;

export const SHADOW = {
  card: '0 2px 10px rgba(0,0,0,0.1)',
  sm: '0 2px 5px rgba(0,0,0,0.1)',
  popup: '0 4px 20px rgba(0,0,0,0.15)',
  panel: '0 4px 12px rgba(0,0,0,0.08)',
} as const;

export const FONT = {
  family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  weight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;
