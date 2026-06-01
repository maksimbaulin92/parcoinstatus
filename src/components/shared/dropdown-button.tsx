import './style.css';

interface DropDownButtonProps {
  label?: string;
  onClick?: () => void;
}

export const DropDownButton = ({ label = '', onClick = () => {} }: DropDownButtonProps) => {
  return (
    <button onClick={onClick} className="settings-button">
      {label}
    </button>
  );
};
