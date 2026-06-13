import { FC, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { navContainer, btn, COLORS, FONT } from '../../shared/styles';
import { useSimpleStore } from '../../app/store/SimpleStore';
import NotificationsSimple from '../../features/notifications/ui/NotificationsSimple';

interface NavItem {
  path: string;
  label: string;
  exact: boolean;
  protected: boolean;
}

const Navigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSimpleStore();
  const isHomePage = location.pathname === '/';
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { path: '/',          label: 'Главная',                              exact: true,  protected: false },
    { path: '/auth',      label: state.isAuthenticated ? 'Профиль' : 'Войти', exact: false, protected: false },
    { path: '/clients',   label: 'Клиенты',                             exact: false, protected: true },
    { path: '/deals',     label: 'Сделки',                              exact: false, protected: true },
    { path: '/dashboard', label: 'Дашборд',                             exact: false, protected: true },
  ];

  return (
    <nav style={navContainer}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {!isHomePage && (
          <button
            onClick={() => navigate(-1)}
            style={btn.primary}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.primaryDark)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.primary)}
          >
            ← Назад
          </button>
        )}
        <span style={{ color: COLORS.textLight, fontWeight: FONT.weight.semibold, fontSize: '1rem' }}>CRM Навигация:</span>
      </div>

      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '0.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {navItems.map((item) => {
          const locked = item.protected && !state.isAuthenticated;
          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.exact}
                style={({ isActive }) => ({
                  color: locked ? COLORS.gray : isActive ? COLORS.primary : COLORS.textLight,
                  textDecoration: 'none',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '4px',
                  backgroundColor: isActive ? '#34495e' : hoveredPath === item.path ? 'rgba(52,73,94,0.5)' : 'transparent',
                  border: isActive ? `1px solid ${COLORS.primary}` : '1px solid transparent',
                  fontWeight: FONT.weight.medium,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  opacity: locked ? 0.6 : 1,
                })}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {locked && <span style={{ fontSize: '11px' }}>🔒</span>}
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {state.isAuthenticated && (
        <div style={{ flexShrink: 0 }}>
          <NotificationsSimple />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
