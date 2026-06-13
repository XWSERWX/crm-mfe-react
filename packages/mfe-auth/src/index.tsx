import { FC, useState } from 'react';
import { Dispatch } from 'react';
import { User } from './entities/user/model';
import { authCard, tabContainer, tabBtn, demoHint, COLORS, SPACING } from './shared/styles';
import UserCard from './entities/user/ui/UserCard';
import LoginForm from './features/login/ui/LoginForm';
import RegisterForm from './features/register/ui/RegisterForm';

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

interface AuthAppProps {
  dispatch: Dispatch<AuthAction>;
  isAuthenticated: boolean;
  user: User | null;
  onLoginSuccess?: () => void;
}

const AuthApp: FC<AuthAppProps> = ({ dispatch, isAuthenticated, user, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = ({ username, password }: { username: string; password: string }) => {
    if (username === 'admin' && password === 'admin') {
      dispatch({
        type: 'LOGIN',
        payload: { name: username, email: 'admin@crm.local', role: 'Администратор', lastLogin: new Date().toLocaleDateString() },
      });
      onLoginSuccess?.();
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const handleRegister = (name: string) => {
    alert(`Пользователь ${name} успешно зарегистрирован!`);
    setIsLogin(true);
  };

  if (isAuthenticated && user) {
    return (
      <UserCard
        user={user}
        onLogout={() => dispatch({ type: 'LOGOUT' })}
        onSettings={() => alert('Раздел настроек профиля в разработке')}
      />
    );
  }

  return (
    <div style={authCard.blue}>
      <div style={tabContainer}>
        {([
          { label: 'Вход', active: isLogin, onClick: () => setIsLogin(true) },
          { label: 'Регистрация', active: !isLogin, onClick: () => setIsLogin(false) },
        ] as { label: string; active: boolean; onClick: () => void }[]).map(({ label, active, onClick }) => (
          <button key={label} onClick={onClick} style={active ? tabBtn.active : tabBtn.inactive}>
            {label}
          </button>
        ))}
      </div>

      <h2 style={{ color: COLORS.primaryDark, marginBottom: SPACING.lg, textAlign: 'center' }}>
        {isLogin ? 'Вход в систему' : 'Регистрация нового пользователя'}
      </h2>

      {isLogin ? <LoginForm onLogin={handleLogin} /> : <RegisterForm onRegister={handleRegister} />}

      <div style={demoHint}>
        <strong>Демо-данные для входа:</strong>
        <div>Логин: admin</div>
        <div>Пароль: admin</div>
      </div>
    </div>
  );
};

export default AuthApp;
