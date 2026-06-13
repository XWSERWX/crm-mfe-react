import { FC } from 'react';
import { Client } from '../../entities/client/model';
import { card, sectionHeader, emptyState, tableHeadRow, tableTh } from '../../shared/styles';
import ClientRow from '../../entities/client/ui/ClientRow';

const HEADERS = ['ID', 'ФИО', 'Контакты', 'Компания', 'Статус', 'Последний контакт', 'Действия'];

interface ClientsTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: number) => void;
}

const ClientsTable: FC<ClientsTableProps> = ({ clients, onEdit, onDelete }) => (
<div style={card}>
    <div style={sectionHeader}>Список клиентов ({clients.length})</div>
    {clients.length === 0 ? (
      <div style={emptyState}>Клиенты не найдены. Попробуйте изменить параметры поиска.</div>
    ) : (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={tableHeadRow}>
              {HEADERS.map((h) => <th key={h} style={tableTh}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <ClientRow key={client.id} client={client} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default ClientsTable;
