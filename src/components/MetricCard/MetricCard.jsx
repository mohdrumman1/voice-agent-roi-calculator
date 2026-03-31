import './MetricCard.css';

export default function MetricCard({ label, value, subtext, highlight = false }) {
  return (
    <div className={`metric-card${highlight ? ' metric-card--highlight' : ''}`}>
      <span className="metric-card__label">{label}</span>
      <span className="metric-card__value">{value}</span>
      {subtext && <span className="metric-card__subtext">{subtext}</span>}
    </div>
  );
}
