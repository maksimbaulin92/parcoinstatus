import { useNavigate } from 'react-router-dom';
import type { PetEvent } from '../../lib/types';
import { useState } from 'react';
import { PetEventComponent } from './event';
import { PetFilter } from './pet-filter';
import { StatusFilter } from './status-filter-list';
import './event-list-style.css';
import { AddButton } from '../../components/shared/add-button';

export type StatusType = 'all' | 'planned' | 'done';

export const EventsList = ({ events }: { events: PetEvent[] }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<StatusType>('all');
  const [petFilter, setPetFilter] = useState<number | null>(null);

  const filtered = events
    .filter((e) => filter === 'all' || e.status === filter)
    .filter((e) => petFilter === null || e.petId === petFilter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="mb-4 event-list-widget d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0 fw-semibold">События</h6>
        <AddButton />
      </div>

      <StatusFilter filter={filter} setFilter={setFilter} />
      <PetFilter petFilter={petFilter} setPetFilter={setPetFilter} />

      {filtered.length === 0 ? (
        <div className="text-center text-muted py-4 small">Нет событий</div>
      ) : (
        <div onClick={() => navigate('/event')} className="d-flex flex-column gap-2">
          {filtered.map((event, i) => (
            <PetEventComponent
              key={event.id + '-' + i}
              event={event}
              isLast={i === filtered.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
