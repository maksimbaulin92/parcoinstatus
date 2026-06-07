import { mockEvents, mockPets, mockUser } from '../lib/data';
import { UserWidget } from '../widgets/user/user-widget';
import { EventsList } from '../widgets/eventslist/event-list-widget';
import { PetsList } from '../widgets/petlist/pet-list-widget';
import './main-dashboard.css';

export const MainDashboard = () => {
  return (
    <div className="container" style={{ maxWidth: 430 }}>
      {/* <div className="app-header">
        <div className="app-header__logo">
          <span className="app-header__logo-icon">🐾</span>
          <span className="app-header__logo-text">
            Мой<span>Питомец</span>
          </span>
        </div>
        <MenuButton />
      </div> */}

      <div className="d-flex flex-column mt-3">
        <UserWidget user={mockUser} />
        <PetsList pets={mockPets} />
        <EventsList events={mockEvents} />
      </div>
    </div>
  );
};

interface MenuButtonProps {
  onClick?: () => void;
}

export const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <button className="menu-button" onClick={onClick} aria-label="Меню">
      <span className="menu-button__line" />
      <span className="menu-button__line" />
      <span className="menu-button__line" />
    </button>
  );
};
