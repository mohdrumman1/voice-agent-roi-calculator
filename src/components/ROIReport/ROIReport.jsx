import MetricCard from '../MetricCard/MetricCard';
import RiskFlag from '../RiskFlag/RiskFlag';
import PrintSummary from '../PrintSummary/PrintSummary';
import {
  formatCurrency,
  formatPercent,
  formatNumber,
  formatMonths,
  formatMultiplier,
} from '../../utils/formatters';
import './ROIReport.css';

export default function ROIReport({ report, formData, onReset }) {
  const region = formData?.region;

  return (
    <div className="roi-report">
      <PrintSummary report={report} formData={formData} />

      <div className="roi-report__header">
        <h2 className="roi-report__title">Your ROI Report</h2>
        <p className="roi-report__subtitle">
          Based on your {formData?.industry} contact centre in {formData?.region}
        </p>
      </div>

      <div className="roi-report__metrics">
        <MetricCard
          label="Annual Savings"
          value={formatCurrency(report.annualSavings, region)}
          subtext="projected cost reduction"
          highlight
        />
        <MetricCard
          label="Return on Investment"
          value={formatPercent(report.roiPercent)}
          subtext="first-year ROI"
          highlight
        />
        <MetricCard
          label="Payback Period"
          value={formatMonths(report.paybackMonths)}
          subtext="to break even"
        />
        <MetricCard
          label="Calls Automated"
          value={formatNumber(report.callsAutomated) + '/mo'}
          subtext="estimated monthly volume"
        />
        <MetricCard
          label="Cost Per Call Reduction"
          value={formatPercent(report.costPerCallReduction)}
          subtext="vs current baseline"
        />
        <MetricCard
          label="Efficiency Gain"
          value={formatMultiplier(report.efficiencyGain)}
          subtext="throughput improvement"
        />
      </div>

      <div className="roi-report__narratives">
        <div className="narrative-card">
          <h3>Executive Summary</h3>
          <p>{report.executiveSummary}</p>
        </div>
        <div className="narrative-card">
          <h3>Cost Breakdown</h3>
          <p>{report.costBreakdown}</p>
        </div>
        <div className="narrative-card">
          <h3>Implementation Timeline</h3>
          <p>{report.implementationTimeline}</p>
        </div>
        <div className="narrative-card">
          <h3>Competitive Advantage</h3>
          <p>{report.competitiveAdvantage}</p>
        </div>
      </div>

      {report.riskFlags?.length > 0 && (
        <div className="roi-report__risks">
          <h3 className="roi-report__section-title">Risk Considerations</h3>
          <div className="risk-list">
            {report.riskFlags.map((flag, i) => (
              <RiskFlag key={i} level={flag.level} description={flag.description} />
            ))}
          </div>
        </div>
      )}

      {report.assumptions && (
        <p className="roi-report__assumptions">
          <strong>Assumptions:</strong> {report.assumptions}
        </p>
      )}

      <div className="roi-report__actions">
        <button className="roi-report__print-btn" onClick={() => window.print()}>
          Print / Save PDF
        </button>
        <button className="roi-report__reset-btn" onClick={onReset}>
          Start Over
        </button>
        <a
          className="roi-report__demo-btn"
          href="https://formaai.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a Demo
        </a>
      </div>
    </div>
  );
}
