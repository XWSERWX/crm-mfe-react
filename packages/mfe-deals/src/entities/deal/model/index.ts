export type { Deal } from '@crm/types';

export interface FunnelStage {
  id: string;
  name: string;
  color: string;
  probability: number;
}

export interface DealFormData {
  title: string;
  client: string;
  value: number;
  stage: string;
  probability: number;
  startDate: string;
  expectedClose: string;
  manager: string;
}

export const SALES_FUNNEL_STAGES: FunnelStage[] = [
  { id: 'Лид', name: 'Лид', color: '#95a5a6', probability: 20 },
  { id: 'Квалификация', name: 'Квалификация', color: '#3498db', probability: 30 },
  { id: 'Предложение', name: 'Предложение', color: '#9b59b6', probability: 50 },
  { id: 'Переговоры', name: 'Переговоры', color: '#f39c12', probability: 70 },
  { id: 'Закрыта', name: 'Закрыта', color: '#27ae60', probability: 100 },
  { id: 'Потеряна', name: 'Потеряна', color: '#e74c3c', probability: 0 },
];

export const emptyDeal: DealFormData = {
  title: '',
  client: '',
  value: 0,
  stage: 'Лид',
  probability: 20,
  expectedClose: '',
  manager: '',
  startDate: '',
};

export const freshEmptyDeal = (): DealFormData => ({
  ...emptyDeal,
  startDate: new Date().toISOString().split('T')[0],
});
