export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span className="font-body text-sm tracking-widest uppercase text-marigoldDark mb-4">
        Asisten UMKM Digital
      </span>

      <h1 className="font-display font-extrabold text-4xl md:text-6xl text-ink leading-tight max-w-3xl">
        Lapakin toko online kamu,
        <br />
        <span className="text-marigold">siap dalam 5 menit.</span>
      </h1>

      <p className="font-body text-ink/70 text-lg mt-6 max-w-xl">
        Cukup foto produk kamu. Kami bantu tulis deskripsi, tentuin harga,
        dan tuntun setup toko — tanpa istilah ribet.
      </p>

      <button
        onClick={onStart}
        className="mt-10 bg-ink text-paper font-body font-semibold px-8 py-4 rounded-full hover:bg-ink/90 transition"
      >
        Mulai Sekarang →
      </button>

      <p className="font-body text-xs text-ink/40 mt-6">
        Gratis · Gak perlu jago komputer
      </p>
    </div>
  );
}