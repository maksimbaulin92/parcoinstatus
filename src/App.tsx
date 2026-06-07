import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MainDashboard } from './components/main-dashboard';
import { UserCard } from './pages/user-page/user-page';
import { NotificationCard } from './pages/notification-page/notification-page';
import { PetCard } from './pages/pet-page/pet-page';
import { EventCard } from './pages/event-page/event-page';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/user" element={<UserCard />} />
      <Route path="/notification" element={<NotificationCard />} />
      <Route path="/pet" element={<PetCard />} />
      <Route path="/event" element={<EventCard />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
};

export default App;
