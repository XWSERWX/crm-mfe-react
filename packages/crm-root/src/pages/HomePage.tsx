import { FC } from 'react';
import { COLORS, RADIUS, SPACING } from '../shared/styles';

const MODULES = [
  { bg: COLORS.primaryLight,  border: COLORS.primary,  color: COLORS.primaryDark,  title: 'Аутентификация', desc: 'Модуль управления пользователями, входом и регистрацией' },
  { bg: COLORS.successLight,  border: COLORS.success,  color: COLORS.successDark,  title: 'Клиенты',        desc: 'Управление клиентской базой, контактами и историей взаимодействий' },
  { bg: COLORS.warningLight,  border: COLORS.warning,  color: COLORS.warningDark,  title: 'Сделки',         desc: 'Воронка продаж, управление сделками и этапами переговоров' },
];

const HomePage: FC = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h2 style={{ color: COLORS.dark, marginBottom: '1rem' }}>Добро пожаловать в CRM систему</h2>
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
      Это демонстрационное приложение построено на микрофронтенд-архитектуре с использованием Webpack Module Federation.
      Каждый модуль (аутентификация, клиенты, сделки) разрабатывается и развертывается независимо.
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
      {MODULES.map(({ bg, border, color, title, desc }) => (
        <div key={title} style={{ backgroundColor: bg, padding: SPACING.xl, borderRadius: RADIUS.md, borderLeft: `4px solid ${border}` }}>
          <h3 style={{ color }}>{title}</h3>
          <p>{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default HomePage;
