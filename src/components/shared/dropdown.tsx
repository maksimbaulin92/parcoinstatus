import { useState, type ReactNode } from 'react';
import { DropDownButton } from './dropdown-button';

interface SettingsDropdownProps {
  children: ReactNode;
  label?: string;
}

export const SettingsDropdown = ({ children, label = 'Настройки' }: SettingsDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1040,
          }}
        />
      )}

      {/* Component */}
      <div className="position-relative" style={{ display: 'inline-block' }}>
        <DropDownButton label={label} onClick={() => setOpen((prev) => !prev)} />

        {open && (
          <div
            className="position-absolute end-0 mt-1 bg-white border rounded shadow"
            style={{ zIndex: 1050, minWidth: 180 }}
            onClick={() => setOpen(false)}
          >
            <div className="d-flex flex-column gap-3 p-3">{children}</div>
          </div>
        )}
      </div>
    </>
  );
};
