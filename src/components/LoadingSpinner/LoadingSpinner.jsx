import './LoadingSpinner.css';

export default function LoadingSpinner({ message = 'Calculating your ROI...' }) {
  return (
    <div className="spinner-wrap">
      <div className="spinner" aria-label="Loading" />
      <p className="spinner-message">{message}</p>
    </div>
  );
}
