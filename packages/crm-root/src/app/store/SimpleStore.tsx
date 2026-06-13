import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { User, Client, Deal, Notification } from '@crm/types';

export type { User, Client, Deal, Notification } from '@crm/types';

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  clients: Client[];
  deals: Deal[];
  notifications: Notification[];
}

export type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_CLIENT'; payload: Omit<Client, 'id'> }
  | { type: 'UPDATE_CLIENT'; payload: Client }
  | { type: 'DELETE_CLIENT'; payload: number }
  | { type: 'ADD_DEAL'; payload: Omit<Deal, 'id'> }
  | { type: 'UPDATE_DEAL'; payload: Deal }
  | { type: 'DELETE_DEAL'; payload: number }
  | { type: 'MARK_NOTIFICATION_READ'; payload: number }
  | { type: 'MARK_ALL_NOTIFICATIONS_READ' }
  | { type: 'CLEAR_NOTIFICATIONS' };

interface StoreContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  clients: [
    { id: 1, name: 'Иван Иванов', email: 'ivan@mail.com', phone: '+7 (900) 123-45-67', company: 'ООО "ТехноПром"', status: 'Активный', lastContact: '2024-04-15' },
    { id: 2, name: 'Мария Петрова', email: 'maria@mail.com', phone: '+7 (900) 234-56-78', company: 'ИП Петрова', status: 'Активный', lastContact: '2024-04-18' },
    { id: 3, name: 'Сергей Сидоров', email: 'sergey@mail.com', phone: '+7 (900) 345-67-89', company: 'ЗАО "СтройГрад"', status: 'Неактивный', lastContact: '2024-03-20' },
    { id: 4, name: 'Анна Козлова', email: 'anna@mail.com', phone: '+7 (900) 456-78-90', company: 'ООО "МаркетГрупп"', status: 'Потенциальный', lastContact: '2024-04-10' },
    { id: 5, name: 'Дмитрий Волков', email: 'dmitry@mail.com', phone: '+7 (900) 567-89-01', company: 'ИП Волков', status: 'Активный', lastContact: '2024-04-19' },
  ],
  deals: [
    { id: 1, title: 'Разработка корпоративного сайта', client: 'ООО "ТехноПром"', value: 500000, stage: 'Предложение', probability: 70, startDate: '2024-03-15', expectedClose: '2024-05-20', manager: 'Иван Иванов' },
    { id: 2, title: 'Внедрение CRM системы', client: 'ЗАО "СтройГрад"', value: 750000, stage: 'Переговоры', probability: 50, startDate: '2024-04-01', expectedClose: '2024-06-15', manager: 'Мария Петрова' },
    { id: 3, title: 'Обслуживание IT-инфраструктуры', client: 'ИП Волков', value: 300000, stage: 'Закрыта', probability: 100, startDate: '2024-02-10', expectedClose: '2024-04-05', manager: 'Сергей Сидоров' },
    { id: 4, title: 'Разработка мобильного приложения', client: 'ООО "МаркетГрупп"', value: 1200000, stage: 'Квалификация', probability: 30, startDate: '2024-04-10', expectedClose: '2024-08-30', manager: 'Анна Козлова' },
    { id: 5, title: 'Консультационные услуги', client: 'ИП Петрова', value: 150000, stage: 'Лид', probability: 20, startDate: '2024-04-18', expectedClose: '2024-05-10', manager: 'Дмитрий Волков' },
  ],
  notifications: [
    { id: 1, message: 'Добро пожаловать в CRM систему!', type: 'info', read: false, timestamp: new Date().toLocaleString() },
  ],
};

const nextId = (items: { id: number }[]): number =>
  items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;

const addNotification = (
  notifications: Notification[],
  message: string,
  type: Notification['type']
): Notification[] => [
  ...notifications,
  { id: Date.now(), message, type, read: false, timestamp: new Date().toLocaleString() },
];

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        notifications: addNotification(state.notifications, `Пользователь ${action.payload.name} вошел в систему`, 'info'),
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        notifications: addNotification(state.notifications, 'Пользователь вышел из системы', 'warning'),
      };
    case 'ADD_CLIENT':
      return {
        ...state,
        clients: [...state.clients, { ...action.payload, id: nextId(state.clients) }],
        notifications: addNotification(state.notifications, `Добавлен новый клиент: ${action.payload.name}`, 'success'),
      };
    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map((c) => c.id === action.payload.id ? { ...c, ...action.payload } : c),
        notifications: addNotification(state.notifications, `Клиент ${action.payload.name} обновлён`, 'info'),
      };
    case 'DELETE_CLIENT':
      return {
        ...state,
        clients: state.clients.filter((c) => c.id !== action.payload),
        notifications: addNotification(state.notifications, 'Клиент удалён', 'warning'),
      };
    case 'ADD_DEAL':
      return {
        ...state,
        deals: [...state.deals, { ...action.payload, id: nextId(state.deals) }],
        notifications: addNotification(state.notifications, `Добавлена новая сделка: ${action.payload.title}`, 'success'),
      };
    case 'UPDATE_DEAL':
      return {
        ...state,
        deals: state.deals.map((d) => d.id === action.payload.id ? { ...d, ...action.payload } : d),
        notifications: addNotification(state.notifications, `Сделка "${action.payload.title}" обновлена`, 'info'),
      };
    case 'DELETE_DEAL':
      return {
        ...state,
        deals: state.deals.filter((d) => d.id !== action.payload),
        notifications: addNotification(state.notifications, 'Сделка удалена', 'warning'),
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) => n.id === action.payload ? { ...n, read: true } : n),
      };
    case 'MARK_ALL_NOTIFICATIONS_READ':
      return { ...state, notifications: state.notifications.map((n) => ({ ...n, read: true })) };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    default:
      return state;
  }
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useSimpleStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useSimpleStore must be used within StoreProvider');
  return context;
};

export const getActiveClients = (state: AppState): Client[] =>
  state.clients.filter((c) => c.status === 'Активный');

export const getUnreadNotificationsCount = (state: AppState): number =>
  state.notifications.filter((n) => !n.read).length;
