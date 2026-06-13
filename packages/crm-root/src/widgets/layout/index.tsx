import { FC } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { pageWrapper, cardPanel, COLORS, SPACING, FONT } from '../../shared/styles';
import Navigation from '../navigation';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Главная — CRM Система',
  '/auth': 'Аутентификация',
  '/clients': 'Управление клиентами',
  '/deals': 'Воронка продаж',
  '/dashboard': 'Дашборд системы',
};

const PATH_LABELS: Record<string, string> = {
  auth: 'Аутентификация',
  clients: 'Клиенты',
  deals: 'Сделки',
  dashboard: 'Дашборд',
};

const Layout: FC = () => {
  const location = useLocation();

  const getPageTitle = (): string => PAGE_TITLES[location.pathname] ?? 'CRM Система';

  const getBreadcrumbs = (): { href: string; label: string }[] => {
    const parts = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ href: '/', label: 'Главная' }];
    parts.forEach((part, index) => {
      breadcrumbs.push({
        href: '/' + parts.slice(0, index + 1).join('/'),
        label: PATH_LABELS[part] ?? part,
      });
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div style={pageWrapper}>
      <div style={{ flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', padding: SPACING.lg, display: 'flex', flexDirection: 'column' }}>
        <header style={{ ...cardPanel, marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: SPACING.lg, marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ color: COLORS.dark, marginBottom: '0.5rem', fontSize: '2.2rem', fontWeight: FONT.weight.bold }}>
                {getPageTitle()}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.95rem', color: COLORS.gray, marginTop: '0.5rem' }}>
                {breadcrumbs.map((crumb, index) => (
                  <span key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {index > 0 && <span style={{ margin: '0 0.25rem' }}>›</span>}
                    {index === breadcrumbs.length - 1 ? (
                      <span style={{ fontWeight: FONT.weight.bold, color: COLORS.dark }}>{crumb.label}</span>
                    ) : (
                      <Link to={crumb.href} style={{ color: COLORS.primary, textDecoration: 'none' }}>{crumb.label}</Link>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Navigation />
        </header>

        <main style={{ ...cardPanel, flex: 1, minHeight: '500px', position: 'relative' }}>
          <Outlet />
        </main>
      </div>

      <footer style={{ backgroundColor: COLORS.dark, color: COLORS.textLight, fontSize: '0.9rem', marginTop: '2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: `1.5rem ${SPACING.lg}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div><strong>CRM Система на микрофронтендах</strong> • Демонстрация архитектуры</div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span>Порты:
              <span style={{ marginLeft: '0.5rem', color: COLORS.primary }}>3000</span> (root),{' '}
              <span style={{ color: COLORS.success }}>3001</span> (auth),{' '}
              <span style={{ color: COLORS.purple }}>3002</span> (clients),{' '}
              <span style={{ color: COLORS.warning }}>3003</span> (deals)
            </span>
          </div>
          <div>© {new Date().getFullYear()} • Webpack Module Federation</div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
