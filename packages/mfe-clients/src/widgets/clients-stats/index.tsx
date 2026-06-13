import { FC } from 'react';
import { Client } from '../../entities/client/model';
import { statsGrid, statCard, statValue, statLabel, COLORS } from '../../shared/styles';

interface ClientsStatsProps {
  clients: Client[];
}

const ClientsStats: FC<ClientsStatsProps> = ({ clients }) => {
  const stats = [
    { label: 'Всего клиентов',          value: clients.length,                                          color: COLORS.primary, bg: COLORS.primaryLight },
    { label: 'Активных клиентов',       value: clients.filter((c) => c.status === 'Активный').length,   color: COLORS.success, bg: COLORS.successLight },
    { label: 'Потенциальных клиентов',  value: clients.filter((c) => c.status === 'Потенциальный').length, color: COLORS.warning, bg: COLORS.warningLight },
    { label: 'Неактивных клиентов',     value: clients.filter((c) => c.status === 'Неактивный').length, color: COLORS.danger,  bg: COLORS.dangerLight },
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

export default ClientsStats;
