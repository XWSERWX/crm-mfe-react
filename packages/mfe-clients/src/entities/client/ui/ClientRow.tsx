import { FC } from 'react';
import { Client } from '../model';
import { tableTd, actionCell, secondaryText, btn, COLORS } from '../../../shared/styles';
import StatusBadge from './StatusBadge';

interface ClientRowProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (id: number) => void;
}

const ClientRow: FC<ClientRowProps> = ({ client, onEdit, onDelete }) => (
  <tr style={{ borderBottom: `1px solid ${COLORS.grayBorderLight}` }}>
    <td style={tableTd}>{client.id}</td>
    <td style={{ ...tableTd, fontWeight: 500 }}>{client.name}</td>
    <td style={tableTd}>
      <div>{client.email}</div>
      <div style={secondaryText}>{client.phone}</div>
    </td>
    <td style={tableTd}>{client.company}</td>
    <td style={tableTd}><StatusBadge status={client.status} /></td>
    <td style={tableTd}>{client.lastContact}</td>
    <td style={tableTd}>
      <div style={actionCell}>
        <button onClick={() => onEdit(client)} style={btn.edit}>Редактировать</button>
        <button onClick={() => onDelete(client.id)} style={btn.delete}>Удалить</button>
      </div>
    </td>
  </tr>
);

export default ClientRow;
