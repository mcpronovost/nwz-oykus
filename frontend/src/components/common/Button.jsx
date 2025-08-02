import { useRouter } from "@/services/router";

export default function OykButton({
  children,
  routeName,
  params = {},
  action,
  icon: IconComponent,
  type = "button",
  disabled = false,
  color = "default",
  plain = false,
  outline = false,
  block = false,
}) {
  const { n, lang } = useRouter();

  const handleClick = (e) => {
    if (type !== "submit") {
      e.preventDefault();
    }
    if (!disabled && routeName) {
      n(routeName, lang, params);
    } else if (!disabled && action) {
      action();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`oyk-button ${color ? `oyk-button-${color}` : ""} ${
        plain ? "oyk-button-plain" : ""
      } ${
        outline ? "oyk-button-outline" : ""
      } ${block ? "oyk-button-block" : ""} ${
        IconComponent && !children ? "oyk-button-icon" : ""
      }`}
      style={
        color?.startsWith("#")
          ? {
              backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
              borderColor: color,
            }
          : {}
      }
    >
      <span
        className="oyk-button-content"
        style={color?.startsWith("#") ? { color: color } : {}}
      >
        {IconComponent && <IconComponent size={16} />}
        {children && children}
      </span>
    </button>
  );
}
