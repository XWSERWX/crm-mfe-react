import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSimpleStore } from '../../../app/store/SimpleStore';

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { state } = useSimpleStore();
  const location = useLocation();
  if (!state.isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
