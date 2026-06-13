import { FC } from 'react';
import { Deal } from '../../entities/deal/model';
import { statsGrid, statCard, statValue, statLabel, COLORS } from '../../shared/styles';

interface DealsStatsProps {
  deals: Deal[];
}

const DealsStats: FC<DealsStatsProps> = ({ deals }) => {
  const activeDeals = deals.filter((d) => d.stage !== 'Закрыта' && d.stage !== 'Потеряна').length;
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  const weightedValue = deals.reduce((sum, d) => sum + (d.value * d.probability) / 100, 0);

  const stats = [
    { label: 'Всего сделок',      value: deals.length,                                    color: COLORS.primary, bg: COLORS.primaryLight },
    { label: 'Активных сделок',   value: activeDeals,                                     color: COLORS.success, bg: COLORS.successLight },
    { label: 'Общая сумма',       value: `${totalValue.toLocaleString()} ₽`,              color: COLORS.warning, bg: COLORS.warningLight },
    { label: 'Взвешенная сумма',  value: `${Math.round(weightedValue).toLocaleString()} ₽`, color: COLORS.orange, bg: COLORS.orangeLight },
  ];

  return (
    <div style={statsGrid}>
      {stats.map(({ label, value, color, bg }) => (
        <div key={label} style={statCard(color, bg)}>
          <div style={statValue(color)}>{value}</div>
          <div style={statLabel}>{label}</div>
        </div>
      ))}
    </div>
  );
};

export default DealsStats;
