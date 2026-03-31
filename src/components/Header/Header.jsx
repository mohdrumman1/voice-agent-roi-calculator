import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-wordmark">Forma AI</span>
          <span className="header-tagline">Voice Agent ROI Calculator</span>
        </div>
        <a
          className="header-cta"
          href="https://formaai.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a Demo
        </a>
      </div>
    </header>
  );
}
