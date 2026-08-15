import express from 'express';
import cors from 'cors';

const app = express();

// allow cross-origin requests during local development
app.use(cors());
const port = process.env.PORT || 5174;

app.use(express.json({ limit: '20mb' }));

const MODEL = 'gemini-2.0-flash';

app.post('/api/generateContent', async (req, res) => {
  try {
    // Mock mode: return canned response without calling external API
    if (process.env.MOCK_AI === '1') {
      console.log('Proxy: MOCK_AI enabled — returning canned response');
      return res.json({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: JSON.stringify({
                    deskripsi: 'Kue bolu pandan lembut, wangi pandan asli, cocok untuk oleh-oleh dan acara keluarga.',
                    hargaJual: 25000,
                    alasanHarga: 'Bahan asli pandan dan proses handmade, margin terjaga.',
                    tagline: 'Bolu Pandan Rumahan'
                  })
                }
              ]
            }
          }
        ]
      });
    }

    const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!API_KEY) {
      console.error('GEMINI_API_KEY not set in environment');
      return res.status(500).json({ error: 'GEMINI_API_KEY not set on server. Set environment variable GEMINI_API_KEY or VITE_GEMINI_API_KEY for local dev.' });
    }

    const forwardBody = req.body;
    console.log('Proxy: forwarding request to Google with model', MODEL);

    const googleRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(forwardBody),
      }
    );

    const text = await googleRes.text();
    console.log('Proxy: Google response status', googleRes.status);
    if (!googleRes.ok) {
      console.error('Proxy: Google error body', text);
      // try to forward error JSON if possible
      try {
        const parsed = JSON.parse(text);
        return res.status(googleRes.status).json(parsed);
      } catch (e) {
        return res.status(googleRes.status).send(text);
      }
    }

    // success: try to parse JSON and forward as JSON, otherwise send raw text
    try {
      const parsed = JSON.parse(text);
      return res.status(googleRes.status).json(parsed);
    } catch (e) {
      return res.status(googleRes.status).send(text);
    }
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`AI proxy listening at http://localhost:${port}`);
});
