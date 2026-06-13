import { FC } from 'react';
import { SALES_FUNNEL_STAGES } from '../../../entities/deal/model';
import { funnelPanel, COLORS, SPACING } from '../../../shared/styles';

interface SalesFunnelProps {
  funnelCounts: Record<string, number>;
  maxFunnelCount: number;
}

const SalesFunnel: FC<SalesFunnelProps> = ({ funnelCounts, maxFunnelCount }) => (
  <div style={funnelPanel}>
    <h3 style={{ color: COLORS.dark, marginBottom: SPACING.lg }}>Воронка продаж</h3>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '200px', marginBottom: SPACING.lg, gap: SPACING.sm }}>
      {SALES_FUNNEL_STAGES.map((stage) => {
        const count = funnelCounts[stage.id] ?? 0;
        const height = (count / maxFunnelCount) * 150;
        return (
          <div key={stage.id} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ height: `${height}px`, backgroundColor: stage.color, borderRadius: '5px 5px 0 0', marginBottom: SPACING.sm, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-25px', left: 0, right: 0, fontWeight: 'bold', color: stage.color }}>
                {count}
              </div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: stage.color }}>{stage.name}</div>
            <div style={{ fontSize: '12px', color: COLORS.gray }}>{stage.probability}%</div>
          </div>
        );
      })}
    </div>
  </div>
);

export default SalesFunnel;
