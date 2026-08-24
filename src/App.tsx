import { Route, Routes } from 'react-router-dom';
import { MainDashboard } from './components/main-dashboard';
import './App.css';

const App = () => {
  return (
    <div style={{ maxHeight: '95dvh' }}>
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </div>
  );
};

export default App;
