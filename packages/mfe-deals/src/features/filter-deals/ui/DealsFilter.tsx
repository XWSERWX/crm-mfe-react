import { FC, ChangeEvent } from 'react';
import { SALES_FUNNEL_STAGES } from '../../../entities/deal/model';
import { filterContainer, label, selectInput } from '../../../shared/styles';

interface DealsFilterProps {
  filterStage: string;
  sortBy: string;
  sortOrder: string;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSortByChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSortOrderChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const DealsFilter: FC<DealsFilterProps> = ({ filterStage, sortBy, sortOrder, onFilterChange, onSortByChange, onSortOrderChange }) => (
  <div style={filterContainer}>
    <div style={{ flex: '1', minWidth: '200px' }}>
      <label style={label}>Фильтр по стадии:</label>
      <select value={filterStage} onChange={onFilterChange} style={selectInput}>
        <option value="Все">Все стадии</option>
        {SALES_FUNNEL_STAGES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
    </div>
    <div style={{ minWidth: '200px' }}>
      <label style={label}>Сортировка:</label>
      <select value={sortBy} onChange={onSortByChange} style={selectInput}>
        <option value="value">По сумме</option>
        <option value="probability">По вероятности</option>
        <option value="expectedClose">По дате закрытия</option>
      </select>
    </div>
    <div style={{ minWidth: '150px' }}>
      <label style={label}>Порядок:</label>
      <select value={sortOrder} onChange={onSortOrderChange} style={selectInput}>
        <option value="desc">По убыванию</option>
        <option value="asc">По возрастанию</option>
      </select>
    </div>
  </div>
);

export default DealsFilter;
