import './style.css';

interface ButtonProps {
  label?: string;
  color?: 'success' | 'danger' | 'warning' | 'secondary' | 'primary';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({ label, color = 'primary', disabled = false, onClick }: ButtonProps) => {
  return (
    <button disabled={disabled} onClick={onClick} className={`button ${color}`}>
      {label ?? ''}
    </button>
  );
};
