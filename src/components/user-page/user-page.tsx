import { useState } from 'react';
import { mockUser } from '../../lib/data';
import type { User } from '../../lib/types';
import { useNavigate } from 'react-router-dom';
import './style.css';

export const UserCard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    login: user.login,
    email: user.email,
    telegramUsername: user.telegramUsername,
  });

  const handleSave = () => {
    setUser((prev) => ({ ...prev, ...form }));
    setIsEditing(false);
  };

  return (
    <div className="container" style={{ maxWidth: 430 }}>
      {/* Header */}
      <div className="user-card__header">
        <button disabled={isEditing} onClick={() => navigate('/')} className="user-card__back-btn">
          ← Назад
        </button>
        <span className="user-card__header-title">Профиль</span>
        <button
          className={`user-card__edit-btn ${isEditing ? 'user-card__edit-btn--cancel' : ''}`}
          onClick={() => setIsEditing((v) => !v)}
        >
          {isEditing ? 'Отмена' : 'Изменить'}
        </button>
      </div>

      {/* Avatar */}
      <div className="user-card__avatar-block">
        <div className="user-card__avatar-wrap">
          <img src={user.avatarUrl} alt="avatar" className="user-card__avatar" />
          {isEditing && <button className="user-card__avatar-edit-btn">✏️</button>}
        </div>
        <div>
          <div className="user-card__name">
            {user.firstName} {user.lastName}
          </div>
          <div className="user-card__login">{user.login}</div>
        </div>
      </div>

      {/* Info section */}
      <div className="user-card__section">
        <div className="user-card__section-header">Основная информация</div>
        {isEditing ? (
          <div className="user-card__form">
            {[
              { label: 'Имя', key: 'firstName', type: 'text' },
              { label: 'Фамилия', key: 'lastName', type: 'text' },
              { label: 'Логин', key: 'login', type: 'text' },
              { label: 'Email', key: 'email', type: 'email' },
              { label: 'Telegram', key: 'telegramUsername', type: 'text' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <div className="user-card__form-label">{label}</div>
                <input
                  className="user-card__form-input"
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                />
              </div>
            ))}
            <button className="user-card__save-btn" onClick={handleSave}>
              Сохранить
            </button>
          </div>
        ) : (
          <>
            {[
              { label: 'Email', value: user.email },
              { label: 'Логин', value: user.login },
              { label: 'Telegram', value: user.telegramUsername },
            ].map(({ label, value }) => (
              <div key={label} className="user-card__row">
                <span className="user-card__row-label">{label}</span>
                <span className="user-card__row-value">{value}</span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Actions */}
      {!isEditing && (
        <div className="user-card__actions">
          <button className="user-card__action-btn" onClick={() => navigate('/notification')}>
            Настроить уведомления
          </button>
          <button className="user-card__action-btn">Изменить пароль</button>
          <button className="user-card__action-btn user-card__action-btn--danger">
            Удалить аккаунт
          </button>
        </div>
      )}
    </div>
  );
};
