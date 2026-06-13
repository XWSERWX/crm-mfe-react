import { reducer, getActiveClients, getUnreadNotificationsCount, AppState } from '../app/store/SimpleStore';

const baseState: AppState = {
  user: null,
  isAuthenticated: false,
  clients: [
    { id: 1, name: 'Иван', email: 'ivan@test.com', phone: '', company: '', status: 'Активный', lastContact: '' },
    { id: 2, name: 'Мария', email: 'maria@test.com', phone: '', company: '', status: 'Неактивный', lastContact: '' },
    { id: 3, name: 'Сергей', email: 'sergey@test.com', phone: '', company: '', status: 'Активный', lastContact: '' },
  ],
  deals: [
    { id: 1, title: 'Сделка А', client: '', value: 100000, stage: 'Переговоры', probability: 70, startDate: '', expectedClose: '', manager: '' },
    { id: 2, title: 'Сделка Б', client: '', value: 200000, stage: 'Лид', probability: 20, startDate: '', expectedClose: '', manager: '' },
  ],
  notifications: [
    { id: 1, message: 'Тест', type: 'info', read: false, timestamp: '' },
    { id: 2, message: 'Тест 2', type: 'success', read: true, timestamp: '' },
  ],
};

describe('SimpleStore — reducer', () => {
  test('LOGIN: устанавливает пользователя и isAuthenticated', () => {
    const user = { name: 'admin', email: 'admin@test.com', role: '', lastLogin: '' };
    const state = reducer(baseState, { type: 'LOGIN', payload: user });

    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
    expect(state.notifications).toHaveLength(baseState.notifications.length + 1);
    expect(state.notifications.at(-1)!.type).toBe('info');
  });

  test('LOGOUT: сбрасывает пользователя и isAuthenticated', () => {
    const loggedIn: AppState = { ...baseState, user: { name: 'admin', email: '', role: '', lastLogin: '' }, isAuthenticated: true };
    const state = reducer(loggedIn, { type: 'LOGOUT' });

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.notifications.at(-1)!.type).toBe('warning');
  });

  test('ADD_CLIENT: добавляет клиента с корректным ID (max + 1)', () => {
    const newClient = { name: 'Новый', email: 'new@test.com', phone: '', company: '', status: 'Потенциальный' as const, lastContact: '' };
    const state = reducer(baseState, { type: 'ADD_CLIENT', payload: newClient });

    expect(state.clients).toHaveLength(4);
    const added = state.clients.at(-1)!;
    expect(added.id).toBe(4);
    expect(added.name).toBe('Новый');
    expect(state.notifications.at(-1)!.type).toBe('success');
  });

  test('ADD_CLIENT в пустой список: ID = 1', () => {
    const emptyState: AppState = { ...baseState, clients: [] };
    const state = reducer(emptyState, { type: 'ADD_CLIENT', payload: { name: 'Первый', email: '', phone: '', company: '', status: 'Потенциальный', lastContact: '' } });

    expect(state.clients[0].id).toBe(1);
  });

  test('UPDATE_CLIENT: обновляет только нужного клиента', () => {
    const updated = { id: 2, name: 'Мария Обновлённая', email: 'new@test.com', phone: '', company: '', status: 'Активный' as const, lastContact: '' };
    const state = reducer(baseState, { type: 'UPDATE_CLIENT', payload: updated });

    expect(state.clients).toHaveLength(3);
    expect(state.clients.find((c) => c.id === 2)!.name).toBe('Мария Обновлённая');
    expect(state.clients.find((c) => c.id === 1)!.name).toBe('Иван');
  });

  test('DELETE_CLIENT: удаляет клиента по ID', () => {
    const state = reducer(baseState, { type: 'DELETE_CLIENT', payload: 2 });

    expect(state.clients).toHaveLength(2);
    expect(state.clients.find((c) => c.id === 2)).toBeUndefined();
    expect(state.notifications.at(-1)!.type).toBe('warning');
  });

  test('ADD_DEAL: добавляет сделку с корректным ID', () => {
    const newDeal = { title: 'Новая сделка', client: '', value: 300000, stage: 'Лид', probability: 20, startDate: '', expectedClose: '', manager: '' };
    const state = reducer(baseState, { type: 'ADD_DEAL', payload: newDeal });

    expect(state.deals).toHaveLength(3);
    expect(state.deals.at(-1)!.id).toBe(3);
    expect(state.deals.at(-1)!.title).toBe('Новая сделка');
  });

  test('UPDATE_DEAL: обновляет только нужную сделку', () => {
    const updated = { id: 1, title: 'Обновлённая сделка', client: '', value: 500000, stage: 'Предложение', probability: 50, startDate: '', expectedClose: '', manager: '' };
    const state = reducer(baseState, { type: 'UPDATE_DEAL', payload: updated });

    expect(state.deals.find((d) => d.id === 1)!.title).toBe('Обновлённая сделка');
    expect(state.deals.find((d) => d.id === 2)!.title).toBe('Сделка Б');
  });

  test('DELETE_DEAL: удаляет сделку по ID', () => {
    const state = reducer(baseState, { type: 'DELETE_DEAL', payload: 1 });

    expect(state.deals).toHaveLength(1);
    expect(state.deals.find((d) => d.id === 1)).toBeUndefined();
  });

  test('MARK_NOTIFICATION_READ: помечает одно уведомление прочитанным', () => {
    const state = reducer(baseState, { type: 'MARK_NOTIFICATION_READ', payload: 1 });

    expect(state.notifications.find((n) => n.id === 1)!.read).toBe(true);
    expect(state.notifications.find((n) => n.id === 2)!.read).toBe(true);
  });

  test('MARK_ALL_NOTIFICATIONS_READ: помечает все уведомления прочитанными', () => {
    const state = reducer(baseState, { type: 'MARK_ALL_NOTIFICATIONS_READ' });

    expect(state.notifications.every((n) => n.read)).toBe(true);
  });

  test('CLEAR_NOTIFICATIONS: очищает список уведомлений', () => {
    const state = reducer(baseState, { type: 'CLEAR_NOTIFICATIONS' });

    expect(state.notifications).toHaveLength(0);
  });

  test('default: неизвестный action возвращает состояние без изменений', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = reducer(baseState, { type: 'UNKNOWN_ACTION' } as any);

    expect(state).toBe(baseState);
  });
});

describe('SimpleStore — вспомогательные функции', () => {
  test('getActiveClients: возвращает только активных клиентов', () => {
    const active = getActiveClients(baseState);

    expect(active).toHaveLength(2);
    expect(active.every((c) => c.status === 'Активный')).toBe(true);
  });

  test('getUnreadNotificationsCount: считает непрочитанные', () => {
    const count = getUnreadNotificationsCount(baseState);
    expect(count).toBe(1);
  });
});
