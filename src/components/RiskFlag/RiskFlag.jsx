import './RiskFlag.css';

export default function RiskFlag({ level, description }) {
  return (
    <div className={`risk-flag risk-flag--${level}`}>
      <span className="risk-flag__badge">{level}</span>
      <span className="risk-flag__description">{description}</span>
    </div>
  );
}
