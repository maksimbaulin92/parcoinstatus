import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MainDashboard } from './components/main-dashboard';
import { UserCard } from './components/user-page/user-page';
import { PetCard } from './components/pet-page/pet-page';
import { EventCard } from './components/event-page/event-page';
import { NotificationCard } from './components/notification-page/notification-page';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/user" element={<UserCard />} />
      <Route path="/notification" element={<NotificationCard />} />
      <Route path="/pet" element={<PetCard />} />
      <Route path="/event" element={<EventCard />} />
      <Route path="*" element={<div>Not found</div>} />
      {/* <div></div> */}
    </Routes>
  );
};

export default App;
