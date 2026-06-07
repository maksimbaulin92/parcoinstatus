import { useNavigate } from 'react-router-dom';
import type { Pet } from '../../lib/types';
import { petTypeIcon } from '../../lib/data';
import { calcAge } from '../../lib/helpers';
import './style.css';

interface PetWidgetProps {
  pet: Pet;
}

export const PetWidget = ({ pet }: PetWidgetProps) => {
  const navigate = useNavigate();

  return (
    <div className="pet-widget" onClick={() => navigate('/pet')}>
      <img src={pet.avatarUrl} alt={pet.name} className="pet-widget__avatar" />
      <div className="pet-widget__name">{pet.name}</div>
      <div className="pet-widget__breed">
        {petTypeIcon[pet.type]} {pet.breed}
      </div>
      <div className="pet-widget__age">{calcAge(pet.birthDate)}</div>
      <div className="pet-widget__weight">{pet.weight} кг</div>
    </div>
  );
};
