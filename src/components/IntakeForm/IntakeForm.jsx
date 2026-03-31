import { useState } from 'react';
import {
  INDUSTRIES,
  CALL_VOLUMES,
  TEAM_SIZES,
  HANDLE_TIMES,
  REGIONS,
  PAIN_POINTS,
} from '../../constants/formOptions';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './IntakeForm.css';

function FormField({ label, error, children }) {
  return (
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      {children}
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}

const INITIAL = {
  industry: '',
  callVolume: '',
  teamSize: '',
  handleTime: '',
  region: '',
  painPoints: [],
};

export default function IntakeForm({ onSubmit, loading }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});

  function set(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function togglePainPoint(point) {
    setValues((v) => {
      const current = v.painPoints;
      if (current.includes(point)) {
        return { ...v, painPoints: current.filter((p) => p !== point) };
      }
      if (current.length >= 3) return v;
      return { ...v, painPoints: [...current, point] };
    });
  }

  function validate() {
    const e = {};
    if (!values.industry) e.industry = 'Please select an industry';
    if (!values.callVolume) e.callVolume = 'Please select monthly call volume';
    if (!values.teamSize) e.teamSize = 'Please select team size';
    if (!values.handleTime) e.handleTime = 'Please select average handle time';
    if (!values.region) e.region = 'Please select your region';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    onSubmit(values);
  }

  if (loading) return <LoadingSpinner />;

  return (
    <form className="intake-form" onSubmit={handleSubmit} noValidate>
      <div className="intake-form__intro">
        <h1 className="intake-form__title">Calculate Your AI Voice Agent ROI</h1>
        <p className="intake-form__subtitle">
          Enter your contact centre details to receive a personalised savings and ROI report.
        </p>
      </div>

      <div className="intake-form__grid">
        <FormField label="Industry" error={errors.industry}>
          <select value={values.industry} onChange={(e) => set('industry', e.target.value)}>
            <option value="">Select industry…</option>
            {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </FormField>

        <FormField label="Region" error={errors.region}>
          <select value={values.region} onChange={(e) => set('region', e.target.value)}>
            <option value="">Select region…</option>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </FormField>

        <FormField label="Monthly Call Volume" error={errors.callVolume}>
          <select value={values.callVolume} onChange={(e) => set('callVolume', e.target.value)}>
            <option value="">Select volume…</option>
            {CALL_VOLUMES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </FormField>

        <FormField label="Contact Centre Team Size" error={errors.teamSize}>
          <select value={values.teamSize} onChange={(e) => set('teamSize', e.target.value)}>
            <option value="">Select team size…</option>
            {TEAM_SIZES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </FormField>

        <FormField label="Average Handle Time" error={errors.handleTime}>
          <select value={values.handleTime} onChange={(e) => set('handleTime', e.target.value)}>
            <option value="">Select handle time…</option>
            {HANDLE_TIMES.map((h) => <option key={h.value} value={h.value}>{h.label}</option>)}
          </select>
        </FormField>
      </div>

      <FormField label="Primary Pain Points (select up to 3)">
        <div className="pain-points">
          {PAIN_POINTS.map((point) => {
            const checked = values.painPoints.includes(point);
            const disabled = !checked && values.painPoints.length >= 3;
            return (
              <label key={point} className={`pain-point${disabled ? ' pain-point--disabled' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => togglePainPoint(point)}
                />
                {point}
              </label>
            );
          })}
        </div>
      </FormField>

      <button type="submit" className="intake-form__submit">
        Generate My ROI Report
      </button>
    </form>
  );
}
