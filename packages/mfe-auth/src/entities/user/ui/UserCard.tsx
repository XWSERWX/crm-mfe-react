import { FC } from 'react';
import { User } from '../model';
import { authCard, infoBlock, btnRow, btn, COLORS, SPACING } from '../../../shared/styles';

interface UserCardProps {
  user: User;
  onLogout: () => void;
  onSettings: () => void;
}

const UserCard: FC<UserCardProps> = ({ user, onLogout, onSettings }) => (
  <div style={authCard.green}>
    <h2 style={{ color: COLORS.successDark, marginBottom: SPACING.lg, textAlign: 'center' }}>
      Добро пожаловать, {user.name}!
    </h2>
    <div style={infoBlock}>
      <h3 style={{ color: COLORS.dark, marginBottom: SPACING.md }}>Информация о пользователе</h3>
      {([
        ['Имя пользователя', user.name],
        ['Email', user.email],
        ['Роль', user.role],
        ['Последний вход', user.lastLogin],
      ] as [string, string][]).map(([labelText, value]) => (
        <div key={labelText} style={{ marginBottom: SPACING.sm }}>
          <strong>{labelText}:</strong> {value}
        </div>
      ))}
    </div>
    <div style={btnRow}>
      <button onClick={onSettings} style={btn.primaryFlex}>Настройки профиля</button>
      <button onClick={onLogout} style={btn.dangerFlex}>Выйти</button>
    </div>
  </div>
);

export default UserCard;
