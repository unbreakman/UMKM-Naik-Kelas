const MODEL = "gemini-2.5-flash";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function generateProductContent({ imageFiles = [], namaProduk, bahanIsi, hargaModal }) {
  // convert all files to base64 inline data
  const imageParts = [];
  for (const f of imageFiles) {
    const base64 = await fileToBase64(f);
    imageParts.push({
      inline_data: {
        mime_type: f.type,
        data: base64,
      },
    });
  }

  const prompt = `Kamu adalah asisten UMKM di Medan, Indonesia. Berdasarkan foto produk dan info berikut, bantu buatkan konten jualan.

Nama produk: ${namaProduk}
Bahan/ciri khas: ${bahanIsi || 'tidak disebutkan'}
Harga modal: ${hargaModal ? `Rp${hargaModal}` : 'tidak disebutkan'}

Balas HANYA dalam format JSON, tanpa teks lain, tanpa markdown code fence, persis seperti ini:
{
  "deskripsi": "deskripsi produk yang menarik untuk dijual online, 2-3 kalimat, bahasa santai tapi meyakinkan",
  "hargaJual": angka_saran_harga_jual_dalam_rupiah,
  "alasanHarga": "penjelasan singkat kenapa harga segitu, 1 kalimat",
  "tagline": "tagline singkat untuk nama toko, maksimal 6 kata"
}`;

  const parts = [{ text: prompt }, ...imageParts];

  const response = await fetch(`/api/generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  const rawText = data.candidates[0].content.parts[0].text;
  const cleaned = rawText.replace(/```json|```/g, "").trim();

  return JSON.parse(cleaned);
}