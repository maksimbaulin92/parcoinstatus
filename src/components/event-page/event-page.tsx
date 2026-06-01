import { useState } from 'react';
import type { PetEvent } from '../../lib/types';
import { formatDate } from '../../lib/helpers';
import { mockEvents, purchaseCategoryLabels, typeConfig } from '../../lib/data';
import { SettingsDropdown } from './../shared/dropdown';
import { useNavigate } from 'react-router-dom';
import './style.css';

const EventDetail = ({ event }: { event: PetEvent }) => {
  switch (event.type) {
    case 'vet':
      return (
        <>
          <div className="event-card__row">
            <span className="event-card__row-label">Клиника</span>
            <span className="event-card__row-value">{event.clinic}</span>
          </div>
          <div className="event-card__row">
            <span className="event-card__row-label">Врач</span>
            <span className="event-card__row-value">{event.doctor}</span>
          </div>
          <div className="event-card__row">
            <span className="event-card__row-label">Диагноз</span>
            <span className="event-card__row-value">{event.diagnosis || '—'}</span>
          </div>
          {event.nextVisitDate && (
            <div className="event-card__row">
              <span className="event-card__row-label">Следующий приём</span>
              <span className="event-card__row-value event-card__row-value--accent">
                {formatDate(event.nextVisitDate)}
              </span>
            </div>
          )}
        </>
      );
    case 'vaccination':
      return (
        <>
          <div className="event-card__row">
            <span className="event-card__row-label">Вакцина</span>
            <span className="event-card__row-value">{event.vaccineName}</span>
          </div>
          {event.nextDate && (
            <div className="event-card__row">
              <span className="event-card__row-label">Следующая</span>
              <span className="event-card__row-value event-card__row-value--accent">
                {formatDate(event.nextDate)}
              </span>
            </div>
          )}
        </>
      );
    case 'medication':
      return (
        <>
          <div className="event-card__row">
            <span className="event-card__row-label">Препарат</span>
            <span className="event-card__row-value">{event.medicationName}</span>
          </div>
          <div className="event-card__row">
            <span className="event-card__row-label">Количество</span>
            <span className="event-card__row-value">{event.quantity} шт.</span>
          </div>
          <div className="event-card__row">
            <span className="event-card__row-label">Остаток</span>
            <span
              className={`event-card__row-value ${event.remaining <= 1 ? 'event-card__row-value--danger' : 'event-card__row-value--success'}`}
            >
              {event.remaining} шт.{event.remaining <= 1 && ' ⚠️'}
            </span>
          </div>
          <div className="event-card__row">
            <span className="event-card__row-label">Периодичность</span>
            <span className="event-card__row-value">каждые {event.periodDays} дней</span>
          </div>
        </>
      );
    case 'grooming':
      return (
        <div className="event-card__row">
          <span className="event-card__row-label">Салон</span>
          <span className="event-card__row-value">{event.salon}</span>
        </div>
      );
    case 'purchase':
      return (
        <>
          <div className="event-card__row">
            <span className="event-card__row-label">Категория</span>
            <span className="event-card__row-value">{purchaseCategoryLabels[event.category]}</span>
          </div>
          <div className="event-card__row">
            <span className="event-card__row-label">Товар</span>
            <span className="event-card__row-value">{event.itemName}</span>
          </div>
        </>
      );
    default:
      return null;
  }
};

export const EventCard = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number>(mockEvents[0].id);
  const [events, setEvents] = useState<PetEvent[]>(mockEvents);

  const event = events.find((e) => e.id === selectedId)!;
  const cfg = typeConfig[event.type];

  const toggleStatus = () => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === selectedId ? { ...e, status: e.status === 'done' ? 'planned' : 'done' } : e
      )
    );
  };

  return (
    <div className="container" style={{ maxWidth: 430 }}>
      {/* Header */}
      <div className="event-card__header">
        <div className="event-card__header-left">
          <button className="event-card__back-btn" onClick={() => navigate('/')}>
            ← Назад
          </button>
          <span className="event-card__header-title">Событие</span>
        </div>
        <SettingsDropdown label="Настройки">
          <button className="btn btn-sm w-100 text-start px-3 py-2">Редактировать</button>
          <button className="btn btn-sm w-100 text-start px-3 py-2 text-danger">Удалить</button>
        </SettingsDropdown>
      </div>

      {/* Demo switcher */}
      <div hidden className="event-card__switcher">
        {events.map((e) => (
          <button
            key={e.id}
            className={`event-card__switcher-btn ${selectedId === e.id ? 'event-card__switcher-btn--active' : ''}`}
            onClick={() => setSelectedId(e.id)}
          >
            {typeConfig[e.type].icon} {typeConfig[e.type].label}
          </button>
        ))}
      </div>

      {/* Type badge + status */}
      <div className="event-card__meta-row">
        <span className={`event-card__type-badge event-card__type-badge--${event.type}`}>
          {cfg.icon} {cfg.label}
        </span>
        <button
          className={`event-card__status-btn ${event.status === 'done' ? 'event-card__status-btn--done' : 'event-card__status-btn--planned'}`}
          onClick={toggleStatus}
        >
          {event.status === 'done' ? '✓ Выполнено' : '○ Запланировано'}
        </button>
      </div>

      {/* Main info */}
      <div className="event-card__section">
        <div className="event-card__row">
          <span className="event-card__row-label">Питомец</span>
          <span className="event-card__row-value">🐾 {event.petName}</span>
        </div>
        <div className="event-card__row">
          <span className="event-card__row-label">Дата</span>
          <span className="event-card__row-value">{formatDate(event.date)}</span>
        </div>
        {event.cost !== undefined && (
          <div className="event-card__row">
            <span className="event-card__row-label">Стоимость</span>
            <span className="event-card__row-value">{event.cost.toLocaleString('ru-RU')} ₽</span>
          </div>
        )}
        <EventDetail event={event} />
      </div>

      {/* Notes */}
      {event.notes && (
        <div className="event-card__section">
          <div className="event-card__section-header">Заметка</div>
          <p className="event-card__notes">{event.notes}</p>
        </div>
      )}

      {/* Photos */}
      <div className="event-card__section">
        <div className="event-card__section-header">
          <span>Фото</span>
          <span>{event.photos.length} шт.</span>
        </div>
        {event.photos.length > 0 ? (
          <div className="event-card__photos">
            {event.photos.map((photo) => (
              <img key={photo.id} src={photo.url} alt="" className="event-card__photo" />
            ))}
            <div className="event-card__photo-add">+</div>
          </div>
        ) : (
          <div className="event-card__photos-empty">
            <p className="event-card__photos-empty-text">Фото нет</p>
            <button className="event-card__photos-add-btn">+ Добавить фото</button>
          </div>
        )}
      </div>

      {/* Reminder */}
      <div className="event-card__section" style={{ marginBottom: 24 }}>
        <div className="event-card__section-header">Напоминание</div>
        <div className="event-card__row">
          <span className="event-card__row-label">📧 Email</span>
          <span className="event-card__reminder-badge--on">За 3 дня</span>
        </div>
        <div className="event-card__row">
          <span className="event-card__row-label">✈️ Telegram</span>
          <span className="event-card__reminder-badge--off">Выкл.</span>
        </div>
      </div>
    </div>
  );
};
