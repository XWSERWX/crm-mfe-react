import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientsApp from '../index';
import { Client } from '../entities/client/model';

const mockDispatch = jest.fn();

const testClients: Client[] = [
  { id: 1, name: 'Иван Иванов', email: 'ivan@test.com', phone: '+7 900 000-00-01', company: 'ООО Альфа', status: 'Активный', lastContact: '2024-04-01' },
  { id: 2, name: 'Мария Петрова', email: 'maria@test.com', phone: '+7 900 000-00-02', company: 'ИП Петрова', status: 'Неактивный', lastContact: '2024-03-15' },
  { id: 3, name: 'Сергей Волков', email: 'sergey@test.com', phone: '+7 900 000-00-03', company: 'ЗАО Бета', status: 'Потенциальный', lastContact: '2024-04-10' },
];

beforeEach(() => {
  mockDispatch.mockClear();
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  jest.spyOn(window, 'confirm').mockReturnValue(true);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ClientsApp — отображение списка', () => {
  test('отображает всех клиентов из props', () => {
    render(<ClientsApp dispatch={mockDispatch} clients={testClients} />);

    expect(screen.getByText('Иван Иванов')).toBeInTheDocument();
    expect(screen.getByText('Мария Петрова')).toBeInTheDocument();
    expect(screen.getByText('Сергей Волков')).toBeInTheDocument();
    expect(screen.getByText('Список клиентов (3)')).toBeInTheDocument();
  });

  test('поиск по имени фильтрует список', () => {
    render(<ClientsApp dispatch={mockDispatch} clients={testClients} />);

    fireEvent.change(screen.getByPlaceholderText(/поиск/i), {
      target: { value: 'Мария' },
    });

    expect(screen.getByText('Мария Петрова')).toBeInTheDocument();
    expect(screen.queryByText('Иван Иванов')).not.toBeInTheDocument();
    expect(screen.getByText('Список клиентов (1)')).toBeInTheDocument();
  });

  test('фильтр по статусу "Активный" показывает только активных', () => {
    render(<ClientsApp dispatch={mockDispatch} clients={testClients} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Активный' },
    });

    expect(screen.getByText('Иван Иванов')).toBeInTheDocument();
    expect(screen.queryByText('Мария Петрова')).not.toBeInTheDocument();
    expect(screen.queryByText('Сергей Волков')).not.toBeInTheDocument();
  });
});

describe('ClientsApp — CRUD операции', () => {
  test('кнопка "Добавить клиента" показывает форму', () => {
    render(<ClientsApp dispatch={mockDispatch} clients={testClients} />);

    fireEvent.click(screen.getByText('+ Добавить клиента'));

    expect(screen.getByText('Добавление нового клиента')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Иван Иванов')).toBeInTheDocument();
  });

  test('отправка формы диспатчит ADD_CLIENT', () => {
    render(<ClientsApp dispatch={mockDispatch} clients={testClients} />);

    fireEvent.click(screen.getByText('+ Добавить клиента'));

    fireEvent.change(screen.getByPlaceholderText('Иван Иванов'), { target: { value: 'Новый Клиент' } });
    fireEvent.change(screen.getByPlaceholderText('ivan@mail.com'), { target: { value: 'new@test.com' } });

    fireEvent.click(screen.getByRole('button', { name: 'Добавить клиента' }));

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ADD_CLIENT',
        payload: expect.objectContaining({ name: 'Новый Клиент', email: 'new@test.com' }),
      })
    );
  });

  test('кнопка "Удалить" диспатчит DELETE_CLIENT после confirm', () => {
    render(<ClientsApp dispatch={mockDispatch} clients={testClients} />);

    const deleteButtons = screen.getAllByText('Удалить');
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'DELETE_CLIENT', payload: 1 });
  });
});

describe('ClientsApp — статистика', () => {
  test('показывает корректную статистику по клиентам', () => {
    render(<ClientsApp dispatch={mockDispatch} clients={testClients} />);

    expect(screen.getByText('Всего клиентов')).toBeInTheDocument();
    expect(screen.getByText('Активных клиентов')).toBeInTheDocument();
    expect(screen.getByText('Потенциальных клиентов')).toBeInTheDocument();

    const totalLabel = screen.getByText('Всего клиентов');
    const totalCard = totalLabel.parentElement!;
    expect(totalCard.textContent).toContain('3');
  });
});
