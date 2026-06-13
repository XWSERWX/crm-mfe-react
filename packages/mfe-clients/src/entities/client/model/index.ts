export type { Client, ClientStatus } from '@crm/types';

import type { ClientStatus } from '@crm/types';

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ClientStatus;
}

export const STATUS_COLORS: Record<ClientStatus, string> = {
  'Активный': '#27ae60',
  'Неактивный': '#e74c3c',
  'Потенциальный': '#f39c12',
};

export const STATUS_OPTIONS: ClientStatus[] = ['Потенциальный', 'Активный', 'Неактивный'];

export const emptyClient: ClientFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  status: 'Потенциальный',
};
