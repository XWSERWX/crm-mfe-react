export interface User {
  name: string;
  email: string;
  role: string;
  lastLogin: string;
}

export type ClientStatus = 'Активный' | 'Неактивный' | 'Потенциальный';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ClientStatus;
  lastContact: string;
}

export interface Deal {
  id: number;
  title: string;
  client: string;
  value: number;
  stage: string;
  probability: number;
  startDate: string;
  expectedClose: string;
  manager: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
}

export * from './styles';
