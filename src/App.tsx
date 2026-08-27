import { Route, Routes } from 'react-router-dom';
import { MainDashboard } from './components/main-dashboard';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
};

export default App;
