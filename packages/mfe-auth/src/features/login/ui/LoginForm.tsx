import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { emptyForm, LoginFormData } from '../../../shared/config';
import { input, btn, COLORS, SPACING } from '../../../shared/styles';
import Field from '../../../shared/ui/Field';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<LoginFormData>(emptyForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    onLogin({ username: formData.username, password: formData.password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field label="Имя пользователя:">
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Введите имя пользователя" style={input} required />
      </Field>
      <Field label="Пароль:">
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Введите пароль" style={input} required />
      </Field>
      <div style={{ marginBottom: SPACING.lg, display: 'flex', alignItems: 'center' }}>
        <input type="checkbox" name="rememberMe" id="rememberMe" checked={formData.rememberMe} onChange={handleChange} style={{ marginRight: '8px' }} />
        <label htmlFor="rememberMe" style={{ cursor: 'pointer' }}>Запомнить меня</label>
      </div>
      <button type="submit" style={btn.primary}>Войти</button>
      <div style={{ textAlign: 'center', color: COLORS.gray, fontSize: '14px' }}>
        <button type="button" onClick={() => alert('Функция восстановления пароля в разработке')} style={btn.link}>
          Забыли пароль?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
