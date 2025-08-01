import { Info, CircleCheck, CircleX, ShieldAlert } from "lucide-react";

export default function OykAlert({
  children,
  title,
  message,
  variant = "default",
  showIcon = true,
}) {
  return (
    <div className={`oyk-alert oyk-alert-variant-${variant}`}>
      {showIcon && (
        <div className="oyk-alert-icon">
          {variant === "danger" ? (
            <CircleX size={24} />
          ) : variant === "warning" ? (
            <ShieldAlert size={24} />
          ) : variant === "success" ? (
            <CircleCheck size={24} />
          ) : (
            <Info size={24} />
          )}
        </div>
      )}
      <div className="oyk-alert-content">
        {title && <p className="oyk-alert-content-title">{title}</p>}
        {message && <p className="oyk-alert-content-message">{message}</p>}
        {children}
      </div>
    </div>
  );
}
