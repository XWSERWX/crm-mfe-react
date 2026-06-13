import { FC } from 'react';
import { COLORS } from '../styles';

interface Props {
  moduleName: string;
}

const LoadingFallback: FC<Props> = ({ moduleName }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center' }}>
    <div style={{
      width: '50px', height: '50px',
      border: `5px solid ${COLORS.bgSection}`,
      borderTop: `5px solid ${COLORS.primary}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem',
    }} />
    <p style={{ color: COLORS.gray, fontSize: '1.1rem' }}>Загрузка модуля {moduleName}...</p>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

export default LoadingFallback;
