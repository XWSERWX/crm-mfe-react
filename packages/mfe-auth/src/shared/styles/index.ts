import { CSSProperties } from 'react';
import { COLORS, SPACING, RADIUS, SHADOW, FONT } from '@crm/types';

export { COLORS, SPACING, RADIUS, SHADOW, FONT } from '@crm/types';

export const authCard = {
  blue: {
    padding: SPACING.xl,
    border: `1px solid ${COLORS.primary}`,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primaryLight,
    maxWidth: '500px',
    margin: '0 auto',
  } as CSSProperties,
  green: {
    padding: SPACING.xl,
    border: `1px solid ${COLORS.success}`,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.successLight,
    maxWidth: '500px',
    margin: '0 auto',
  } as CSSProperties,
};

export const tabContainer: CSSProperties = {
  display: 'flex',
  marginBottom: SPACING.xl,
  borderBottom: '2px solid #d6eaf8',
};

export const tabBtn = {
  active: {
    padding: '10px 24px',
    backgroundColor: 'transparent',
    color: COLORS.primaryDark,
    border: 'none',
    borderBottom: `2px solid ${COLORS.primary}`,
    marginBottom: '-2px',
    cursor: 'pointer',
    flex: 1,
    fontWeight: FONT.weight.semibold,
    fontSize: '15px',
  } as CSSProperties,
  inactive: {
    padding: '10px 24px',
    backgroundColor: 'transparent',
    color: COLORS.gray,
    border: 'none',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
    cursor: 'pointer',
    flex: 1,
    fontWeight: FONT.weight.semibold,
    fontSize: '15px',
  } as CSSProperties,
};

export const infoBlock: CSSProperties = {
  backgroundColor: COLORS.white,
  padding: SPACING.lg,
  borderRadius: RADIUS.md,
  marginBottom: SPACING.lg,
};

export const btnRow: CSSProperties = {
  display: 'flex',
  gap: SPACING.sm,
};

export const demoHint: CSSProperties = {
  marginTop: SPACING.lg,
  padding: SPACING.md,
  backgroundColor: COLORS.bgSection,
  borderRadius: RADIUS.sm,
  fontSize: '14px',
  color: COLORS.gray,
};

export const field: CSSProperties = {
  marginBottom: SPACING.md,
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

const btnBase: CSSProperties = {
  border: 'none',
  borderRadius: RADIUS.sm,
  cursor: 'pointer',
  color: COLORS.white,
  fontWeight: FONT.weight.bold,
};

export const btn = {
  primary: {
    ...btnBase,
    width: '100%',
    padding: '12px',
    backgroundColor: COLORS.primary,
    fontSize: '16px',
    marginBottom: SPACING.md,
  } as CSSProperties,
  primaryFlex: {
    ...btnBase,
    padding: `${SPACING.sm} ${SPACING.lg}`,
    backgroundColor: COLORS.primary,
    flex: 1,
  } as CSSProperties,
  dangerFlex: {
    ...btnBase,
    padding: `${SPACING.sm} ${SPACING.lg}`,
    backgroundColor: COLORS.danger,
    flex: 1,
  } as CSSProperties,
  link: {
    background: 'none',
    border: 'none',
    color: COLORS.primary,
    cursor: 'pointer',
    fontSize: '14px',
  } as CSSProperties,
};
