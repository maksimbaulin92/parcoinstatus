import { mockPets } from '../../../lib/data';
import type { Pet } from '../../../lib/types';
import './style.css';

interface PetFilterProps {
  petFilter: number | null;
  setPetFilter: (v: number | null) => void;
}

export const PetFilterList = ({ petFilter, setPetFilter }: PetFilterProps) => {
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
          isActive={petFilter === pet.id}
          setPetFilter={setPetFilter}
        />
      ))}
    </div>
  );
};

interface PetFilterButtonProps {
  pet: Pet;
  isActive: boolean;
  setPetFilter: (v: number | null) => void;
}

export const PetFilterButton = ({ pet, isActive, setPetFilter }: PetFilterButtonProps) => {
  return (
    <button
      className={`pet-filter-btn ${isActive ? 'pet-filter-btn--active' : ''}`}
      onClick={() => setPetFilter(isActive ? null : pet.id)}
    >
      <img src={pet.avatarUrl} alt={pet.name} className="pet-filter-btn__avatar" />
      {pet.name}
    </button>
  );
};
