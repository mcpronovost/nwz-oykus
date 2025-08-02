import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const OykDropdown = forwardRef(
  (
    { toggle, menu, direction = "left", disabled = false },
    ref
  ) => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      close: () => setIsOpen(false),
      open: () => setIsOpen(true),
      toggle: () => setIsOpen(!isOpen),
      isOpen: () => isOpen,
    }));

    const handleToggle = () => {
      if (disabled) return;
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
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div ref={dropdownRef} className="oyk-dropdown">
        <div
          className={`oyk-dropdown-toggle ${disabled ? "disabled" : ""}`}
          onClick={() => handleToggle()}
        >
          {toggle}
        </div>
        {isOpen && (
          <div className={`oyk-dropdown-menu direction-${direction}`}>
            {menu.map((item, index) => (
              <div key={index} className="oyk-dropdown-item">
                {item.divider ? (
                  <div className="oyk-dropdown-item-divider" />
                ) : item.element ? (
                  item.element
                ) : (
                  <button
                    className="oyk-dropdown-item-btn"
                    onClick={() => handleMenuClick(item.onClick)}
                    disabled={item.disabled}
                    style={item.color ? { color: item.color.startsWith("#") ? item.color : `var(--oyk-c-${item.color})` } : {}}
                  >
                    {item.icon && <span className="icon">{item.icon}</span>}
                    <span className="label">{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

OykDropdown.displayName = "OykDropdown";

export default OykDropdown;
