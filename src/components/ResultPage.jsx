import { useState, useEffect } from 'react';
import { generateProductContent } from '../lib/aiClient';

export default function ResultPage({ productData, onNext, onBack }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!productData) return;

    generateProductContent(productData)
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [productData]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-marigold border-t-transparent rounded-full mb-4"></div>
        <p className="font-body text-ink/60">AI lagi nulis deskripsi produk kamu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-body text-red-600 mb-4">Gagal generate: {error}</p>
        <button onClick={onBack} className="font-body underline text-ink">
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-md">
        <span className="font-body text-sm tracking-widest uppercase text-marigoldDark">
          Langkah 2 dari 3
        </span>
        <h2 className="font-display font-bold text-3xl text-ink mt-2 mb-8">
          Ini hasil buat kamu
        </h2>

        <div className="bg-white rounded-2xl border border-ink/10 p-6 space-y-5">
          <div>
            <p className="font-body text-xs uppercase tracking-wide text-ink/40 mb-1">Deskripsi Produk</p>
            <p className="font-body text-ink">{result.deskripsi}</p>
          </div>

          <div className="h-px bg-ink/10" />

          <div>
            <p className="font-body text-xs uppercase tracking-wide text-ink/40 mb-1">Saran Harga Jual</p>
            <p className="font-display font-bold text-2xl text-leaf">
              Rp{Number(result.hargaJual).toLocaleString('id-ID')}
            </p>
            <p className="font-body text-sm text-ink/60 mt-1">{result.alasanHarga}</p>
          </div>

          <div className="h-px bg-ink/10" />

          <div>
            <p className="font-body text-xs uppercase tracking-wide text-ink/40 mb-1">Tagline Toko</p>
            <p className="font-body text-ink italic">"{result.tagline}"</p>
          </div>
        </div>

        <button
          onClick={() => onNext(result)}
          className="w-full bg-ink text-paper font-body font-semibold px-8 py-4 rounded-full hover:bg-ink/90 transition mt-6"
        >
          Lanjut ke Panduan Setup Toko →
        </button>
      </div>
    </div>
  );
}