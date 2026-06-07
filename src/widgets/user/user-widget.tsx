//import { useNavigate } from 'react-router-dom';
import type { User } from '../../lib/types';
import { mockEvents, mockPets } from '../../lib/data';
import { isUpcoming } from '../../lib/helpers';
import './style.css';
//import { Button } from '../../shared/button/button';

export const UserWidget = ({ user }: { user: User }) => {
  //const navigate = useNavigate();

  const planned = mockEvents.filter((e) => e.status === 'planned').length;
  const upcoming = mockEvents.filter((e) => e.status === 'planned' && isUpcoming(e.date)).length;
  const totalCost = mockEvents
    .filter((e) => e.status === 'done' && e.cost !== undefined)
    .reduce((sum, e) => sum + (e.cost ?? 0), 0);

  return (
    <div className="user-widget mb-3">
      {/* Header */}
      <div className="d-flex align-items-center gap-3">
        <img src={user.avatarUrl} alt="avatar" className="user-widget__avatar" />
        <div className="flex-grow-1 overflow-hidden">
          <div className="user-widget__name text-truncate">
            {user.firstName} {user.lastName}
          </div>
          <div className="user-widget__email text-truncate">{user.email}</div>
        </div>
        {/* <Button onClick={() => navigate('/user')} label="Настройки" color="secondary" /> */}
      </div>

      {/* Stats */}
      <div className="user-widget__stats">
        <div className="user-widget__stat">
          <div className="user-widget__stat-value">{mockPets.length}</div>
          <div className="user-widget__stat-label">питомцев</div>
        </div>
        <div className="user-widget__stat">
          <div
            className={`user-widget__stat-value ${upcoming > 0 ? 'user-widget__stat-value--alert' : ''}`}
          >
            {upcoming}
          </div>
          <div className="user-widget__stat-label">на неделе</div>
        </div>
        <div className="user-widget__stat">
          <div className="user-widget__stat-value">{planned}</div>
          <div className="user-widget__stat-label">запланировано</div>
        </div>
      </div>

      {/* Telegram banner */}
      {/* {!user.telegramConnected && (
        <div className="user-widget__telegram-banner">
          <span>✈️</span>
          <span>Подключите Telegram для уведомлений</span>
          <button className="user-widget__telegram-btn">Подключить</button>
        </div>
      )} */}

      {/* Footer */}
      <div className="user-widget__footer">
        <span className="user-widget__footer-label">Всего потрачено</span>
        <span className="user-widget__footer-value">{totalCost.toLocaleString('ru-RU')} ₽</span>
      </div>
    </div>
  );
};
