import { FC } from 'react';
import { useSimpleStore } from '../app/store/SimpleStore';
import { statsGrid, statCard, statValue, card, COLORS, SPACING } from '../shared/styles';

const DashboardPage: FC = () => {
  const { state } = useSimpleStore();
  const { clients, deals, notifications } = state;

  const activeClients = clients.filter((c) => c.status === 'Активный').length;
  const activeDeals = deals.filter((d) => d.stage !== 'Закрыта' && d.stage !== 'Потеряна').length;
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  const recentNotifications = [...notifications].reverse().slice(0, 5);

  const stats = [
    { label: 'Всего клиентов',    value: clients.length,                    color: COLORS.primary, bg: COLORS.primaryLight },
    { label: 'Активных клиентов', value: activeClients,                     color: COLORS.success, bg: COLORS.successLight },
    { label: 'Сделок в работе',   value: activeDeals,                       color: COLORS.purple,  bg: COLORS.purpleLight },
    { label: 'Сумма сделок',      value: `${totalValue.toLocaleString()} ₽`, color: COLORS.warning, bg: COLORS.warningLight },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ color: COLORS.dark, marginBottom: '1.5rem' }}>Дашборд системы</h2>
      <div style={statsGrid}>
        {stats.map(({ label, value, color, bg }) => (
          <div key={label} style={statCard(color, bg)}>
            <div style={statValue(color)}>{value}</div>
            <div style={{ color: COLORS.gray, marginTop: '0.25rem' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ ...card, padding: '1.5rem' }}>
        <h3 style={{ color: COLORS.dark, marginBottom: '1rem' }}>Последние события</h3>
        {recentNotifications.length === 0 ? (
          <p style={{ color: COLORS.gray }}>Нет событий</p>
        ) : (
          <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
            {recentNotifications.map((n) => (
              <li key={n.id} style={{ marginBottom: SPACING.xs, color: n.read ? COLORS.gray : COLORS.dark }}>
                {n.message} <span style={{ fontSize: '0.8rem', color: COLORS.grayMid }}>— {n.timestamp}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
