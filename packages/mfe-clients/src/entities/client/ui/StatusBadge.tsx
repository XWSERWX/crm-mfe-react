import { FC } from 'react';
import { ClientStatus, STATUS_COLORS } from '../model';
import { badge } from '../../../shared/styles';

interface StatusBadgeProps {
  status: ClientStatus;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
  <span style={badge(STATUS_COLORS[status])}>{status}</span>
);

export default StatusBadge;
