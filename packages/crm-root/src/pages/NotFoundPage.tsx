import { FC } from 'react';
import { COLORS } from '../shared/styles';

const NotFoundPage: FC = () => (
  <div style={{ textAlign: 'center', padding: '3rem' }}>
    <h2 style={{ color: COLORS.danger, fontSize: '3rem', margin: 0 }}>404</h2>
    <p style={{ color: COLORS.gray, fontSize: '1.2rem' }}>Страница не найдена</p>
  </div>
);

export default NotFoundPage;
