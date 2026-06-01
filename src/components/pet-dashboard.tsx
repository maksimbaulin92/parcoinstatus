import { useNavigate } from 'react-router-dom';

export const PetDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <span>Pet Dashboard</span>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>
        Back
      </button>
    </div>
  );
};
