// Cloudflare Pages Function — POST /api/evaluate
// Placeholder AI rating pipeline. TODO: replace with MediaPipe analysis backend.
export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  // Mock result — replace with real vision-model scoring + NTRP mapping
  const mockScores = [78, 82, 71, 87, 64];
  const mockNtrp = ['3.5', '4.0', '3.0', '4.0', '2.5'];
  const notes = {
    en: 'Solid unit turn on the forehand; keep the left shoulder closed a beat longer before contact. Serve toss consistency is your next focus area.',
    zh: '正手引拍转体扎实；击球前左肩再保持闭合多一拍。下一个提升重点：发球抛球的稳定性。'
  };
  const i = Math.floor(Math.random() * mockScores.length);
  return Response.json({
    score: mockScores[i],
    ntrp: mockNtrp[i],
    coachNote: notes.en,
    disclaimer: 'Placeholder result — real pipeline pending integration.'
  });
}
