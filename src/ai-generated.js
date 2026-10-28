function sumNumbers(first, second) {
  if (![first, second].every(Number.isFinite)) throw new TypeError('Expected finite numbers');
  return first + second;
}

function doubleNumber(value) {
  if (!Number.isFinite(value)) throw new TypeError('Expected a finite number');
  return value * 2;
}

async function fetchData({ apiUrl = process.env.API_URL, apiKey = process.env.API_KEY } = {}) {
  if (!apiUrl) throw new Error('API_URL is required');
  const url = new URL(apiUrl);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('API_URL must use HTTP(S)');
  const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {};
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

module.exports = { sumNumbers, doubleNumber, fetchData };
