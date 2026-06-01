import { mockPets } from '../../lib/data';
import { PetFilterButton } from './pet-filter-button';
import './pet-filter.css';

interface PetFilterProps {
  petFilter: number | null;
  setPetFilter: (v: number | null) => void;
}

export const PetFilter = ({ petFilter, setPetFilter }: PetFilterProps) => {
  return (
    <div className="d-flex gap-2 overflow-auto pb-1 mb-2 pb-2">
      <button
        className={`btn rounded-pill px-3 py-0 btn-sm ${petFilter === null ? 'btn-primary' : 'btn-outline-secondary'}`}
        onClick={() => setPetFilter(null)}
        style={{ whiteSpace: 'nowrap' }}
      >
        Все
      </button>

      {mockPets.map((pet, i) => (
        <PetFilterButton
          key={pet.id + '-' + i}
          pet={pet}
          petFilter={petFilter}
          setPetFilter={setPetFilter}
        />
      ))}
    </div>
  );
};
