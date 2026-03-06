export default function FieldError({ message }) {
  if (!message) return null;
  return <div className="fieldError">{message}</div>;
}