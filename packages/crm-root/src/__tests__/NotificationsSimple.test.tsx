import { ReactElement } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoreProvider } from '../app/store/SimpleStore';
import NotificationsSimple from '../features/notifications/ui/NotificationsSimple';

const renderWithStore = (ui: ReactElement) => render(<StoreProvider>{ui}</StoreProvider>);

describe('NotificationsSimple — badge и открытие', () => {
  test('показывает badge с количеством непрочитанных уведомлений', () => {
    renderWithStore(<NotificationsSimple />);

    const badge = screen.getByText('1');
    expect(badge).toBeInTheDocument();
  });

  test('панель уведомлений открывается по клику на кнопку', () => {
    renderWithStore(<NotificationsSimple />);

    expect(screen.queryByText('Уведомления системы')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/Уведомления/));

    expect(screen.getByText('Уведомления системы')).toBeInTheDocument();
  });

  test('клик вне панели закрывает её', () => {
    renderWithStore(<NotificationsSimple />);

    fireEvent.click(screen.getByText(/Уведомления/));
    expect(screen.getByText('Уведомления системы')).toBeInTheDocument();

    const overlay = document.querySelector('[style*="position: fixed"]') as HTMLElement;
    fireEvent.click(overlay);

    expect(screen.queryByText('Уведомления системы')).not.toBeInTheDocument();
  });

  test('"Прочитать все" скрывает badge', () => {
    renderWithStore(<NotificationsSimple />);

    fireEvent.click(screen.getByText(/Уведомления/));
    fireEvent.click(screen.getByText('Прочитать все'));

    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  test('"Очистить" удаляет все уведомления', () => {
    renderWithStore(<NotificationsSimple />);

    fireEvent.click(screen.getByRole('button', { name: /Уведомления/ }));
    fireEvent.click(screen.getByText('Очистить'));

    expect(screen.getByText('Нет уведомлений')).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  test('клик по уведомлению помечает его прочитанным', () => {
    renderWithStore(<NotificationsSimple />);

    fireEvent.click(screen.getByText(/Уведомления/));

    const notification = screen.getByText('Добро пожаловать в CRM систему!');
    fireEvent.click(notification);

    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });
});
