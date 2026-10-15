export interface BlockGuide {
  block: string;
  warna: string;
  fungsi: string;
  alasan: string;
}

export interface TutorialSection {
  /** Judul section. 1 section = 1 lembar halaman print. */
  title: string;
  /** Tujuan singkat section ini. */
  goal: string;
  /** Langkah-langkah bernomor dalam Bahasa Indonesia. */
  steps?: string[];
  /** Penjelasan blok + alasan + kebutuhan. Tampil menggantikan langkah bila ada. */
  guide?: BlockGuide[];
  /** Judul/keterangan untuk gambar blok. */
  codeTitle: string;
  /** Kode sintaks scratchblocks (blok berbahasa Inggris). */
  code: string;
  /** Tips singkat. */
  tip: string;
}

export interface SpriteCast {
  name: string;
  image: string;
}

export interface Tutorial {
  id: string;
  title: string;
  desc: string;
  level: string;
  minutes: number;
  goals: string[];
  sections: TutorialSection[];
  layout?: "two-col";
  cast?: SpriteCast[];
  backdrop?: SpriteCast;
}

export const tutorials: Tutorial[] = [
  {
    id: "menyapa-hewan-manis",
    title: "Menyapa Hewan-Hewan Manis",
    desc: "Proyek keliling panggung: memakai koordinat X dan Y untuk go to dan glide, serta mengatur ukuran sprite dengan set size dan change size.",
    level: "Pemula",
    minutes: 40,
    cast: [
      { name: "Kucing", image: "sprites/kucing.svg" },
      { name: "Anjing", image: "sprites/anjing.svg" },
      { name: "Kelinci", image: "sprites/kelinci.svg" },
      { name: "Burung", image: "sprites/burung.svg" },
    ],
    backdrop: { name: "Hutan (Forest)", image: "backdrops/forest.png" },
    goals: [
      "Membaca koordinat X dan Y di panggung",
      "Berpindah dengan go to dan meluncur dengan glide",
      "Mengatur ukuran sprite dengan set size dan change size",
    ],
    sections: [
      {
        title: "Membaca Koordinat X dan Y",
        goal: "Memahami posisi sprite lewat angka X (kiri-kanan) dan Y (atas-bawah).",
        guide: [
          {
            block: "when flag clicked",
            warna: "#FFBF00",
            fungsi: "Menjadi tombol mulai seluruh proyek agar semua skrip berjalan bersamaan.",
            alasan: "Tanpa pemicu yang sama, tiap skrip jalan sendiri-sendiri dan urutan sapaan jadi berantakan.",
          },
          {
            block: "switch backdrop to [Forest v]",
            warna: "#9966FF",
            fungsi: "Mengganti latar panggung menjadi hutan tempat tinggal para hewan.",
            alasan: "Suasana hutan membuat cerita menyapa hewan-hewan terasa masuk akal — kucing berkeliling di habitat mereka, bukan di panggung kosong.",
          },
          {
            block: "go to x: (0) y: (0)",
            warna: "#4C97FF",
            fungsi: "Menempatkan kucing tepat di tengah panggung sebagai titik awal keliling.",
            alasan: "Posisi awal harus pasti — kalau kucing tertinggal di posisi terakhir, sapaan pertama akan meleset.",
          },
          {
            block: "say [Aku di tengah panggung!] for (2) seconds",
            warna: "#9966FF",
            fungsi: "Menampilkan sapaan pembuka sekaligus penanda bahwa proyek sudah dimulai.",
            alasan: "Proyek ini tentang menyapa; tanpa balon bicara, penonton tidak tahu kucing sedang apa.",
          },
        ],
        codeTitle: "Susun blok seperti ini:",
        code: `when flag clicked
switch backdrop to [Forest v]
go to x: (0) y: (0)
say [Aku di tengah panggung!] for (2) seconds`,
        tip: "Titik (0, 0) adalah tengah panggung. Tambah x ke kanan, tambah y ke atas.",
      },
      {
        title: "Berpindah dengan Go To dan Glide",
        goal: "Mengunjungi tiga hewan dengan teleport go to dan luncuran glide.",
        guide: [
          {
            block: "go to x: (-150) y: (-50)",
            warna: "#4C97FF",
            fungsi: "Teleport instan ke dekat Anjing sebagai titik awal, tanpa animasi bergerak.",
            alasan: "Awal keliling harus langsung di posisi — kalau memakai glide dari tengah, ada gerakan tambahan yang tidak perlu.",
          },
          {
            block: "glide (1) secs to x: (0) y: (100)",
            warna: "#4C97FF",
            fungsi: "Meluncurkan kucing dengan halus dari satu hewan ke hewan berikutnya.",
            alasan: "Luncuran terlihat seperti kucing berjalan keliling; kalau semuanya go to, kucing hanya berkedip pindah-pindah.",
          },
          {
            block: "say [Halo ...!] for (2) seconds",
            warna: "#9966FF",
            fungsi: "Menyapa tiap hewan tepat saat kucing tiba di depannya.",
            alasan: "Sapaan adalah inti proyek — tiap titik singgah wajib ada sapaannya agar terasa seperti berkunjung.",
          },
        ],
        codeTitle: "Susun blok seperti ini (di sprite Kucing):",
        code: `when flag clicked
go to x: (-150) y: (-50)
say [Halo Anjing!] for (2) seconds
glide (1) secs to x: (0) y: (100)
say [Halo Kelinci!] for (2) seconds
glide (1) secs to x: (150) y: (-50)
say [Halo Burung!] for (2) seconds`,
        tip: "Go to = teleport langsung tanpa gerakan. Glide = meluncur halus selama sekian detik.",
      },
      {
        title: "Mengatur Ukuran dengan Set dan Change Size",
        goal: "Membuat hewan berukuran beda-beda dan animasi membesar saat disapa.",
        guide: [
          {
            block: "set size to (50) %",
            warna: "#9966FF",
            fungsi: "Menentukan ukuran pasti kelinci di awal, yaitu setengah ukuran normal.",
            alasan: "Tiap hewan butuh ukuran awal berbeda (anjing besar, kelinci kecil) agar panggung terlihat hidup.",
          },
          {
            block: "repeat (5)",
            warna: "#FFAB19",
            fungsi: "Mengulang pembesaran sedikit demi sedikit sebanyak 5 kali.",
            alasan: "Perubahan bertahap terlihat seperti animasi tumbuh; sekali perintah besar langsung terlihat kaku.",
          },
          {
            block: "change size by (10)",
            warna: "#9966FF",
            fungsi: "Menambah ukuran 10 % setiap pengulangan.",
            alasan: "Kenaikan kecil menjaga animasi tetap halus — dari 50 % menjadi 100 % pas dalam 5 langkah.",
          },
          {
            block: "wait (0.3) seconds",
            warna: "#FFAB19",
            fungsi: "Memberi jeda antar pembesaran agar animasi bisa dilihat mata.",
            alasan: "Tanpa jeda, komputer menjalankan semuanya seketika dan animasi tumbuhnya tidak akan terlihat.",
          },
        ],
        codeTitle: "Susun blok seperti ini (di sprite Kelinci):",
        code: `when flag clicked
set size to (50) %
say [Aku masih kecil!] for (2) seconds
repeat (5)
change size by (10)
wait (0.3) seconds
end
say [Sekarang aku besar!] for (2) seconds`,
        tip: "Set size = tentukan ukuran pasti (100 % ukuran normal). Change size by = tambah atau kurangi sedikit demi sedikit.",
      },
    ],
  },
];

export function getTutorial(id: string): Tutorial | undefined {
  return tutorials.find((t) => t.id === id);
}

export function getAdjacent(id: string): {
  prev: Tutorial | undefined;
  next: Tutorial | undefined;
} {
  const index = tutorials.findIndex((t) => t.id === id);
  return {
    prev: index > 0 ? tutorials[index - 1] : undefined,
    next:
      index >= 0 && index < tutorials.length - 1
        ? tutorials[index + 1]
        : undefined,
  };
}
