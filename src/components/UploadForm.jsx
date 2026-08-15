import { useState } from 'react';

export default function UploadForm({ onSubmit }) {
  const [previews, setPreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [namaProduk, setNamaProduk] = useState('');
  const [bahanIsi, setBahanIsi] = useState('');
  const [hargaModal, setHargaModal] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    // allow up to 3 images
    const take = files.slice(0, 3 - imageFiles.length);
    const newFiles = [...imageFiles, ...take];
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setImageFiles(newFiles);
    setPreviews(newPreviews);
  };

  const removeImage = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFiles.length === 0 || !namaProduk) {
      alert('Foto produk dan nama produk wajib diisi ya!');
      return;
    }
    onSubmit({ imageFiles, namaProduk, bahanIsi, hargaModal });
  };

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-md">
        <span className="font-body text-sm tracking-widest uppercase text-marigoldDark">
          Langkah 1 dari 3
        </span>
        <h2 className="font-display font-bold text-3xl text-ink mt-2 mb-8">
          Ceritain produk kamu
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Upload Foto */}
          <div>
            <label className="font-body font-semibold text-ink block mb-2">
              Foto Produk (maks 3)
            </label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {previews.length > 0 ? (
                previews.map((p, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden border border-ink/10">
                    <img src={p} alt={`Preview ${i + 1}`} className="w-full h-28 object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-white/80 rounded-full px-2 py-1 text-sm">✕</button>
                  </div>
                ))
              ) : (
                <div className="col-span-3 border border-dashed border-ink/20 rounded-2xl flex items-center justify-center h-28 text-ink/40">
                  <span className="text-sm">Belum ada foto. Tambah foto produk (1-3)</span>
                </div>
              )}
            </div>

            <label htmlFor="fileInput" className="inline-block">
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-ink/10 cursor-pointer">
                <span>📷</span>
                <span className="font-body text-sm">Pilih/Gabungkan Foto</span>
              </div>
            </label>
          </div>

          {/* Nama Produk */}
          <div>
            <label className="font-body font-semibold text-ink block mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              value={namaProduk}
              onChange={(e) => setNamaProduk(e.target.value)}
              placeholder="Contoh: Kue Bolu Pandan"
              className="w-full font-body px-4 py-3 rounded-xl border border-ink/20 focus:border-marigold focus:outline-none"
            />
          </div>

          {/* Bahan/Isi Singkat */}
          <div>
            <label className="font-body font-semibold text-ink block mb-2">
              Bahan atau Ciri Khas (opsional)
            </label>
            <textarea
              value={bahanIsi}
              onChange={(e) => setBahanIsi(e.target.value)}
              placeholder="Contoh: Pandan asli, tanpa pengawet, isi 1 loyang"
              rows={3}
              className="w-full font-body px-4 py-3 rounded-xl border border-ink/20 focus:border-marigold focus:outline-none resize-none"
            />
          </div>

          {/* Harga Modal */}
          <div>
            <label className="font-body font-semibold text-ink block mb-2">
              Harga Modal per Item (opsional)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 font-body">Rp</span>
              <input
                type="number"
                value={hargaModal}
                onChange={(e) => setHargaModal(e.target.value)}
                placeholder="15000"
                className="w-full font-body pl-11 pr-4 py-3 rounded-xl border border-ink/20 focus:border-marigold focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-ink text-paper font-body font-semibold px-8 py-4 rounded-full hover:bg-ink/90 transition mt-4"
          >
            Buatkan Deskripsi & Harga →
          </button>
        </form>
      </div>
    </div>
  );
}