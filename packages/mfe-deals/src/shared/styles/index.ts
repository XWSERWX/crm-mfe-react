import { CSSProperties } from 'react';
import { COLORS, SPACING, RADIUS, SHADOW, FONT } from '@crm/types';

export { COLORS, SPACING, RADIUS, SHADOW, FONT } from '@crm/types';

export const appContainer: CSSProperties = {
  padding: SPACING.lg,
  backgroundColor: COLORS.bgSection,
  borderRadius: RADIUS.lg,
};

export const appHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: SPACING.xl,
  flexWrap: 'wrap',
  gap: SPACING.md,
};

export const appTitle: CSSProperties = {
  color: COLORS.dark,
  margin: 0,
};

export const card: CSSProperties = {
  backgroundColor: COLORS.white,
  borderRadius: RADIUS.md,
  overflow: 'hidden',
  boxShadow: SHADOW.card,
};

export const formCard: CSSProperties = {
  backgroundColor: COLORS.white,
  padding: SPACING.xl,
  borderRadius: RADIUS.md,
  marginBottom: SPACING.xl,
  boxShadow: SHADOW.card,
};

export const formHeading: CSSProperties = {
  color: COLORS.dark,
  marginBottom: SPACING.lg,
};

export const funnelPanel: CSSProperties = {
  backgroundColor: COLORS.white,
  padding: SPACING.xl,
  borderRadius: RADIUS.md,
  marginBottom: SPACING.xl,
  boxShadow: SHADOW.card,
};

export const sectionHeader: CSSProperties = {
  padding: `${SPACING.md} ${SPACING.lg}`,
  backgroundColor: COLORS.dark,
  color: COLORS.white,
  fontWeight: FONT.weight.bold,
};

export const tableHeadRow: CSSProperties = {
  backgroundColor: COLORS.bgSection,
};

export const tableTh: CSSProperties = {
  padding: SPACING.md,
  textAlign: 'left',
  borderBottom: `1px solid ${COLORS.grayBorder}`,
};

export const tableTd: CSSProperties = {
  padding: SPACING.md,
};

export const emptyState: CSSProperties = {
  padding: SPACING.xxl,
  textAlign: 'center',
  color: COLORS.gray,
};

export const statsGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: SPACING.md,
  marginBottom: SPACING.xl,
};

export const statCard = (color: string, bg: string): CSSProperties => ({
  backgroundColor: bg,
  padding: SPACING.lg,
  borderRadius: RADIUS.md,
  textAlign: 'center',
});

export const statValue = (color: string): CSSProperties => ({
  fontSize: '28px',
  fontWeight: FONT.weight.bold,
  color,
});

export const statLabel: CSSProperties = {
  color: COLORS.gray,
};

export const inputGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: SPACING.md,
  marginBottom: SPACING.lg,
};

export const label: CSSProperties = {
  display: 'block',
  marginBottom: SPACING.xs,
  fontWeight: FONT.weight.medium,
};

export const input: CSSProperties = {
  width: '100%',
  padding: SPACING.sm,
  border: `1px solid ${COLORS.grayLight}`,
  borderRadius: RADIUS.sm,
  boxSizing: 'border-box',
};

export const selectInput: CSSProperties = {
  ...input,
  backgroundColor: COLORS.white,
};

export const filterContainer: CSSProperties = {
  display: 'flex',
  gap: SPACING.md,
  marginBottom: SPACING.xl,
  flexWrap: 'wrap',
};

export const btnRow: CSSProperties = {
  display: 'flex',
  gap: SPACING.sm,
};

export const actionCell: CSSProperties = {
  display: 'flex',
  gap: '8px',
};

export const probBarTrack: CSSProperties = {
  width: '100%',
  height: '10px',
  backgroundColor: COLORS.textLight,
  borderRadius: RADIUS.sm,
  overflow: 'hidden',
};

export const probFill = (probability: number): CSSProperties => ({
  width: `${probability}%`,
  height: '100%',
  backgroundColor:
    probability >= 70 ? COLORS.success : probability >= 40 ? COLORS.warning : COLORS.danger,
});

export const stageSelect = (color: string): CSSProperties => ({
  padding: `${SPACING.xs} ${SPACING.sm}`,
  borderRadius: RADIUS.pill,
  backgroundColor: `${color}20`,
  color,
  border: `1px solid ${color}`,
  fontWeight: FONT.weight.medium,
  cursor: 'pointer',
});

const btnBase: CSSProperties = {
  border: 'none',
  borderRadius: RADIUS.sm,
  cursor: 'pointer',
  color: COLORS.white,
  fontWeight: FONT.weight.bold,
};

const btnSmBase: CSSProperties = {
  border: 'none',
  borderRadius: RADIUS.xs,
  cursor: 'pointer',
  color: COLORS.white,
  padding: `${SPACING.xs} ${SPACING.sm}`,
  fontSize: '14px',
};

export const btn = {
  accent: { ...btnBase, padding: `${SPACING.sm} ${SPACING.lg}`, backgroundColor: COLORS.purple } as CSSProperties,
  submit: { ...btnBase, padding: '10px 25px', backgroundColor: COLORS.purple } as CSSProperties,
  cancel: { ...btnBase, padding: '10px 25px', backgroundColor: COLORS.grayMid, fontWeight: FONT.weight.normal } as CSSProperties,
  edit: { ...btnSmBase, backgroundColor: COLORS.primary } as CSSProperties,
  delete: { ...btnSmBase, backgroundColor: COLORS.danger } as CSSProperties,
};
