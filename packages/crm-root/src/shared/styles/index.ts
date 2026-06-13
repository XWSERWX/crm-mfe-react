import { CSSProperties } from 'react';
import { COLORS, SPACING, RADIUS, SHADOW, FONT } from '@crm/types';

export { COLORS, SPACING, RADIUS, SHADOW, FONT } from '@crm/types';

export const pageWrapper: CSSProperties = {
  fontFamily: FONT.family,
  backgroundColor: COLORS.bgPage,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  color: '#333',
};

export const card: CSSProperties = {
  backgroundColor: COLORS.white,
  borderRadius: RADIUS.md,
  boxShadow: SHADOW.card,
};

export const cardPanel: CSSProperties = {
  backgroundColor: COLORS.white,
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: SHADOW.panel,
};

export const sectionHeader: CSSProperties = {
  padding: `${SPACING.md} ${SPACING.lg}`,
  backgroundColor: COLORS.dark,
  color: COLORS.white,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const navContainer: CSSProperties = {
  backgroundColor: COLORS.dark,
  padding: '0.75rem 1rem',
  borderRadius: RADIUS.md,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.75rem',
};

export const statsGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginBottom: '1.5rem',
};

export const statCard = (color: string, bg: string): CSSProperties => ({
  backgroundColor: bg,
  padding: '1.5rem',
  borderRadius: RADIUS.md,
  textAlign: 'center',
});

export const statValue = (color: string): CSSProperties => ({
  fontSize: '1.8rem',
  fontWeight: FONT.weight.bold,
  color,
});

export const emptyState: CSSProperties = {
  padding: '3rem',
  textAlign: 'center',
  color: COLORS.gray,
};

const btnBase: CSSProperties = {
  border: 'none',
  borderRadius: RADIUS.xs,
  cursor: 'pointer',
  color: COLORS.white,
  fontWeight: FONT.weight.semibold,
  fontSize: '0.9rem',
  padding: '0.4rem 0.9rem',
};

const btnSmBase: CSSProperties = {
  border: 'none',
  borderRadius: RADIUS.xs,
  cursor: 'pointer',
  color: COLORS.white,
  padding: `${SPACING.xs} ${SPACING.sm}`,
  fontSize: '12px',
};

export const btn = {
  primary: { ...btnBase, backgroundColor: COLORS.primary } as CSSProperties,
  sm: { ...btnSmBase, backgroundColor: COLORS.primary } as CSSProperties,
  smDanger: { ...btnSmBase, backgroundColor: COLORS.danger } as CSSProperties,
};
