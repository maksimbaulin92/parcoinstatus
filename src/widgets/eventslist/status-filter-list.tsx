import type { StatusType } from './event-list-widget';
import './status-filter-list.css';

interface StatusFilterProps {
  filter: StatusType;
  setFilter: (s: StatusType) => void;
}

const labels: Record<StatusType, string> = {
  all: 'Все',
  planned: 'Запланированные',
  done: 'Выполненные',
};

export const StatusFilter = ({ filter, setFilter }: StatusFilterProps) => {
  return (
    <div className="status-filter">
      {(['all', 'planned', 'done'] as const).map((f) => (
        <button
          key={f}
          className={`status-filter__btn ${filter === f ? 'status-filter__btn--active' : ''}`}
          onClick={() => setFilter(f)}
        >
          {labels[f]}
        </button>
      ))}
    </div>
  );
};
