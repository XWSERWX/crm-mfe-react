import { FC } from 'react';
import { Deal } from '../../entities/deal/model';
import { card, sectionHeader, emptyState, tableHeadRow, tableTh } from '../../shared/styles';
import DealRow from '../../entities/deal/ui/DealRow';

const HEADERS = ['ID', 'Название', 'Клиент', 'Сумма', 'Стадия', 'Вероятность', 'Дата закрытия', 'Действия'];

interface DealsTableProps {
  deals: Deal[];
  onEdit: (deal: Deal) => void;
  onDelete: (id: number) => void;
  onStageChange: (dealId: number, newStage: string) => void;
}

const DealsTable: FC<DealsTableProps> = ({ deals, onEdit, onDelete, onStageChange }) => (
  <div style={card}>
    <div style={sectionHeader}>Список сделок ({deals.length})</div>
    {deals.length === 0 ? (
      <div style={emptyState}>Сделки не найдены. Попробуйте изменить параметры фильтрации.</div>
    ) : (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={tableHeadRow}>
              {HEADERS.map((h) => <th key={h} style={tableTh}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <DealRow key={deal.id} deal={deal} onEdit={onEdit} onDelete={onDelete} onStageChange={onStageChange} />
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default DealsTable;
