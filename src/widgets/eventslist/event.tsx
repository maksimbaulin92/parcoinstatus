import { eventTypeConfig, mockPets } from '../../lib/data';
import { formatDate, isUpcoming } from '../../lib/helpers';
import type { PetEvent } from '../../lib/types';
import './event-style.css';

interface EventProps {
  event: PetEvent;
  isLast: boolean;
}

const getEventTitle = (event: PetEvent): string => {
  switch (event.type) {
    case 'vet':
      return event.notes || 'Приём ветеринара';
    case 'vaccination':
      return event.vaccineName;
    case 'medication':
      return event.medicationName;
    case 'grooming':
      return event.salon || 'Груминг';
    case 'purchase':
      return event.itemName;
    case 'note':
      return event.notes || 'Заметка';
  }
};

export const PetEventComponent = ({ event, isLast }: EventProps) => {
  const cfg = eventTypeConfig[event.type];
  const upcoming = isUpcoming(event.date) && event.status === 'planned';
  const pet = mockPets.find((p) => p.id === event.petId);

  return (
    <div
      className={`pet-event ${upcoming ? 'pet-event--upcoming' : ''} ${isLast ? 'pet-event--last' : ''}`}
    >
      <div className="d-flex align-items-center gap-2">
        {/* Pet avatar */}
        {pet && <img src={pet.avatarUrl} alt={pet.name} className="pet-event__avatar" />}

        {/* Main info */}
        <div className="flex-grow-1 overflow-hidden">
          <div className="d-flex align-items-center gap-1">
            <span className="pet-event__icon">{cfg.icon}</span>
            <span className="pet-event__title">{getEventTitle(event)}</span>
            {upcoming && <span className="pet-event__badge-soon">скоро</span>}
          </div>
          <div className="pet-event__meta">
            {event.petName} · {formatDate(event.date)}
          </div>
        </div>

        {/* Right side */}
        <div className="d-flex flex-column align-items-end flex-shrink-0">
          {event.cost !== undefined && (
            <span className="pet-event__cost">{event.cost.toLocaleString('ru-RU')} ₽</span>
          )}
          <span
            className={`pet-event__status ${event.status === 'done' ? 'pet-event__status--done' : 'pet-event__status--planned'}`}
          >
            {event.status === 'done' ? '✓' : '○'}
          </span>
        </div>
      </div>
    </div>
  );
};
