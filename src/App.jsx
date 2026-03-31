import { useState } from 'react';
import Header from './components/Header/Header';
import IntakeForm from './components/IntakeForm/IntakeForm';
import ROIReport from './components/ROIReport/ROIReport';
import { useROIGenerator } from './hooks/useROIGenerator';
import './App.css';

export default function App() {
  const { report, loading, error, generate, reset } = useROIGenerator();
  const [formData, setFormData] = useState(null);

  function handleSubmit(values) {
    setFormData(values);
    generate(values);
  }

  return (
    <>
      <Header />
      <main className="app-main">
        {!report && !loading && (
          <IntakeForm onSubmit={handleSubmit} loading={false} />
        )}
        {loading && (
          <IntakeForm onSubmit={handleSubmit} loading={true} />
        )}
        {error && !loading && (
          <div className="app-error">
            <p className="app-error__message">{error}</p>
            <button className="app-error__retry" onClick={reset}>Try Again</button>
          </div>
        )}
        {report && !error && (
          <ROIReport report={report} formData={formData} onReset={reset} />
        )}
      </main>
    </>
  );
}
