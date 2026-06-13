import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { emptyForm, LoginFormData } from '../../../shared/config';
import { input, btn } from '../../../shared/styles';
import Field from '../../../shared/ui/Field';

interface RegisterFormProps {
  onRegister: (username: string) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<LoginFormData>(emptyForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    onRegister(formData.username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field label="Имя пользователя:">
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Введите имя пользователя" style={input} required />
      </Field>
      <Field label="Email:">
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Введите email" style={input} required />
      </Field>
      <Field label="Пароль:">
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Введите пароль" style={input} required />
      </Field>
      <button type="submit" style={btn.primary}>Зарегистрироваться</button>
    </form>
  );
};

export default RegisterForm;
