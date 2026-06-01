import type { Pet } from '../../lib/types';
import './pet-filter-button.css';

interface PetFilterButtonProps {
  pet: Pet;
  petFilter: number | null;
  setPetFilter: (v: number | null) => void;
}

export const PetFilterButton = ({ pet, petFilter, setPetFilter }: PetFilterButtonProps) => {
  const isActive = petFilter === pet.id;

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
