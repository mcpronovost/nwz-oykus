import { useRouter } from "@/services/router";

export default function OykButton({
  children,
  routeName,
  params = {},
  action,
  disabled = false,
  color = "default",
  outline = false,
}) {
  const { n, lang } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled && routeName) {
      n(routeName, lang, params);
    } else if (!disabled && action) {
      action();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`oyk-button ${color ? `oyk-button-${color}` : ""} ${
        outline ? "oyk-button-outline" : ""
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
        {children}
      </span>
    </button>
  );
}
