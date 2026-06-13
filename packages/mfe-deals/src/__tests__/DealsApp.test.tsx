import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DealsApp from '../index';
import { Deal } from '../entities/deal/model';

const mockDispatch = jest.fn();

const testDeals: Deal[] = [
  { id: 1, title: 'Разработка сайта', client: 'ООО Альфа', value: 500000, stage: 'Переговоры', probability: 70, startDate: '2024-03-01', expectedClose: '2024-06-01', manager: 'Иванов' },
  { id: 2, title: 'Поддержка IT', client: 'ИП Бета', value: 150000, stage: 'Лид', probability: 20, startDate: '2024-04-01', expectedClose: '2024-05-15', manager: 'Петрова' },
  { id: 3, title: 'Консалтинг', client: 'ЗАО Гамма', value: 800000, stage: 'Закрыта', probability: 100, startDate: '2024-01-10', expectedClose: '2024-03-01', manager: 'Сидоров' },
];

beforeEach(() => {
  mockDispatch.mockClear();
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  jest.spyOn(window, 'confirm').mockReturnValue(true);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('DealsApp — отображение списка', () => {
  test('отображает все сделки из props', () => {
    render(<DealsApp dispatch={mockDispatch} deals={testDeals} />);

    expect(screen.getByText('Разработка сайта')).toBeInTheDocument();
    expect(screen.getByText('Поддержка IT')).toBeInTheDocument();
    expect(screen.getByText('Консалтинг')).toBeInTheDocument();
    expect(screen.getByText('Список сделок (3)')).toBeInTheDocument();
  });

  test('фильтр по стадии "Лид" показывает только нужные сделки', () => {
    render(<DealsApp dispatch={mockDispatch} deals={testDeals} />);

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'Лид' } });

    expect(screen.getByText('Поддержка IT')).toBeInTheDocument();
    expect(screen.queryByText('Разработка сайта')).not.toBeInTheDocument();
    expect(screen.getByText('Список сделок (1)')).toBeInTheDocument();
  });

  test('статистика: всего сделок, общая сумма', () => {
    render(<DealsApp dispatch={mockDispatch} deals={testDeals} />);

    expect(screen.getByText('Всего сделок')).toBeInTheDocument();
    const totalLabel = screen.getByText('Всего сделок');
    expect(totalLabel.parentElement!.textContent).toContain('3');

    expect(screen.getByText('1 450 000 ₽')).toBeInTheDocument();
  });
});

describe('DealsApp — CRUD операции', () => {
  test('кнопка "Новая сделка" показывает форму', () => {
    render(<DealsApp dispatch={mockDispatch} deals={testDeals} />);

    fireEvent.click(screen.getByText('+ Новая сделка'));

    expect(screen.getByText('Добавление новой сделки')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Разработка корпоративного сайта')).toBeInTheDocument();
  });

  test('отправка формы диспатчит ADD_DEAL', () => {
    render(<DealsApp dispatch={mockDispatch} deals={testDeals} />);

    fireEvent.click(screen.getByText('+ Новая сделка'));

    fireEvent.change(screen.getByPlaceholderText('Разработка корпоративного сайта'), {
      target: { value: 'Новая сделка' },
    });
    fireEvent.change(screen.getByPlaceholderText('ООО ТехноПром'), {
      target: { value: 'Тестовый клиент' },
    });
    fireEvent.change(screen.getByPlaceholderText('500000'), {
      target: { value: '300000' },
    });

    fireEvent.submit(document.querySelector('form')!);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ADD_DEAL',
        payload: expect.objectContaining({ title: 'Новая сделка', value: 300000 }),
      })
    );
  });

  test('кнопка "Удалить" диспатчит DELETE_DEAL после confirm', () => {
    render(<DealsApp dispatch={mockDispatch} deals={testDeals} />);

    const deleteButtons = screen.getAllByText('Удалить');
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'DELETE_DEAL', payload: 3 });
  });

  test('изменение стадии в таблице диспатчит UPDATE_DEAL', () => {
    render(<DealsApp dispatch={mockDispatch} deals={testDeals} />);

    const allSelects = screen.getAllByRole('combobox');
    const stageSelectInRow = allSelects[3];

    fireEvent.change(stageSelectInRow, { target: { value: 'Квалификация' } });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'UPDATE_DEAL',
        payload: expect.objectContaining({ stage: 'Квалификация' }),
      })
    );
  });
});
