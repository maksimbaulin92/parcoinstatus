import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { NotificationSettings, User } from '../../lib/types';
import { mockUser, notificationLabels } from '../../lib/data';
import './style.css';

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <label className="notif-card__toggle">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="notif-card__toggle-track" />
  </label>
);

export const NotificationCard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(mockUser);

  const toggleNotification = (key: keyof Omit<NotificationSettings, 'channels'>) => {
    setUser((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const toggleChannel = (key: keyof NotificationSettings['channels']) => {
    setUser((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        channels: {
          ...prev.notifications.channels,
          [key]: !prev.notifications.channels[key],
        },
      },
    }));
  };

  return (
    <div className="container" style={{ maxWidth: 430 }}>
      {/* Header */}
      <div className="notif-card__header">
        <button className="notif-card__back-btn" onClick={() => navigate('/user')}>
          ← Назад
        </button>
        <span className="notif-card__header-title">Уведомления</span>
        <div style={{ width: 70 }} />
      </div>

      {/* Channels */}
      <div className="notif-card__section">
        <div className="notif-card__section-header">Каналы уведомлений</div>

        <div className="notif-card__row">
          <div className="notif-card__row-left">
            <span className="notif-card__row-label">📧 Email</span>
            <span className="notif-card__row-sub">{user.email}</span>
          </div>
          <Toggle
            checked={user.notifications.channels.email}
            onChange={() => toggleChannel('email')}
          />
        </div>

        <div className="notif-card__row">
          <div className="notif-card__row-left">
            <span className="notif-card__row-label">✈️ Telegram</span>
            <span className="notif-card__row-sub">{user.telegramUsername}</span>
          </div>
          <Toggle
            checked={user.notifications.channels.telegram}
            onChange={() => toggleChannel('telegram')}
          />
        </div>
      </div>

      {/* Types */}
      <div className="notif-card__section">
        <div className="notif-card__section-header">Типы уведомлений</div>
        {notificationLabels.map(({ key, label, icon }) => (
          <div key={key} className="notif-card__row">
            <span className="notif-card__row-label">
              {icon} {label}
            </span>
            <Toggle checked={user.notifications[key]} onChange={() => toggleNotification(key)} />
          </div>
        ))}
      </div>
    </div>
  );
};
