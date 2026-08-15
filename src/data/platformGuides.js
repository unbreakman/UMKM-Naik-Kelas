const platformGuides = {
  Shopee: {
    title: 'Panduan Setup Toko — Shopee (langkah sederhana)',
    steps: [
      'Buat akun Shopee dengan nomor yang aktif dan email (kalau belum punya, bantu buatkan).',
      'Lengkapi profil toko: nama toko, foto profil (logo), dan deskripsi singkat yang menjual.',
      'Upload produk: pilih kategori yang paling mendekati, tambahkan foto (pakai hasil AI), nama produk, dan deskripsi.',
      'Atur harga dan stok: masukkan harga jual (pakai saran AI), serta jumlah stok per varian.',
      'Pilih metode pengiriman dan biaya: aktifkan fitur COD bila perlu, tambahkan berat produk.',
      'Aktifkan pembayaran: hubungkan ke rekening atau QRIS jika tersedia, cek opsi ShopeePay.',
      'Terbitkan produk dan coba lakukan order percobaan untuk cek alur.'
    ],
    checklist: [
      'Akun Shopee dibuat',
      'Foto & deskripsi produk diupload',
      'Harga & stok diset',
      'Metode pengiriman diset',
      'Pembayaran terhubung'
    ]
  },
  Tokopedia: {
    title: 'Panduan Setup Toko — Tokopedia (ringkas)',
    steps: [
      'Daftar akun Tokopedia dan verifikasi email/HP.',
      'Lengkapi profil toko dan kategori usaha.',
      'Upload produk: foto, nama, deskripsi singkat, dan pilih varian jika ada.',
      'Atur harga, pengiriman, dan metode pembayaran (rekening/QRIS).'
    ],
    checklist: ['Akun dibuat', 'Produk diupload', 'Pengiriman & pembayaran diset']
  },
  QRIS: {
    title: 'Panduan Pasang QRIS (ringkas)',
    steps: [
      'Daftar penyedia layanan QRIS (bank atau agregator).',
      'Siapkan dokumen: KTP pemilik, foto usaha, nomor rekening.',
      'Ajukan pendaftaran QRIS, tunggu verifikasi.',
      'Terima kode QR dan cetak/stel di kasir/etalase.'
    ],
    checklist: ['Daftar penyedia', 'Dokumen siap', 'QRIS aktif']
  }
};

export default platformGuides;
