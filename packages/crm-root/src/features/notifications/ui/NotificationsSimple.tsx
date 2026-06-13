import { FC, useState } from 'react';
import { useSimpleStore, getUnreadNotificationsCount, Notification } from '../../../app/store/SimpleStore';
import { sectionHeader, btn, COLORS, SPACING, RADIUS, SHADOW, FONT } from '../../../shared/styles';

const ICON_MAP: Record<Notification['type'], string> = {
  success: '✅', warning: '⚠️', error: '❌', info: 'ℹ️',
};

const COLOR_MAP: Record<Notification['type'], string> = {
  success: COLORS.success, warning: COLORS.warning, error: COLORS.danger, info: COLORS.primary,
};

const NotificationsSimple: FC = () => {
  const { state, dispatch } = useSimpleStore();
  const { notifications } = state;
  const unreadCount = getUnreadNotificationsCount(state);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ ...btn.primary, position: 'relative', padding: `8px 16px`, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: FONT.weight.medium }}
      >
        <span>🔔 Уведомления</span>
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: '-5px', right: '-5px',
            backgroundColor: COLORS.danger, color: COLORS.white,
            borderRadius: '50%', width: '20px', height: '20px',
            fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: FONT.weight.bold,
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, width: '350px',
          backgroundColor: COLORS.white, borderRadius: RADIUS.md,
          boxShadow: SHADOW.popup, zIndex: 1000, marginTop: SPACING.sm, overflow: 'hidden',
        }}>
          <div style={sectionHeader}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>Уведомления системы</h3>
            <div style={{ display: 'flex', gap: SPACING.sm }}>
              {unreadCount > 0 && (
                <button onClick={() => dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' })} style={btn.sm}>
                  Прочитать все
                </button>
              )}
              <button onClick={() => dispatch({ type: 'CLEAR_NOTIFICATIONS' })} style={btn.smDanger}>
                Очистить
              </button>
            </div>
          </div>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: COLORS.gray }}>Нет уведомлений</div>
            ) : (
              notifications.slice().reverse().map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notification.id })}
                  style={{
                    padding: `${SPACING.md} ${SPACING.lg}`,
                    borderBottom: `1px solid ${COLORS.grayBorderLight}`,
                    backgroundColor: notification.read ? COLORS.white : COLORS.bgSection,
                    cursor: 'pointer',
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                  }}
                >
                  <div style={{ fontSize: '20px', flexShrink: 0 }}>{ICON_MAP[notification.type]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: notification.read ? FONT.weight.normal : FONT.weight.bold, color: COLOR_MAP[notification.type], marginBottom: SPACING.xs }}>
                      {notification.message}
                    </div>
                    <div style={{ fontSize: '12px', color: COLORS.grayMid }}>{notification.timestamp}</div>
                  </div>
                  {!notification.read && (
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: COLORS.primary, flexShrink: 0, marginTop: SPACING.xs }} />
                  )}
                </div>
              ))
            )}
          </div>

          <div style={{ padding: `${SPACING.sm} ${SPACING.lg}`, backgroundColor: COLORS.bgSection, borderTop: `1px solid ${COLORS.grayBorderLight}`, textAlign: 'center', fontSize: '14px', color: COLORS.gray }}>
            {notifications.length} уведомлений, {unreadCount} непрочитанных
          </div>
        </div>
      )}

      {isOpen && (
        <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }} />
      )}
    </div>
  );
};

export default NotificationsSimple;
