import { FC, ChangeEvent } from 'react';
import { Deal, SALES_FUNNEL_STAGES } from '../model';
import { tableTd, actionCell, stageSelect, probBarTrack, probFill, btn, COLORS, SPACING } from '../../../shared/styles';

interface DealRowProps {
  deal: Deal;
  onEdit: (deal: Deal) => void;
  onDelete: (id: number) => void;
  onStageChange: (dealId: number, newStage: string) => void;
}

const DealRow: FC<DealRowProps> = ({ deal, onEdit, onDelete, onStageChange }) => {
  const stageInfo = SALES_FUNNEL_STAGES.find((s) => s.id === deal.stage) ?? SALES_FUNNEL_STAGES[0];
  return (
    <tr style={{ borderBottom: `1px solid ${COLORS.grayBorderLight}` }}>
      <td style={tableTd}>{deal.id}</td>
      <td style={{ ...tableTd, fontWeight: 500 }}>{deal.title}</td>
      <td style={tableTd}>{deal.client}</td>
      <td style={{ ...tableTd, fontWeight: 700, color: COLORS.success }}>{deal.value.toLocaleString()} ₽</td>
      <td style={tableTd}>
        <select
          value={deal.stage}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onStageChange(deal.id, e.target.value)}
          style={stageSelect(stageInfo.color)}
        >
          {SALES_FUNNEL_STAGES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </td>
      <td style={tableTd}>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
          <div style={probBarTrack}>
            <div style={probFill(deal.probability)} />
          </div>
          <span style={{ fontWeight: 500, minWidth: '40px' }}>{deal.probability}%</span>
        </div>
      </td>
      <td style={tableTd}>{deal.expectedClose}</td>
      <td style={tableTd}>
        <div style={actionCell}>
          <button onClick={() => onEdit(deal)} style={btn.edit}>Редактировать</button>
          <button onClick={() => onDelete(deal.id)} style={btn.delete}>Удалить</button>
        </div>
      </td>
    </tr>
  );
};

export default DealRow;
