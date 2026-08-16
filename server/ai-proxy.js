import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
const port = process.env.PORT || 5174;

app.use(express.json({ limit: '20mb' }));

const MODEL = 'gemini-3.6-flash';
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('⚠️  GEMINI_API_KEY tidak ditemukan di .env — cek file .env di root project');
}

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
                    deskripsi: 'Kue bolu pandan lembut, wangi pandan asli, cocok untuk oleh-oleh acara keluarga.',
                    hargaJual: 25000,
                    alasanHarga: 'Bahan asli pandan dan proses handmade, margin terjaga.',
                    tagline: 'Bolu Pandan Rumahan',
                  }),
                },
              ],
            },
          },
        ],
      });
    }

    if (!API_KEY) {
      return res.status(500).json({ error: 'Server belum dikonfigurasi: GEMINI_API_KEY kosong' });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error('Gemini API error:', data);
      return res.status(geminiResponse.status).json({ error: data.error?.message || 'Gemini API error' });
    }

    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Terjadi kesalahan di server proxy' });
  }
});

app.listen(port, () => {
  console.log(`✅ AI proxy server jalan di http://localhost:${port}`);
});