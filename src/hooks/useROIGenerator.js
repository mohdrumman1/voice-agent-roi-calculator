import { useReducer } from 'react';
import { generateROIReport } from '../services/api';

const initialState = { report: null, loading: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { report: null, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { report: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { report: null, loading: false, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function useROIGenerator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function generate(formData) {
    dispatch({ type: 'FETCH_START' });
    try {
      const report = await generateROIReport(formData);
      dispatch({ type: 'FETCH_SUCCESS', payload: report });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message || 'Something went wrong.' });
    }
  }

  function reset() {
    dispatch({ type: 'RESET' });
  }

  return { ...state, generate, reset };
}
