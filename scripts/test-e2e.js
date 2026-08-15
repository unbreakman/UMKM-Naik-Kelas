async function run() {
  const url = 'http://localhost:5174/api/generateContent';
  const body = {
    contents: [
      {
        parts: [
          { text: 'Test prompt: generate minimal JSON response' }
        ]
      }
    ]
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Body:', text);
  } catch (e) {
    console.error('Request failed:', e.message);
  }
}

run();
