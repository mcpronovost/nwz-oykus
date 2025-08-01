import OykAlert from "./Alert";

export default function OykFormMessage({ hasError }) {
  return (
    <div className="oyk-form-message">
      {hasError && (
        <OykAlert title="Error" message={hasError.message} variant="danger" />
      )}
    </div>
  );
}
