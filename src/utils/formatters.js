export function formatCurrency(value, region = 'Australia') {
  const localeMap = {
    Australia: { locale: 'en-AU', currency: 'AUD' },
    'United States': { locale: 'en-US', currency: 'USD' },
    'United Kingdom': { locale: 'en-GB', currency: 'GBP' },
    Canada: { locale: 'en-CA', currency: 'CAD' },
    'New Zealand': { locale: 'en-NZ', currency: 'NZD' },
    Singapore: { locale: 'en-SG', currency: 'SGD' },
  };
  const { locale, currency } = localeMap[region] || localeMap['Australia'];
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value) {
  return `${Math.round(value)}%`;
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-AU').format(Math.round(value));
}

export function formatMonths(value) {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded} month${rounded === 1 ? '' : 's'}`;
}

export function formatMultiplier(value) {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded}×`;
}
