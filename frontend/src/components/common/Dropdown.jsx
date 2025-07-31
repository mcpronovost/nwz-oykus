import { useState, useRef, useEffect } from "react";

export default function Dropdown({ toggle, menu }) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (onClick) => {
    if (onClick) {
      setIsOpen(false);
      onClick();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="oyk-dropdown" ref={dropdownRef}>
      <div className="oyk-dropdown-toggle" onClick={() => handleToggle()}>
        {toggle}
      </div>
      {isOpen && (
        <div className="oyk-dropdown-menu">
          {menu.map((item, index) => (
            <button key={index} className="oyk-dropdown-item" onClick={() => handleMenuClick(item.onClick)}>
              {item.icon && <span className="icon">{item.icon}</span>}
              <span className="label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 