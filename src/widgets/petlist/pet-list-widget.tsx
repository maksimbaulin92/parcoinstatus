import type { Pet } from '../../lib/types';
import { PetWidget } from './pet-widget';
import './pet-list-widget.css';
import { AddButton } from '../../components/shared/add-button';

export const PetsList = ({ pets }: { pets: Pet[] }) => {
  return (
    <div className="mb-3 pet-list-widget">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0 fw-semibold">Мои питомцы</h6>
        <AddButton />
      </div>

      <div className="d-flex gap-2 overflow-auto pb-2">
        {pets.map((pet, i) => (
          <PetWidget key={pet.id + '-' + i} pet={pet} />
        ))}
      </div>
    </div>
  );
};
