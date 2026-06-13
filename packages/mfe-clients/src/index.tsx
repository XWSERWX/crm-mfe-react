import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Dispatch } from 'react';
import { Client } from './entities/client/model';
import { ClientFormData, emptyClient } from './entities/client/model';
import { appContainer, appHeader, appTitle, btn } from './shared/styles';
import ClientsStats from './widgets/clients-stats';
import ClientsTable from './widgets/clients-table';
import ClientForm from './features/manage-client/ui/ClientForm';
import ClientsFilter from './features/filter-clients/ui/ClientsFilter';

type ClientAction =
  | { type: 'ADD_CLIENT'; payload: Omit<Client, 'id'> }
  | { type: 'UPDATE_CLIENT'; payload: Client }
  | { type: 'DELETE_CLIENT'; payload: number };

interface ClientsAppProps {
  dispatch: Dispatch<ClientAction>;
  clients?: Client[];
}

const ClientsApp: FC<ClientsAppProps> = ({ dispatch, clients = [] }) => {
  const [formData, setFormData] = useState<ClientFormData>(emptyClient);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Все');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Все' || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    if (editingId) {
      dispatch({ type: 'UPDATE_CLIENT', payload: { ...formData, id: editingId, lastContact: today } });
    } else {
      dispatch({ type: 'ADD_CLIENT', payload: { ...formData, lastContact: today } });
    }
    setFormData(emptyClient);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (client: Client) => {
    setFormData({ name: client.name, email: client.email, phone: client.phone, company: client.company, status: client.status });
    setEditingId(client.id);
    setIsAdding(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этого клиента?')) {
      dispatch({ type: 'DELETE_CLIENT', payload: id });
    }
  };

  const handleCancel = () => {
    setFormData(emptyClient);
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div style={appContainer}>
      <div style={appHeader}>
        <h2 style={appTitle}>Управление клиентами</h2>
        <button onClick={() => setIsAdding(true)} style={btn.accent}>+ Добавить клиента</button>
      </div>

      <ClientsStats clients={clients} />

      <ClientsFilter
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        onSearchChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        onFilterChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
      />

      {isAdding && (
        <ClientForm formData={formData} editingId={editingId} onSubmit={handleSubmit} onCancel={handleCancel} onInputChange={handleInputChange} />
      )}

      <ClientsTable clients={filteredClients} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ClientsApp;
