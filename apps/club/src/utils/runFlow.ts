export async function runFlow(flowName: string, payload: any) {
  const res = await fetch(`/services/flows/${flowName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt);
  }
  const json = await res.json();
  return json.data;
}
