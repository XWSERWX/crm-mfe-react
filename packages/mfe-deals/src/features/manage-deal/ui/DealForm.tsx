import { FC, ChangeEvent, FormEvent } from 'react';
import { DealFormData, SALES_FUNNEL_STAGES } from '../../../entities/deal/model';
import { formCard, formHeading, inputGrid, label, input, selectInput, btnRow, btn, COLORS, SPACING } from '../../../shared/styles';

interface TextFieldDef {
  label: string;
  name: keyof DealFormData;
  type: string;
  placeholder: string;
  required?: boolean;
}

const TEXT_FIELDS: TextFieldDef[] = [
  { label: 'Название сделки: *', name: 'title',   type: 'text', placeholder: 'Разработка корпоративного сайта', required: true },
  { label: 'Клиент: *',          name: 'client',  type: 'text', placeholder: 'ООО ТехноПром',                   required: true },
  { label: 'Менеджер:',          name: 'manager', type: 'text', placeholder: 'Иван Иванов' },
];

interface DealFormProps {
  formData: DealFormData;
  editingId: number | null;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const DealForm: FC<DealFormProps> = ({ formData, editingId, onSubmit, onCancel, onInputChange }) => (
  <div style={formCard}>
    <h3 style={formHeading}>{editingId ? 'Редактирование сделки' : 'Добавление новой сделки'}</h3>
    <form onSubmit={onSubmit}>
      <div style={inputGrid}>
        {TEXT_FIELDS.map(({ label: lbl, name, type, placeholder, required }) => (
          <div key={name}>
            <label style={label}>{lbl}</label>
            <input type={type} name={name} value={formData[name] as string} onChange={onInputChange} placeholder={placeholder} required={required} style={input} />
          </div>
        ))}
        <div>
          <label style={label}>Сумма (₽): *</label>
          <input type="number" name="value" value={formData.value} onChange={onInputChange} placeholder="500000" required min="0" style={input} />
        </div>
        <div>
          <label style={label}>Стадия:</label>
          <select name="stage" value={formData.stage} onChange={onInputChange} style={selectInput}>
            {SALES_FUNNEL_STAGES.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.probability}%)</option>)}
          </select>
        </div>
        <div>
          <label style={label}>Вероятность (%):</label>
          <input type="range" name="probability" min="0" max="100" step="10" value={formData.probability} onChange={onInputChange} style={{ width: '100%' }} />
          <div style={{ textAlign: 'center', marginTop: SPACING.xs, fontWeight: 500 }}>{formData.probability}%</div>
        </div>
        <div>
          <label style={label}>Дата начала:</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={onInputChange} style={input} />
        </div>
        <div>
          <label style={label}>Ожидаемая дата закрытия:</label>
          <input type="date" name="expectedClose" value={formData.expectedClose} onChange={onInputChange} style={input} />
        </div>
      </div>
      <div style={btnRow}>
        <button type="submit" style={btn.submit}>{editingId ? 'Сохранить изменения' : 'Добавить сделку'}</button>
        <button type="button" onClick={onCancel} style={btn.cancel}>Отмена</button>
      </div>
    </form>
  </div>
);

export default DealForm;
