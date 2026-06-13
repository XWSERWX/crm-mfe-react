import { FC, ChangeEvent } from 'react';
import { STATUS_OPTIONS } from '../../../entities/client/model';
import { filterContainer, label, input, selectInput } from '../../../shared/styles';

interface ClientsFilterProps {
  searchTerm: string;
  filterStatus: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const ClientsFilter: FC<ClientsFilterProps> = ({ searchTerm, filterStatus, onSearchChange, onFilterChange }) => (
  <div style={filterContainer}>
    <div style={{ flex: '1', minWidth: '250px' }}>
      <label style={label}>Поиск клиентов:</label>
      <input type="text" placeholder="Поиск по имени, email или компании..." value={searchTerm} onChange={onSearchChange} style={input} />
    </div>
    <div style={{ minWidth: '200px' }}>
      <label style={label}>Фильтр по статусу:</label>
      <select value={filterStatus} onChange={onFilterChange} style={selectInput}>
        <option value="Все">Все статусы</option>
        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  </div>
);

export default ClientsFilter;
