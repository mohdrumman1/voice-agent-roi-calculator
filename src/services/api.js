const SYSTEM_PROMPT = `You are a senior business analyst specialising in AI voice agent deployments.
Given the prospect's business details, return a single JSON object — no markdown, no explanation — with this exact shape:

{
  "annualSavings": <number>,
  "roiPercent": <number>,
  "paybackMonths": <number>,
  "callsAutomated": <number>,
  "costPerCallReduction": <number>,
  "efficiencyGain": <number>,
  "executiveSummary": "<2–3 sentence business case>",
  "costBreakdown": "<paragraph explaining cost structure>",
  "implementationTimeline": "<paragraph on rollout phases>",
  "competitiveAdvantage": "<paragraph on strategic benefits>",
  "riskFlags": [
    { "level": "low|medium|high", "description": "<concise risk note>" }
  ],
  "assumptions": "<brief list of key assumptions used in calculations>"
}

Base calculations on realistic industry benchmarks. annualSavings in the prospect's local currency.`;

function buildUserMessage(formData) {
  const painList = formData.painPoints?.length
    ? formData.painPoints.join(', ')
    : 'Not specified';
  return `Industry: ${formData.industry}
Region: ${formData.region}
Monthly call volume: ${formData.callVolume}
Contact centre team size: ${formData.teamSize}
Average handle time: ${formData.handleTime}
Primary pain points: ${painList}`;
}

export async function generateROIReport(formData) {
  const response = await fetch('/api/generate-roi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-001',
      max_tokens: 1500,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserMessage(formData) },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  const raw = data?.choices?.[0]?.message?.content ?? '';
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON found in model response');

  return JSON.parse(match[0]);
}
