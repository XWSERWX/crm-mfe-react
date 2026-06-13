import { FC, ChangeEvent, FormEvent } from 'react';
import { ClientFormData, STATUS_OPTIONS } from '../../../entities/client/model';
import { formCard, formHeading, inputGrid, label, input, selectInput, btnRow, btn } from '../../../shared/styles';

interface FieldDef {
  label: string;
  name: keyof ClientFormData;
  type: string;
  placeholder: string;
  required?: boolean;
}

const FIELDS: FieldDef[] = [
  { label: 'ФИО: *',     name: 'name',    type: 'text',  placeholder: 'Иван Иванов',       required: true },
  { label: 'Email: *',   name: 'email',   type: 'email', placeholder: 'ivan@mail.com',      required: true },
  { label: 'Телефон:',   name: 'phone',   type: 'tel',   placeholder: '+7 (900) 123-45-67' },
  { label: 'Компания:',  name: 'company', type: 'text',  placeholder: 'ООО ТехноПром' },
];

interface ClientFormProps {
  formData: ClientFormData;
  editingId: number | null;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ClientForm: FC<ClientFormProps> = ({ formData, editingId, onSubmit, onCancel, onInputChange }) => (
  <div style={formCard}>
    <h3 style={formHeading}>{editingId ? 'Редактирование клиента' : 'Добавление нового клиента'}</h3>
    <form onSubmit={onSubmit}>
      <div style={inputGrid}>
        {FIELDS.map(({ label: lbl, name, type, placeholder, required }) => (
          <div key={name}>
            <label style={label}>{lbl}</label>
            <input type={type} name={name} value={formData[name] as string} onChange={onInputChange} placeholder={placeholder} required={required} style={input} />
          </div>
        ))}
        <div>
          <label style={label}>Статус:</label>
          <select name="status" value={formData.status} onChange={onInputChange} style={selectInput}>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div style={btnRow}>
        <button type="submit" style={btn.success}>{editingId ? 'Сохранить изменения' : 'Добавить клиента'}</button>
        <button type="button" onClick={onCancel} style={btn.cancel}>Отмена</button>
      </div>
    </form>
  </div>
);

export default ClientForm;
