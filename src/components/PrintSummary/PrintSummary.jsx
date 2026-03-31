import './PrintSummary.css';
import { formatCurrency, formatPercent, formatNumber, formatMonths } from '../../utils/formatters';

export default function PrintSummary({ report, formData }) {
  if (!report) return null;
  const region = formData?.region;

  return (
    <div className="print-summary">
      <div className="print-summary__header">
        <div className="print-summary__brand">Forma AI</div>
        <div className="print-summary__title">Voice Agent ROI Report</div>
        <div className="print-summary__meta">
          {formData?.industry} · {formData?.region} · {new Date().toLocaleDateString('en-AU')}
        </div>
      </div>

      <div className="print-summary__metrics">
        <div className="print-metric">
          <div className="print-metric__label">Annual Savings</div>
          <div className="print-metric__value">{formatCurrency(report.annualSavings, region)}</div>
        </div>
        <div className="print-metric">
          <div className="print-metric__label">ROI</div>
          <div className="print-metric__value">{formatPercent(report.roiPercent)}</div>
        </div>
        <div className="print-metric">
          <div className="print-metric__label">Payback Period</div>
          <div className="print-metric__value">{formatMonths(report.paybackMonths)}</div>
        </div>
        <div className="print-metric">
          <div className="print-metric__label">Calls Automated</div>
          <div className="print-metric__value">{formatNumber(report.callsAutomated)}/mo</div>
        </div>
      </div>

      <div className="print-summary__section">
        <h3>Executive Summary</h3>
        <p>{report.executiveSummary}</p>
      </div>

      <div className="print-summary__section">
        <h3>Cost Breakdown</h3>
        <p>{report.costBreakdown}</p>
      </div>

      <div className="print-summary__section">
        <h3>Implementation Timeline</h3>
        <p>{report.implementationTimeline}</p>
      </div>

      <div className="print-summary__footer">
        formaai.com.au · hello@formaai.com.au
      </div>
    </div>
  );
}
