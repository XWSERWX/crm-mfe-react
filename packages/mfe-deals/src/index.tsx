import { FC, useState, useMemo, ChangeEvent, FormEvent } from 'react';
import { Dispatch } from 'react';
import { Deal } from './entities/deal/model';
import { DealFormData, freshEmptyDeal, SALES_FUNNEL_STAGES } from './entities/deal/model';
import { appContainer, appHeader, appTitle, btn } from './shared/styles';
import DealsStats from './widgets/deals-stats';
import DealsTable from './widgets/deals-table';
import DealForm from './features/manage-deal/ui/DealForm';
import DealsFilter from './features/filter-deals/ui/DealsFilter';
import SalesFunnel from './features/sales-funnel/ui/SalesFunnel';

type DealAction =
  | { type: 'ADD_DEAL'; payload: Omit<Deal, 'id'> }
  | { type: 'UPDATE_DEAL'; payload: Deal }
  | { type: 'DELETE_DEAL'; payload: number };

interface DealsAppProps {
  dispatch: Dispatch<DealAction>;
  deals?: Deal[];
}

const DealsApp: FC<DealsAppProps> = ({ dispatch, deals = [] }) => {
  const [formData, setFormData] = useState<DealFormData>(freshEmptyDeal);
  const [filterStage, setFilterStage] = useState('Все');
  const [sortBy, setSortBy] = useState('value');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredAndSortedDeals = useMemo(() => {
    const filtered = filterStage === 'Все' ? deals : deals.filter((d) => d.stage === filterStage);
    return [...filtered].sort((a, b) => {
      let diff: number;
      if (sortBy === 'value') diff = a.value - b.value;
      else if (sortBy === 'probability') diff = a.probability - b.probability;
      else diff = new Date(a.expectedClose).getTime() - new Date(b.expectedClose).getTime();
      return sortOrder === 'desc' ? -diff : diff;
    });
  }, [deals, filterStage, sortBy, sortOrder]);

  const funnelCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const deal of deals) counts[deal.stage] = (counts[deal.stage] ?? 0) + 1;
    return counts;
  }, [deals]);

  const maxFunnelCount = useMemo(() => Math.max(1, ...Object.values(funnelCounts)), [funnelCounts]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'value' || name === 'probability' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      dispatch({ type: 'UPDATE_DEAL', payload: { ...formData, id: editingId } });
    } else {
      dispatch({ type: 'ADD_DEAL', payload: formData });
    }
    setFormData(freshEmptyDeal());
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (deal: Deal) => {
    setFormData({ title: deal.title, client: deal.client, value: deal.value, stage: deal.stage, probability: deal.probability, startDate: deal.startDate, expectedClose: deal.expectedClose, manager: deal.manager });
    setEditingId(deal.id);
    setIsAdding(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту сделку?')) {
      dispatch({ type: 'DELETE_DEAL', payload: id });
    }
  };

  const handleCancel = () => {
    setFormData(freshEmptyDeal());
    setEditingId(null);
    setIsAdding(false);
  };

  const handleStageChange = (dealId: number, newStage: string) => {
    const deal = deals.find((d) => d.id === dealId);
    const stageInfo = SALES_FUNNEL_STAGES.find((s) => s.id === newStage);
    if (!deal || !stageInfo) return;
    dispatch({ type: 'UPDATE_DEAL', payload: { ...deal, stage: newStage, probability: stageInfo.probability } });
  };

  return (
    <div style={appContainer}>
      <div style={appHeader}>
        <h2 style={appTitle}>Управление сделками</h2>
        <button onClick={() => setIsAdding(true)} style={btn.accent}>+ Новая сделка</button>
      </div>

      <DealsStats deals={deals} />
      <SalesFunnel funnelCounts={funnelCounts} maxFunnelCount={maxFunnelCount} />
      <DealsFilter
        filterStage={filterStage} sortBy={sortBy} sortOrder={sortOrder}
        onFilterChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterStage(e.target.value)}
        onSortByChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
        onSortOrderChange={(e: ChangeEvent<HTMLSelectElement>) => setSortOrder(e.target.value)}
      />

      {isAdding && (
        <DealForm formData={formData} editingId={editingId} onSubmit={handleSubmit} onCancel={handleCancel} onInputChange={handleInputChange} />
      )}

      <DealsTable deals={filteredAndSortedDeals} onEdit={handleEdit} onDelete={handleDelete} onStageChange={handleStageChange} />
    </div>
  );
};

export default DealsApp;
