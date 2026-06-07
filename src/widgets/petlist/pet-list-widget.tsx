import type { Pet } from '../../lib/types';
//import { Button } from '../../shared/button/button';
import { PetWidget } from './pet-list-item';
import './style.css';

export const PetsList = ({ pets }: { pets: Pet[] }) => {
  return (
    <div className="mb-3 pet-list-widget">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0 fw-semibold">Мои питомцы</h6>
        {/* <Button label="Добавить" /> */}
      </div>

      <div className="d-flex gap-2 overflow-auto pb-2">
        {pets.map((pet, i) => (
          <PetWidget key={pet.id + '-' + i} pet={pet} />
        ))}
      </div>
    </div>
  );
};
