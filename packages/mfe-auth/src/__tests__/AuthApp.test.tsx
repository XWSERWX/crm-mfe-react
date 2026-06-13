import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthApp from '../index';

const mockDispatch = jest.fn();
const mockOnLoginSuccess = jest.fn();

beforeEach(() => {
  mockDispatch.mockClear();
  mockOnLoginSuccess.mockClear();
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('AuthApp — форма входа', () => {
  test('по умолчанию показывает форму входа', () => {
    render(<AuthApp dispatch={mockDispatch} isAuthenticated={false} user={null} />);

    expect(screen.getByText('Вход в систему')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите имя пользователя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите пароль')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Введите email')).not.toBeInTheDocument();
  });

  test('переключение на вкладку "Регистрация" показывает поле email', () => {
    render(<AuthApp dispatch={mockDispatch} isAuthenticated={false} user={null} />);

    fireEvent.click(screen.getByText('Регистрация'));

    expect(screen.getByText('Регистрация нового пользователя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите email')).toBeInTheDocument();
  });

  test('отправка пустой формы входа показывает alert', () => {
    render(<AuthApp dispatch={mockDispatch} isAuthenticated={false} user={null} />);

    fireEvent.submit(document.querySelector('form')!);

    expect(window.alert).toHaveBeenCalledWith('Пожалуйста, заполните все поля');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('неверные учётные данные показывают alert с ошибкой', () => {
    render(<AuthApp dispatch={mockDispatch} isAuthenticated={false} user={null} />);

    fireEvent.change(screen.getByPlaceholderText('Введите имя пользователя'), {
      target: { value: 'user' },
    });
    fireEvent.change(screen.getByPlaceholderText('Введите пароль'), {
      target: { value: 'wrong' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Войти' }));

    expect(window.alert).toHaveBeenCalledWith('Неверный логин или пароль');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('успешный вход (admin/admin) диспатчит LOGIN с корректным payload', () => {
    render(<AuthApp dispatch={mockDispatch} isAuthenticated={false} user={null} onLoginSuccess={mockOnLoginSuccess} />);

    fireEvent.change(screen.getByPlaceholderText('Введите имя пользователя'), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText('Введите пароль'), {
      target: { value: 'admin' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Войти' }));

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'LOGIN',
        payload: expect.objectContaining({ name: 'admin' }),
      })
    );
  });

  test('успешный вход вызывает onLoginSuccess', () => {
    render(<AuthApp dispatch={mockDispatch} isAuthenticated={false} user={null} onLoginSuccess={mockOnLoginSuccess} />);

    fireEvent.change(screen.getByPlaceholderText('Введите имя пользователя'), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText('Введите пароль'), {
      target: { value: 'admin' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Войти' }));

    expect(mockOnLoginSuccess).toHaveBeenCalledTimes(1);
  });
});

describe('AuthApp — профиль пользователя', () => {
  const testUser = {
    name: 'admin',
    email: 'admin@crm.local',
    role: 'Администратор',
    lastLogin: '10.05.2026',
  };

  test('при isAuthenticated=true показывает профиль пользователя', () => {
    render(<AuthApp dispatch={mockDispatch} isAuthenticated={true} user={testUser} />);

    expect(screen.getByText('Добро пожаловать, admin!')).toBeInTheDocument();
    expect(screen.getByText('admin@crm.local')).toBeInTheDocument();
    expect(screen.getByText('Администратор')).toBeInTheDocument();
  });

  test('кнопка "Выйти" диспатчит LOGOUT', () => {
    render(<AuthApp dispatch={mockDispatch} isAuthenticated={true} user={testUser} />);

    fireEvent.click(screen.getByText('Выйти'));

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGOUT' });
  });

  test('кнопка "Настройки профиля" не вызывает LOGOUT', () => {
    render(<AuthApp dispatch={mockDispatch} isAuthenticated={true} user={testUser} />);

    fireEvent.click(screen.getByText('Настройки профиля'));

    expect(mockDispatch).not.toHaveBeenCalledWith({ type: 'LOGOUT' });
  });
});
