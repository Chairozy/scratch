import type { ProjectFlow } from "./flow";
import { catchAppleFlow } from "./catchApple";

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
  map?: boolean;
  demo?: "move-arrow";
  codeTitle?: string;
  /** Kode sintaks scratchblocks (blok berbahasa Inggris). */
  code?: string;
  /** Tips singkat. */
  tip: string;
}

export interface SpriteCast {
  name: string;
  image: string;
  x?: number;
  y?: number;
}

export interface QuizChoice {
  id: string;
  label: string;
}

export interface QuizGroup {
  judul: string;
  pilihan: QuizChoice[];
}

export interface TutorialQuiz {
  prompt: string;
  grup: QuizGroup[];
  wajib: string[];
  terlarang: string[];
  petunjuk: string;
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
  embedUrl?: string;
  intro?: string;
  quiz?: TutorialQuiz;
  teaserCode?: string;
  castTitle?: string;
  flow?: ProjectFlow;
}

export const tutorials: Tutorial[] = [
  {
    id: "menyapa-hewan-manis",
    title: "Menyapa Hewan-Hewan Manis",
    desc: "Proyek keliling panggung: memakai koordinat X dan Y untuk go to dan glide, serta mengatur ukuran sprite dengan set size dan change size.",
    level: "Pemula",
    minutes: 40,
    cast: [
      { name: "Kucing", image: "sprites/kucing.svg", x: 0, y: 0 },
      { name: "Anjing", image: "sprites/anjing.svg", x: -150, y: -50 },
      { name: "Kelinci", image: "sprites/kelinci.svg", x: 150, y: -50 },
      { name: "Burung", image: "sprites/burung.svg", x: 0, y: 100 },
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
        map: true,
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
glide (1) secs to x: (150) y: (-50)
say [Halo Kelinci!] for (2) seconds
glide (1) secs to x: (0) y: (100)
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
        code: `when this sprite clicked
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
  {
    id: "guess-the-number",
    title: "Guess the Number",
    desc: "Proyek tebak angka: Wizard bertanya, Abby membacakan jawaban, lalu Wizard menilai dengan if-else dan operator perbandingan.",
    level: "Menengah",
    minutes: 45,
    embedUrl: "https://scratch.mit.edu/projects/1392272727/embed",
    cast: [
      { name: "Abby (pembaca jawaban)", image: "sprites/abby.svg", x: -120, y: 0 },
      { name: "Wizard (penanya)", image: "sprites/wizard.svg", x: 120, y: 0 },
    ],
    backdrop: { name: "Papan Tulis (Chalkboard)", image: "backdrops/chalkboard.png" },
    goals: [
      "Bertanya ke pemain dengan ask block",
      "Membacakan jawaban sebelum dinilai",
      "Menilai dengan if-else dan operator perbandingan",
    ],
    sections: [
      {
        title: "Bertanya dengan Ask Block",
        goal: "Wizard menanyakan tebakan angka lalu Abby membacakan jawabannya.",
        map: true,
        guide: [
          {
            block: "when flag clicked",
            warna: "#FFBF00",
            fungsi: "Memulai permainan dan menyiapkan papan tulis sebagai latar.",
            alasan: "Semua skrip butuh satu tombol mulai yang sama agar Abby dan Wizard bergerak berurutan.",
          },
          {
            block: "switch backdrop to [Chalkboard v]",
            warna: "#9966FF",
            fungsi: "Mengganti latar menjadi papan tulis layaknya kuis di kelas.",
            alasan: "Suasana kuis membuat pemain paham bahwa ia sedang ditantang menebak sesuatu.",
          },
          {
            block: "ask [Tebak angka 1 sampai 10!] and wait",
            warna: "#5CB1D6",
            fungsi: "Menampilkan kotak pertanyaan dan menunggu pemain mengetik jawabannya.",
            alasan: "Kata and wait wajib ada — tanpanya program lanjut duluan sebelum pemain sempat mengetik sehingga jawabannya kosong.",
          },
          {
            block: "broadcast [sebutkan jawaban v] and wait",
            warna: "#FFBF00",
            fungsi: "Memanggil Abby untuk membacakan jawaban, lalu menunggu sampai ia selesai bicara.",
            alasan: "Kata and wait memastikan bacaan Abby selesai dulu sebelum penilaian lanjut — tanpanya cek jawaban jalan duluan dan menimpa suara Abby.",
          },
        ],
        codeTitle: "Susun blok seperti ini (di sprite Wizard):",
        code: `when flag clicked
switch backdrop to [Chalkboard v]
ask [Tebak angka 1 sampai 10!] and wait
broadcast [sebutkan jawaban v] and wait`,
        tip: "Ketik sebuah angka saat kotak tanya muncul, lalu dengarkan Abby membacakannya sebelum Wizard menilai.",
      },
      {
        title: "Abby Membacakan Jawaban",
        goal: "Abby membacakan tebakan pemain sebelum Wizard menilai.",
        guide: [
          {
            block: "when I receive [sebutkan jawaban v]",
            warna: "#FFBF00",
            fungsi: "Membuat Abby merespons hanya setelah Wizard selesai bertanya.",
            alasan: "Abby hanya boleh bicara bila sudah ada tebakan — kalau jalan duluan, yang dibacakan adalah jawaban kosong.",
          },
          {
            block: "(answer)",
            warna: "#5CB1D6",
            fungsi: "Mengambil ketikan pemain yang tersimpan di kotak answer.",
            alasan: "Jawaban hanya diketik sekali oleh pemain, jadi Abby wajib membacanya dari kotak ini.",
          },
          {
            block: "say (answer) for (2) seconds",
            warna: "#9966FF",
            fungsi: "Membacakan tebakan dengan suara agar terdengar semua orang.",
            alasan: "Tebakan yang terbaca memastikan pemain yakin jawabannya masuk — dan and wait di Wizard menjamin bacaan ini selesai sebelum dinilai.",
          },
        ],
        codeTitle: "Susun blok seperti ini (di sprite Abby):",
        code: `when I receive [sebutkan jawaban v]
say (answer) for (2) seconds`,
        tip: "Klik bendera hijau, ketik angka, dan dengarkan Abby membacakannya.",
      },
      {
        title: "Benar atau Salah dengan If-Else",
        goal: "Sambungan skrip Wizard setelah broadcast and wait: menilai tebakan benar bila angkanya 7.",
        guide: [
          {
            block: "if <(answer) = (7)> then ... else ... end",
            warna: "#FFAB19",
            fungsi: "Bercabang dua tepat setelah Abby selesai membacakan: sapaan Tepat bila sama dengan 7, sapaan Salah bila tidak.",
            alasan: "Komputer harus memutuskan dua nasib berbeda dari satu tebakan — inilah arti True dan False pada kondisi.",
          },
          {
            block: "say [Tepat sekali! Kamu menang!] for (2) seconds",
            warna: "#9966FF",
            fungsi: "Mengumumkan hasil penilaian kepada pemain.",
            alasan: "Tanpa pengumuman, pemain tidak akan pernah tahu tebakannya benar atau salah.",
          },
        ],
        codeTitle: "Sambung di bawah broadcast and wait (skrip Wizard):",
        code: `if <(answer) = (7)> then
say [Tepat sekali! Kamu menang!] for (2) seconds
else
say [Salah, coba lagi!] for (2) seconds
end`,
        tip: "Tempel blok ini tepat di bawah broadcast and wait agar menjadi satu skrip utuh. Angka rahasianya adalah 7.",
      },
      {
        title: "Petunjuk Lebih Besar dan Lebih Kecil",
        goal: "Sambungan skrip Wizard: memberi petunjuk kebesaran atau kekecilan.",
        guide: [
          {
            block: "<(answer) > (7)>",
            warna: "#59C059",
            fungsi: "Menguji apakah tebakan lebih besar dari angka rahasia.",
            alasan: "Pemain butuh tahu arah salahnya — tanpa petunjuk ini ia hanya menebak buta berulang-ulang.",
          },
          {
            block: "<(answer) < (7)>",
            warna: "#59C059",
            fungsi: "Menguji apakah tebakan lebih kecil dari angka rahasia.",
            alasan: "Dua operator ini saling melengkapi: yang tidak besar dan tidak kecil, pasti pas.",
          },
          {
            block: "if di dalam else",
            warna: "#FFAB19",
            fungsi: "Menyusun tiga nasib berurutan: kebesaran, kekecilan, lalu tepat.",
            alasan: "Satu if hanya menampung dua nasib, jadi untuk tiga kemungkinan butuh if kedua yang bersarang di dalam else.",
          },
          {
            block: "say [Tepat sekali! Kamu menang!] for (2) seconds",
            warna: "#9966FF",
            fungsi: "Merayakan kemenangan saat tebakan tidak besar dan tidak kecil.",
            alasan: "Cabang terakhir ini hanya tercapai bila kedua kondisi sebelumnya salah — artinya tebakan pasti 7.",
          },
        ],
        codeTitle: "Ganti cek di atas dengan versi ini (skrip Wizard):",
        code: `if <(answer) > (7)> then
say [Kebesaran! Coba yang lebih kecil.] for (2) seconds
else
if <(answer) < (7)> then
say [Kekecilan! Coba yang lebih besar.] for (2) seconds
else
say [Tepat sekali! Kamu menang!] for (2) seconds
end
end`,
        tip: "Ganti angka 7 dengan angka lain untuk mengubah angka rahasia permainanmu.",
      },
      {
        title: "Tantangan 3x Tebakan",
        goal: "Merakit permainan utuh: 3 kesempatan, berhenti saat menang, gagal bila habis.",
        guide: [
          {
            block: "repeat (3)",
            warna: "#FFAB19",
            fungsi: "Menjadi bingkai 3 kesempatan — badan repeat yang kosong diisi dengan kode dari halaman sebelumnya (ask, broadcast and wait, dan cek jawaban).",
            alasan: "Tanpa batas, pemain bisa menebak selamanya dan tantangannya hilang — 3x membuat tiap tebakan berharga.",
          },
          {
            block: "stop [all v]",
            warna: "#FFAB19",
            fungsi: "Menghentikan seluruh permainan begitu tebakan tepat.",
            alasan: "Kemenangan harus mengakhiri game — kalau tidak dihentikan, program akan lanjut meminta tebakan lagi.",
          },
          {
            block: "say [Kamu gagal menjadi penyihir Master of Mind!] for (2) seconds",
            warna: "#9966FF",
            fungsi: "Mengumumkan kegagalan setelah 3 kesempatan habis tanpa tebakan tepat.",
            alasan: "Blok ini diletakkan di luar repeat sehingga hanya tercapai bila perulangan selesai tanpa stop — artinya pemain gagal 3x.",
          },
        ],
        codeTitle: "Skrip lengkap permainan (di sprite Wizard):",
        code: `when flag clicked
switch backdrop to [Chalkboard v]
repeat (3)

end
say [Kamu gagal menjadi penyihir Master of Mind!] for (2) seconds`,
        tip: "Salin kode halaman sebelumnya ke dalam badan repeat yang kosong, lalu coba sengaja salah 3x untuk melihat pesan gagalnya. Skrip Abby tidak berubah.",
      },
    ],
  },
  {
    id: "encode-5-digit",
    title: "Encode: Tebak Kode 5 Digit",
    desc: "Proyek kode rahasia bersama Wizard dan Abby: tebak 5 digit dan terima respon O (tepat), Q (angka benar posisi salah), atau X (salah).",
    level: "Menengah",
    minutes: 50,
    cast: [
      { name: "Abby (penebak)", image: "sprites/abby.svg", x: -120, y: 0 },
      { name: "Wizard (penjaga kode)", image: "sprites/wizard.svg", x: 120, y: 0 },
    ],
    backdrop: { name: "Papan Tulis (Chalkboard)", image: "backdrops/chalkboard.png" },
    goals: [
      "Menyimpan kode rahasia 5 digit di variabel",
      "Membaca tiap digit dengan letter of dan repeat",
      "Menilai O, Q, X dengan if dan contains",
    ],
    sections: [
      {
        title: "Menyimpan Kode Rahasia",
        goal: "Menyiapkan variabel kode rahasia lalu meminta tebakan pemain.",
        guide: [
          {
            block: "set [kode rahasia v] to [24153]",
            warna: "#FF8C1A",
            fungsi: "Menyimpan kode 5 digit yang harus ditebak pemain.",
            alasan: "Kode disimpan di variabel agar mudah diganti tanpa mengubah seluruh skrip.",
          },
          {
            block: "set [hasil v] to []",
            warna: "#FF8C1A",
            fungsi: "Menyiapkan wadah kosong untuk rangkaian O, Q, X.",
            alasan: "Hasil dibangun huruf per huruf dari kiri ke kanan, jadi harus mulai dari kosong.",
          },
          {
            block: "ask [Tebak kode 5 digit rahasia!] and wait",
            warna: "#5CB1D6",
            fungsi: "Meminta tebakan 5 digit sekaligus menunggu pemain mengetik.",
            alasan: "Kata and wait wajib ada — tanpanya program lanjut duluan sebelum pemain sempat mengetik.",
          },
        ],
        codeTitle: "Susun blok seperti ini (di sprite Wizard):",
        code: `when flag clicked
set [kode rahasia v] to [24153]
set [hasil v] to []
ask [Tebak kode 5 digit rahasia!] and wait`,
        tip: "Buat dulu 3 variabel (untuk semua sprite): kode rahasia, hasil, dan posisi.",
      },
      {
        title: "Membaca Tiap Digit",
        goal: "Memeriksa 5 digit satu per satu dengan repeat dan letter of.",
        guide: [
          {
            block: "set [posisi v] to (1)",
            warna: "#FF8C1A",
            fungsi: "Mulai pemeriksaan dari digit pertama.",
            alasan: "Komputer menghitung posisi mulai dari 1, bukan dari 0.",
          },
          {
            block: "repeat (5)",
            warna: "#FFAB19",
            fungsi: "Mengulang pemeriksaan untuk kelima digit.",
            alasan: "Tanpa repeat, cek yang sama harus ditulis ulang sebanyak 5 kali.",
          },
          {
            block: "letter (posisi) of (answer)",
            warna: "#59C059",
            fungsi: "Mengambil digit ke-posisi dari tebakan pemain.",
            alasan: "Tebakan adalah teks 5 huruf sehingga tiap digit bisa diambil satu per satu.",
          },
          {
            block: "change [posisi v] by (1)",
            warna: "#FFAB19",
            fungsi: "Pindah ke digit berikutnya di akhir setiap pengulangan.",
            alasan: "Tanpa ini, repeat akan memeriksa digit yang sama sebanyak 5 kali.",
          },
        ],
        codeTitle: "Sambung di bawah ask (skrip Wizard):",
        code: `set [posisi v] to (1)
repeat (5)

change [posisi v] by (1)
end`,
        tip: "Badan repeat yang kosong akan diisi kode penilai di halaman berikut.",
      },
      {
        title: "Menilai O, Q, X",
        goal: "Memberi O bila angka dan posisi tepat, Q bila angka benar tapi posisi salah, X bila salah.",
        guide: [
          {
            block: "if <(letter (posisi) of (answer)) = (letter (posisi) of (kode rahasia))> then",
            warna: "#FFAB19",
            fungsi: "Menguji apakah digit tebakan sama persis dengan digit kode di posisi yang sama.",
            alasan: "Kecocokan penuh adalah nilai tertinggi, jadi diperiksa paling dulu dan diganjar O.",
          },
          {
            block: "set [hasil v] to (join (hasil) [O])",
            warna: "#FF8C1A",
            fungsi: "Menempelkan huruf O ke ujung rangkaian hasil.",
            alasan: "Hasil dibangun bertahap seperti menulis dari kiri ke kanan — tiap digit menambah satu huruf.",
          },
          {
            block: "<(kode rahasia) contains (letter (posisi) of (answer))?>",
            warna: "#59C059",
            fungsi: "Menguji apakah digit tebakan ada di dalam kode walau posisinya salah.",
            alasan: "Inilah syarat huruf Q: angkanya benar, hanya tempatnya belum tepat.",
          },
          {
            block: "else ... [X]",
            warna: "#FFAB19",
            fungsi: "Memberi X bila digit tidak cocok dan tidak ada di kode sama sekali.",
            alasan: "Cabang terakhir menampung semua sisa kemungkinan — digit yang benar-benar salah.",
          },
        ],
        codeTitle: "Tempel di dalam repeat halaman sebelumnya:",
        code: `if <(letter (posisi) of (answer)) = (letter (posisi) of (kode rahasia))> then
set [hasil v] to (join (hasil) [O])
else
if <(kode rahasia) contains (letter (posisi) of (answer))?> then
set [hasil v] to (join (hasil) [Q])
else
set [hasil v] to (join (hasil) [X])
end
end`,
        tip: "Digit ganda bisa membuat Q kurang akurat — jadikan itu tantangan berikutnya setelah game jalan!",
      },
      {
        title: "Mengumumkan Kemenangan",
        goal: "Menampilkan rangkaian O/X/Q dan merayakan bila semuanya O.",
        guide: [
          {
            block: "say (join [Kode: ] (hasil)) for (4) seconds",
            warna: "#9966FF",
            fungsi: "Menampilkan hasil penilaian lima digit sekaligus, misalnya OXOQX.",
            alasan: "Pemain butuh melihat semua nilainya bersamaan untuk menyusun tebakan berikutnya.",
          },
          {
            block: "if <(hasil) = [OOOOO]> then",
            warna: "#FFAB19",
            fungsi: "Menguji apakah seluruh rangkaian hasilnya O semua.",
            alasan: "Lima O berarti lima digit tepat semua — hanya dalam kondisi inilah kemenangan dirayakan.",
          },
        ],
        codeTitle: "Sambung setelah repeat selesai (skrip Wizard):",
        code: `say (join [Kode: ] (hasil)) for (4) seconds
if <(hasil) = [OOOOO]> then
say [Tepat semua! Kamu Master of Mind!] for (2) seconds
end`,
        tip: "Coba tebak 24153 untuk melihat lima O dan pesan kemenangannya langsung!",
      },
    ],
  },
  {
    id: "cat-jump-right",
    title: "Cat Jump Right",
    desc: "Game lompat-lompat: cat ditarik gravitasi, meloncat otomatis saat menginjak paddle, dan paddle muncul terus dari kanan sebagai clone.",
    level: "Menengah",
    minutes: 50,
    embedUrl: "https://scratch.mit.edu/projects/1392666609/embed",
    cast: [
      { name: "Cat (player)", image: "sprites/kucing.svg", x: -120, y: 60 },
      { name: "Paddle (platform)", image: "sprites/paddle.svg", x: 120, y: -100 },
    ],
    backdrop: { name: "Blue Sky 2", image: "backdrops/blue-sky-2.svg" },
    goals: [
      "Membuat gravitasi dengan variabel velocity y",
      "Mendeteksi sentuhan untuk meloncat otomatis",
      "Membuat platform bergerak memakai clone",
    ],
    sections: [
      {
        title: "Menyiapkan Player Cat",
        goal: "Menyiapkan latar, variabel kecepatan, dan posisi awal cat.",
        guide: [
          {
            block: "when flag clicked",
            warna: "#FFBF00",
            fungsi: "Menjadi tombol start seluruh game.",
            alasan: "Semua skrip cat dan paddle berjalan bersama hanya setelah bendera hijau diklik.",
          },
          {
            block: "switch backdrop to [Blue Sky 2 v]",
            warna: "#9966FF",
            fungsi: "Mengganti latar menjadi langit biru.",
            alasan: "Latarnya sengaja dibuat tinggi dan kosong supaya cat terlihat jelas saat melompat di udara.",
          },
          {
            block: "set [velocity y v] to [0]",
            warna: "#FF8C1A",
            fungsi: "Mengosongkan kecepatan vertikal cat sebelum game mulai.",
            alasan: "Tanpa direset, cat bisa tiba-tiba melesat ke atas atau bawah saat game dimainkan ulang.",
          },
          {
            block: "go to x: (-180) y: (60)",
            warna: "#4C97FF",
            fungsi: "Menempatkan cat di sudut kiri atas panggung.",
            alasan: "Posisi awal di atas memberi ruang jatuh, sehingga pemain langsung paham bahwa ada gravitasi.",
          },
        ],
        codeTitle: "Susun blok seperti ini (di sprite Cat):",
        code: `when flag clicked
switch backdrop to [Blue Sky 2 v]
set [velocity y v] to [0]
go to x: (-180) y: (60)`,
        tip: "Buat satu variabel baru bernama velocity y untuk seluruh sprite, lalu kosongkan centangnya agar tidak menutupi panggung.",
      },
      {
        title: "Gravitasi Menarik Cat ke Bawah",
        goal: "Membuat cat jatuh makin cepat memakai perubahan velocity di dalam forever.",
        guide: [
          {
            block: "forever",
            warna: "#FFAB19",
            fungsi: "Mengulang perhitungan gravitasi terus-menerus selama game berjalan.",
            alasan: "Gravitasi bukan sekali jalan — ia harus dihitung ulang setiap saat agar jatuhnya terasa halus, bukan melompat.",
          },
          {
            block: "change [velocity y v] by (-1)",
            warna: "#FF8C1A",
            fungsi: "Mengurangi kecepatan vertikal sebesar 1 setiap putaran.",
            alasan: "Inilah inti gravitasi: makin lama jatuh, makin besar tambahan kecepatan ke bawah — cat makin cepat jatuh.",
          },
          {
            block: "change y by (velocity y)",
            warna: "#4C97FF",
            fungsi: "Memindahkan cat ke bawah sesuai kecepatan vertikalnya.",
            alasan: "Kecepatan saja tidak memindahkan apa pun; angka velocity harus dipakai untuk menggeser posisi Y cat.",
          },
        ],
        codeTitle: "Sambung di bawah go to:",
        code: `forever
change [velocity y v] by (-1)
change y by (velocity y)
end`,
        tip: "Klik bendera lalu lihat cat jatuh. Kalau terasa terlalu cepat, ubah -1 menjadi -0.5.",
      },
      {
        title: "Loncat Otomatis di Paddle",
        goal: "Membuat cat meloncat sendiri setiap kali menyentuh paddle.",
        guide: [
          {
            block: "if <touching [Paddle v]?> then",
            warna: "#FFAB19",
            fungsi: "Menguji apakah cat sedang menempel pada paddle.",
            alasan: "Blok ini menjadi pengganti tombol lompat — pemain tidak menekan apa pun, cukup mendarat di paddle.",
          },
          {
            block: "set [velocity y v] to [20]",
            warna: "#FF8C1A",
            fungsi: "Melemparkan cat ke atas dengan kecepatan 20.",
            alasan: "Lonjakan harus jauh lebih besar daripada gravitasi -1, jadi cat terlihat meloncat tinggi sebelum jatuh lagi.",
          },
        ],
        codeTitle: "Tambahkan di dalam forever (skrip Cat):",
        code: `forever
change [velocity y v] by (-1)
change y by (velocity y)
if <touching [Paddle v]?> then
set [velocity y v] to [20]
end
end`,
        tip: "Uji dengan cara menjatuhkan cat tepat di atas paddle — cat harus memantul naik sendiri.",
      },
      {
        title: "Bergerak Hanya ke Kiri dan ke Kanan",
        goal: "Mengendalikan cat dengan if key pressed di dalam forever, tanpa mengganggu gravitasi.",
        guide: [
          {
            block: "forever",
            warna: "#FFAB19",
            fungsi: "Memeriksa tombol panah terus-menerus selama game berjalan.",
            alasan: "Tombol bisa ditekan kapan saja, jadi pengecekannya harus berulang — bukan hanya sekali di awal.",
          },
          {
            block: "if <key [right arrow v] pressed?> then",
            warna: "#FFAB19",
            fungsi: "Menguji apakah tombol panah kanan sedang ditekan.",
            alasan: "Berbeda dengan when key pressed yang jalan sekali, blok if membuat cat terus bergerak selama tombol ditahan.",
          },
          {
            block: "change x by (6)",
            warna: "#4C97FF",
            fungsi: "Menggeser cat ke kanan enam langkah tiap putaran.",
            alasan: "Karena forever berjalan sangat cepat, angka kecil seperti 6 sudah terasa halus dan cukup cepat.",
          },
          {
            block: "if <key [left arrow v] pressed?> then",
            warna: "#FFAB19",
            fungsi: "Menguji apakah tombol panah kiri sedang ditekan.",
            alasan: "Kedua tombol diperiksa terpisah agar cat tetap bisa bergerak walau pemain menekan panah kiri setelah panah kanan.",
          },
          {
            block: "change x by (-6)",
            warna: "#4C97FF",
            fungsi: "Menggeser cat ke kiri saat panah kiri ditekan.",
            alasan: "Mengubah X saja berarti pemain sama sekali tidak bisa menambah ketinggian — gerakan tetap terbatas kiri-kanan.",
          },
        ],
        codeTitle: "Buat skrip terpisah (di sprite Cat):",
        code: `forever
if <key [right arrow v] pressed?> then
change x by (6)
end
if <key [left arrow v] pressed?> then
change x by (-6)
end
end`,
        tip: "Jangan pernah mengubah Y di skrip ini, karena ketinggian cat sepenuhnya diatur oleh gravitasi dan lonjakan.",
      },
      {
        title: "Dua Paddle di Awal Layar",
        goal: "Menyembunyikan induk lalu membuat dua paddle awal di x -120 dan x 140 memakai repeat 2.",
        guide: [
          {
            block: "when flag clicked",
            warna: "#FFBF00",
            fungsi: "Menjalankan skrip paddle saat game dimulai.",
            alasan: "Paddle harus mulai mencetak clone bersamaan dengan cat mulai jatuh, bukan setelah pemain menekan tombol lain.",
          },
          {
            block: "hide",
            warna: "#9966FF",
            fungsi: "Menyembunyikan paddle induk sejak awal.",
            alasan: "Induk hanya bertugas mencetak clone, jadi ia tidak boleh ikut terlihat di panggung sejak detik pertama.",
          },
          {
            block: "go to x: (-120) y: (pick random (0) to (-160))",
            warna: "#4C97FF",
            fungsi: "Menempatkan paddle induk di titik awal dengan ketinggian acak.",
            alasan: "Paddle induk dipakai sebagai pencetak clone, jadi posisinya menentukan di mana clone muncul.",
          },
          {
            block: "repeat (2)",
            warna: "#FFAB19",
            fungsi: "Mengulang pembuatan clone sebanyak dua kali untuk dua paddle awal.",
            alasan: "Kedua paddle awal punya skrip yang sama persis, jadi cukup ditulis satu kali lalu diulang dua kali.",
          },
          {
            block: "create clone of [myself v]",
            warna: "#FFAB19",
            fungsi: "Memunculkan salinan paddle tepat di posisi induk saat itu.",
            alasan: "Clone selalu lahir di tempat induknya berada — itulah cara mengatur posisi awal tanpa menulis koordinat satu per satu.",
          },
          {
            block: "change x by (260)",
            warna: "#4C97FF",
            fungsi: "Memindahkan induk ke titik awal berikutnya, 260 langkah ke kanan.",
            alasan: "Dari -120 bergeser 260 menjadi 140, jadi putaran kedua mencetak clone di titik yang diminta.",
          },
          {
            block: "set y to (pick random (0) to (-160))",
            warna: "#4C97FF",
            fungsi: "Memberi ketinggian baru sebelum clone berikutnya dibuat.",
            alasan: "Tanpa ini, kedua paddle awal akan berbaris rata pada ketinggian yang sama dan terlalu mudah dilewati.",
          },
        ],
        codeTitle: "Buat skrip baru di sprite Paddle:",
        code: `when flag clicked
hide
go to x: (-120) y: (pick random (0) to (-160))
repeat (2)
create clone of [myself v]
change x by (260)
set y to (pick random (0) to (-160))
end`,
        tip: "Klik bendera dan hitung: harus ada tepat dua paddle yang langsung meluncur, satu dari kiri dan satu dari kanan.",
      },
      {
        title: "Paddle Baru Muncul Terus",
        goal: "Memberi jeda setengah detik, lalu mencetak paddle baru dari sisi kanan setiap satu detik.",
        guide: [
          {
            block: "go to x: (250) y: (pick random (0) to (-160))",
            warna: "#4C97FF",
            fungsi: "Memindahkan induk ke luar sisi kanan panggung sebelum mulai mencetak.",
            alasan: "X 250 berada di luar layar sehingga paddle terlihat benar-benar masuk dari kanan, bukan muncul tiba-tiba.",
          },
          {
            block: "wait (0.5) seconds",
            warna: "#FFAB19",
            fungsi: "Memberi jeda setengah detik sebelum forever dimulai.",
            alasan: "Dua paddle awal butuh waktu sejenak untuk meluncur dulu, supaya pemain tidak langsung kebanjiran platform.",
          },
          {
            block: "wait (1) seconds",
            warna: "#FFAB19",
            fungsi: "Memberi jeda satu detik di antara dua paddle baru.",
            alasan: "Tanpa jeda, forever akan mencetak clone tanpa henti sampai panggung penuh dan game tersendat.",
          },
          {
            block: "when I start as a clone",
            warna: "#FFBF00",
            fungsi: "Skrip yang hanya dijalankan oleh setiap clone paddle.",
            alasan: "Induk tidak perlu bergerak ke kiri — tugas itu sudah dipegang oleh semua clone-nya.",
          },
          {
            block: "show",
            warna: "#9966FF",
            fungsi: "Menampilkan clone yang tadinya ikut tersembunyi bersama induk.",
            alasan: "Clone mewarisi keadaan tersembunyi induk, jadi setiap clone wajib menampilkan dirinya sendiri.",
          },
          {
            block: "repeat until <(x position) < (-250)>",
            warna: "#FFAB19",
            fungsi: "Mengulang gerakan ke kiri sampai clone keluar dari sisi kiri panggung.",
            alasan: "Paddle harus terus bergerak selama masih terlihat; setelah lewat batas kiri, ia sudah tidak berguna.",
          },
          {
            block: "delete this clone",
            warna: "#FFAB19",
            fungsi: "Menghapus clone yang sudah keluar layar.",
            alasan: "Clone yang dibiarkan hidup akan menumpuk terus dan membuat game melambat.",
          },
        ],
        codeTitle: "Lanjutkan skrip Paddle:",
        code: `go to x: (250) y: (pick random (0) to (-160))
wait (0.5) seconds
forever
create clone of [myself v]
wait (1) seconds
end

when I start as a clone
show
repeat until <(x position) < (-250)>
change x by (-8)
end
delete this clone`,
        tip: "Y acak dari 0 sampai -160 membuat tiap paddle datang di ketinggian berbeda, jadi pemain tidak bisa menghafal polanya.",
      },
      {
        title: "Game Over Saat Jatuh ke Lantai",
        goal: "Mengakhiri permainan ketika cat menyentuh dasar panggung.",
        guide: [
          {
            block: "if <(y position) < (-165)> then",
            warna: "#FFAB19",
            fungsi: "Menguji apakah cat sudah turun melewati batas lantai.",
            alasan: "Batas -165 dipakai agar cat dihitung jatuh tepat saat menyentuh lantai, bukan setelah badannya terbenam.",
          },
          {
            block: "say [Game Over!] for (2) seconds",
            warna: "#9966FF",
            fungsi: "Menampilkan pesan game over kepada pemain.",
            alasan: "Pemain perlu tahu permainan berakhir karena cat jatuh, bukan karena aplikasinya rusak.",
          },
          {
            block: "stop [all v]",
            warna: "#FFAB19",
            fungsi: "Menghentikan seluruh skrip di semua sprite.",
            alasan: "Kalau tidak dihentikan, paddle akan tetap berjalan di belakang layar meski permainan sudah selesai.",
          },
        ],
        codeTitle: "Lengkapi skrip forever milik Cat:",
        code: `forever
change [velocity y v] by (-1)
change y by (velocity y)
if <touching [Paddle v]?> then
set [velocity y v] to [20]
end
if <(y position) < (-165)> then
say [Game Over!] for (2) seconds
stop [all v]
end
end`,
        tip: "Setelah game over, klik bendera hijau untuk bermain lagi. Coba ubah nilai loncatan 20 menjadi 25 agar cat meloncat lebih tinggi.",
      },
    ],
  },
  {
    id: "scan-tinggi-dino",
    title: "Scan Tinggi Dino",
    desc: "Proyek pengukur tinggi badan: garis pemindai naik dari dasar panggung sambil menghitung berapa langkah ia menyentuh dinosaur, lalu mengumumkan hasilnya.",
    level: "Menengah",
    minutes: 80,
    embedUrl: "https://scratch.mit.edu/projects/1393095756/embed",
    intro:
      "Di Scratch kita bisa menentukan posisi x dan y, ukuran, direction, dan lain-lain dengan angka. Tapi kita tidak memiliki pengukuran tinggi dari sebuah sprite. Karena itu kita membuat project Scan Tinggi Dino, untuk mencari tahu cara mendapatkan nilai tinggi sebuah sprite.",
    quiz: {
      prompt:
        "Amati proyek “Scan Dino Height” di atas. Bagian sistem desain Scratch dan algoritma mana saja yang dipakai proyek ini? Pilih semua yang benar.",
      petunjuk:
        "Pilih hanya kategori blok dan algoritma yang benar-benar dipakai garis pemindai dan dino. Bagian yang tidak ada sama sekali di proyek jangan dipilih.",
      grup: [
        {
          judul: "Bagian sistem desain (palet blok)",
          pilihan: [
            { id: "gerak", label: "Gerak (Motion)" },
            { id: "tampilan", label: "Tampilan (Looks)" },
            { id: "suara", label: "Suara (Sound)" },
            { id: "kejadian", label: "Kejadian (Events)" },
            { id: "kontrol", label: "Kontrol (Control)" },
            { id: "sensor", label: "Sensor (Sensing)" },
            { id: "operator", label: "Operator (Operators)" },
            { id: "variabel", label: "Variabel (Variables)" },
            { id: "blok-sendiri", label: "Blok Buatan Sendiri (My Blocks)" },
          ],
        },
        {
          judul: "Algoritma utama",
          pilihan: [
            { id: "scan-repeat", label: "Scan menggunakan repeat" },
            {
              id: "deteksi-tabrakan",
              label: "Deteksi tabrakan garis dengan dino",
            },
            {
              id: "tinggi",
              label: "Menghitung tinggi +1 dalam repeat",
            },
            { id: "cari-biner", label: "Pencarian biner (binary search)" },
            { id: "urutkan", label: "Pengurutan nilai (sorting)" },
            {
              id: "rata-rata",
              label: "Menghitung rata-rata beberapa pengukuran",
            },
          ],
        },
      ],
      wajib: [
        "gerak",
        "sensor",
        "kontrol",
        "variabel",
        "operator",
        "scan-repeat",
        "deteksi-tabrakan",
        "tinggi",
      ],
      terlarang: ["suara", "blok-sendiri", "cari-biner", "urutkan", "rata-rata"],
    },
    cast: [
      { name: "Line (pemindai)", image: "sprites/line.svg" },
      { name: "Kelinci (sprite kedua)", image: "sprites/kelinci.svg" },
      { name: "Dinosaur1-a", image: "sprites/dinosaur1-a.svg" },
      { name: "Dinosaur2-a", image: "sprites/dinosaur2-a.svg" },
      { name: "Dinosaur3-a", image: "sprites/dinosaur3-a.svg" },
      { name: "Dinosaur4-a", image: "sprites/dinosaur4-a.svg" },
    ],
    goals: [
      "Mengirim pesan antar sprite dengan broadcast and wait",
      "Menghitung tinggi memakai repeat dan blok touching",
      "Mengganti kostum secara acak dengan pick random",
      "Menambahkan sprite kedua dan mengukur dua sprite dalam satu kali penyapuan",
      "Memainkan suara berbeda saat garis menyentuh dan tidak menyentuh sprite",
      "Membuat garis pemindai baru yang bergerak mendatar untuk mengukur lebar sprite",
    ],
    sections: [
      {
        title: "Menyiapkan Variabel dan Tombol Mulai",
        goal: "Menyiapkan tinggi hitungan, posisi awal garis, dan pemicu tombol spasi.",
        guide: [
          {
            block: "when [space v] key pressed",
            warna: "#FFBF00",
            fungsi: "Menjalankan pengukuran saat pemain menekan tombol spasi.",
            alasan: "Tombol spasi dipakai sebagai tombol ukur, jadi pemain bisa menekan berkali-kali untuk mengukur ulang.",
          },
          {
            block: "broadcast [start scan v] and wait",
            warna: "#FFBF00",
            fungsi: "Memberi tahu sprite Item agar bersiap, lalu menunggu sampai ia selesai bersiap.",
            alasan: "Kata and wait wajib ada — tanpa itu garis sudah bergerak naik sebelum dinosaur sempat muncul di tengah layar.",
          },
          {
            block: "go to x: (0) y: (-180)",
            warna: "#4C97FF",
            fungsi: "Menempatkan garis di dasar panggung sebagai titik awal pengukuran.",
            alasan: "Pengukuran harus selalu mulai dari titik yang sama di bawah, supaya hasil tiap kali bisa dibandingkan.",
          },
          {
            block: "set [height v] to (0)",
            warna: "#FF8C1A",
            fungsi: "Mengosongkan angka tinggi sebelum mulai menghitung.",
            alasan: "Tanpa direset, hasil ukuran baru akan menempel pada hasil ukuran sebelumnya.",
          },
        ],
        codeTitle: "Susun blok seperti ini (di sprite Line):",
        code: `when [space v] key pressed
broadcast [start scan v] and wait
go to x: (0) y: (-180)
set [height v] to [0]`,
        tip: "Buat variabel height dengan pilihan for all sprites, karena sprite Item juga membaca angka ini.",
      },
      {
        title: "Garis Pemindai Bergerak ke Atas",
        goal: "Menaikkan garis satu langkah demi satu langkah sampai menyentuh bagian atas panggung.",
        guide: [
          {
            block: "repeat (360)",
            warna: "#FFAB19",
            fungsi: "Mengulang pengukuran sebanyak 360 langkah.",
            alasan: "Panggung tingginya 360 satuan, dari y -180 sampai y 180, jadi satu pengulangan mewakili satu satuan tinggi.",
          },
          {
            block: "set [color v] effect to (0)",
            warna: "#9966FF",
            fungsi: "Mengembalikan warna garis ke normal di setiap langkah.",
            alasan: "Warna garis dipakai sebagai penanda sentuhan, jadi harus dibersihkan dulu sebelum langkah berikutnya.",
          },
          {
            block: "change y by (1)",
            warna: "#4C97FF",
            fungsi: "Menaikkan garis satu langkah ke atas.",
            alasan: "Naik satu-satu membuat garis memeriksa seluruh badan dinosaur dari bawah ke atas, bukan melompat.",
          },
        ],
        codeTitle: "Sambung di bawah set height:",
        code: `repeat (360)
set [color v] effect to (0)
change y by (1)
end`,
        tip: "Satu langkah bernilai satu satuan. Karena itu 360 langkah sudah cukup untuk menyisir seluruh tinggi panggung.",
      },
      {
        title: "Menghitung Tinggi Dino",
        goal: "Menambah hitungan setiap kali garis berada di dalam badan dinosaur.",
        guide: [
          {
            block: "if <touching [Item v]?> then",
            warna: "#FFAB19",
            fungsi: "Menguji apakah garis sedang menempel pada badan dinosaur.",
            alasan: "Sentuhan inilah yang menandai bahwa langkah itu masih bagian dari tinggi dinosaur.",
          },
          {
            block: "set [color v] effect to (100)",
            warna: "#9966FF",
            fungsi: "Mengubah warna garis sebagai tanda bahwa ia sedang menyentuh dinosaur.",
            alasan: "Pemain bisa melihat sendiri bagian mana dari dinosaur yang sedang diukur, jadi hasilnya tidak terasa seperti sulap.",
          },
          {
            block: "change [height v] by (1)",
            warna: "#FF8C1A",
            fungsi: "Menambah satu angka tinggi untuk setiap langkah yang menyentuh dinosaur.",
            alasan: "Setiap langkah yang menyentuh berarti satu satuan tinggi badan, jadi jumlahnya sama dengan tinggi dinosaur.",
          },
        ],
        codeTitle: "Tempel di dalam repeat:",
        code: `repeat (360)
set [color v] effect to (0)
change y by (1)
if <touching [Item v]?> then
set [color v] effect to (100)
change [height v] by (1)
end
end`,
        tip: "Blok if harus berada di dalam repeat, kalau tidak garis hanya diperiksa sekali di dasar panggung.",
      },
      {
        title: "Koreksi Angka dan Laporan Selesai",
        goal: "Membetulkan hasil hitungan karena ketebalan garis, lalu meminta dinosaur mengumumkan tinggi.",
        guide: [
          {
            block: "change [height v] by (-15)",
            warna: "#FF8C1A",
            fungsi: "Mengurangi hasil hitungan sebanyak 15.",
            alasan: "Garis punya ketebalan sendiri, sehingga ia terhitung menyentuh sedikit lebih lama daripada badan aslinya — 15 langkah itu kelebihannya.",
          },
          {
            block: "broadcast [scan done v] and wait",
            warna: "#FFBF00",
            fungsi: "Memberi tahu dinosaur bahwa pengukuran sudah selesai dan hasilnya siap dibacakan.",
            alasan: "Tanpa pesan ini dinosaur tidak akan pernah tahu kapan angka tingginya sudah final.",
          },
        ],
        codeTitle: "Skrip lengkap sprite Line:",
        code: `when [space v] key pressed
broadcast [start scan v] and wait
go to x: (0) y: (-180)
set [height v] to [0]
repeat (360)
set [color v] effect to (0)
change y by (1)
if <touching [Item v]?> then
set [color v] effect to (100)
change [height v] by (1)
end
end
change [height v] by (-15)
broadcast [scan done v] and wait`,
        tip: "Coba ukur berkali-kali: dinosaur berganti bentuk, jadi angka tingginya ikut berubah.",
      },
      {
        title: "Sprite Item: Ganti Kostum dan Laporkan",
        goal: "Membuat dinosaur berganti bentuk secara acak lalu membacakan tinggi badannya.",
        guide: [
          {
            block: "when I receive [start scan v]",
            warna: "#FFBF00",
            fungsi: "Membuat dinosaur bersiap tepat sebelum garis mulai naik.",
            alasan: "Dinosaur harus berganti bentuk lebih dulu agar garis mengukur bentuk yang benar-benar tampil.",
          },
          {
            block: "switch costume to (pick random (1) to (4))",
            warna: "#9966FF",
            fungsi:
              "Memilih satu dari empat kostum dinosaur secara acak: Dinosaur1-a, Dinosaur2-a, Dinosaur3-a, atau Dinosaur4-a.",
            alasan: "Keacakan membuat pengukuran terasa seperti benar-benar mengukur, bukan menampilkan satu bentuk yang sama terus.",
          },
          {
            block: "go to x: (0) y: (0)",
            warna: "#4C97FF",
            fungsi: "Memindahkan dinosaur ke tengah panggung.",
            alasan: "Posisi di tengah membuat seluruh badannya berada di jalur garis pemindai yang naik dari bawah.",
          },
          {
            block: "when I receive [scan done v]",
            warna: "#FFBF00",
            fungsi: "Membuat dinosaur melaporkan hasil setelah pengukuran selesai.",
            alasan: "Hasil baru boleh diumumkan setelah garis selesai naik dan angka height sudah dikoreksi.",
          },
          {
            block: "say (join [Tinggi dinosaurnya adalah ] (height)) for (2) seconds",
            warna: "#9966FF",
            fungsi: "Menampilkan kalimat hasil ukur bersama angka tingginya.",
            alasan: "Angka saja tidak cukup jelas, jadi digabung dengan kalimat memakai blok join agar mudah dibaca.",
          },
        ],
        codeTitle: "Buat dua skrip di sprite Item:",
        code: `when I receive [start scan v]
switch costume to (pick random (1) to (4))
go to x: (0) y: (0)

when I receive [scan done v]
say (join [Tinggi dinosaurnya adalah ] (height)) for (2) seconds`,
        tip: "Kalau hasilnya terasa kurang tepat, ubah angka koreksi -15 sedikit demi sedikit sampai angkanya masuk akal.",
      },
      {
        title: "Tantangan 1: Scan Dua Sprite Sekaligus",
        goal: "Menambahkan sprite baru lalu mengukur tinggi kedua sprite dalam satu kali penyapuan garis.",
        guide: [
          {
            block: "set [height2 v] to (0)",
            warna: "#FF8C1A",
            fungsi: "Menyiapkan variabel kedua untuk sprite baru, lalu mengosongkannya sebelum mengukur.",
            alasan: "Kalau keduanya menumpang satu variabel, angka tinggi dinosaur dan kelinci akan tercampur.",
          },
          {
            block: "if <touching [Kelinci v]?> then",
            warna: "#5CB1D6",
            fungsi: "Memeriksa sentuhan dengan sprite kedua di langkah yang sama.",
            alasan: "Garis bisa menyentuh dua sprite sekaligus, jadi setiap sprite butuh pemeriksaan sendiri.",
          },
          {
            block: "change [height2 v] by (1)",
            warna: "#FF8C1A",
            fungsi: "Menghitung tinggi kelinci, satu langkah setiap kali garis menyentuhnya.",
            alasan: "Cara kerjanya sama seperti tinggi dinosaur — yang dihitung hanya langkah saat garis menempel di badannya.",
          },
          {
            block: "when I receive [start scan v]",
            warna: "#FFBF00",
            fungsi: "Di sprite Kelinci: bersiap tepat sebelum garis mulai naik.",
            alasan: "Sprite kedua harus berada di tempatnya lebih dulu, supaya tinggi yang terukur adalah tinggi badannya yang asli.",
          },
          {
            block: "say (join [Tinggi kelincinya adalah ] (height2)) for (2) seconds",
            warna: "#9966FF",
            fungsi: "Di sprite Kelinci: melaporkan hasil ukurnya sendiri setelah pengukuran selesai.",
            alasan: "Tiap sprite membaca variabelnya sendiri, jadi dua sprite bisa melaporkan dua angka berbeda.",
          },
        ],
        tip: "Sprite kedua tidak harus Kelinci — pakai sprite apa saja dari galeri, lalu sesuaikan nama di blok touching dan namanya di pesan pelaporannya.",
      },
      {
        title: "Tantangan 2: Suara Pemindai",
        goal: "Menambah suara: nada berbeda saat garis menyentuh dino dan saat garis belum menyentuh apa pun.",
        guide: [
          {
            block: "start sound [Buzz Whir v]",
            warna: "#CF63CF",
            fungsi: "Membunyikan suara pemindai selama garis belum menyentuh sprite.",
            alasan: "Blok start sound tidak menunggu suara selesai, jadi pengukuran tetap berjalan tanpa jeda.",
          },
          {
            block: "start sound [Coin v]",
            warna: "#CF63CF",
            fungsi: "Membunyikan suara berbeda begitu garis menyentuh badan dinosaur.",
            alasan: "Perbedaan nada membuat pemain bisa mendengar kapan garis sudah menemukan bagian sprite tanpa melihat layar.",
          },
          {
            block: "if <> then else end",
            warna: "#FFAB19",
            fungsi: "Memilih suara mana yang dimainkan berdasarkan hasil pemeriksaan sentuhan.",
            alasan: "Satu pemeriksaan sentuhan dipakai dua arah: menyentuh atau tidak menyentuh.",
          },
        ],
        tip: "Repeat berjalan 360 kali, jadi suaranya bertumpuk cepat. Pilih suara pendek seperti Pop atau Squish Pop. Kalau masih terlalu berisik, catat keadaan sebelumnya di sebuah variabel dan mainkan suara hanya saat keadaannya berubah.",
      },
      {
        title: "Tantangan 3: Garis Baru untuk Scan Lebar",
        goal: "Menduplikasi garis, memutarnya jadi tegak, lalu menyapu dari kiri ke kanan untuk mengukur lebar sprite.",
        guide: [
          {
            block: "point in direction (90)",
            warna: "#4C97FF",
            fungsi: "Memutar kostum garis yang mendatar menjadi tegak.",
            alasan: "Garis tegak menyapu ke samping, jadi yang terhitung adalah lebar badan sprite, bukan tingginya.",
          },
          {
            block: "go to x: (-240) y: (0)",
            warna: "#4C97FF",
            fungsi: "Menempatkan garis tegak di tepi kiri panggung sebagai titik awal menyapu.",
            alasan: "Panggung lebarnya 480 satuan, dari x -240 sampai x 240.",
          },
          {
            block: "repeat (480)",
            warna: "#FFAB19",
            fungsi: "Menggeser garis sebanyak 480 kali, satu langkah untuk satu satuan lebar.",
            alasan: "Jumlah pengulangan harus mengikuti lebar panggung supaya seluruh badan sprite tersapu.",
          },
          {
            block: "change x by (1)",
            warna: "#4C97FF",
            fungsi: "Menggeser garis tegak satu langkah ke kanan.",
            alasan: "Gerak mendatar inilah yang membuat pengukuran lebar berbeda dari pengukuran tinggi.",
          },
          {
            block: "change [width v] by (1)",
            warna: "#FF8C1A",
            fungsi: "Menghitung lebar selama garis tegak menempel di badan sprite.",
            alasan: "Sama seperti tinggi, lebar didapat dari berapa langkah garis menempel di sprite.",
          },
          {
            block: "say (join [Lebar dinosaurnya adalah ] (width)) for (2) seconds",
            warna: "#9966FF",
            fungsi: "Melaporkan hasil ukur lebar setelah penyapuan selesai.",
            alasan: "Angka lebar harus diumumkan setelah koreksi ketebalan garis dikurangi.",
          },
        ],
        tip: "Pakai tombol selain spasi supaya tidak bentrok dengan pemindai tinggi. Angka koreksi -15 boleh mulai dari nilai yang sama, lalu bandingkan hasilnya dengan ukuran asli sprite di panel Sprite dan sesuaikan sampai pas.",
      },
    ],
  },
  {
    id: "animate-a-name",
    title: "Animasikan Nama",
    desc: "Proyek animasi nama: setiap huruf menjadi sprite sendiri yang menyala, membesar, dan melompat saat diklik.",
    level: "Pemula",
    minutes: 45,
    castTitle: "Kenalan dengan para huruf",
    teaserCode: `? ? ? ? ? ? ? ? ? ? ? ? ? ? :: events hat grey
? ? ? ? ? ? ? ? (? ? :: operators grey) ? ? ? ? ? :: grey`,
    intro:
      "Nama adalah hal pertama yang dilihat orang saat membuka sebuah karya. Di Scratch, setiap huruf bisa menjadi sprite sendiri, sehingga huruf itu bebas berkedip, membesar, atau melompat. Karena itu kita membuat proyek Animasikan Nama: satu huruf, satu sprite, satu skrip kecil yang membuat nama terasa hidup.",
    cast: [
      { name: "Huruf N", image: "sprites/huruf-n.svg" },
      { name: "Huruf A", image: "sprites/huruf-a.svg" },
      { name: "Huruf M", image: "sprites/huruf-m.svg" },
      { name: "Huruf A (kedua)", image: "sprites/huruf-a.svg" },
    ],
    backdrop: { name: "Papan Tulis (Chalkboard)", image: "backdrops/chalkboard.png" },
    goals: [
      "Menambahkan satu sprite huruf untuk tiap huruf pada nama",
      "Membuat huruf bereaksi saat diklik dengan when this sprite clicked",
      "Mengubah warna dan ukuran huruf memakai blok effect",
      "Mengulang animasi dengan forever dan wait",
      "Memindahkan huruf dengan glide ke posisi acak",
    ],
    sections: [
      {
        title: "Memilih Nama dan Menambah Huruf",
        goal: "Menyiapkan satu sprite huruf untuk setiap huruf pada nama yang akan dianimasikan.",
        steps: [
          "Tentukan nama yang ingin dianimasikan. Contoh di tutorial ini adalah NAMA.",
          "Klik Choose a Sprite, buka kategori Letters, lalu pilih huruf N. Ulangi untuk huruf A, M, dan A.",
          "Ganti nama tiap sprite di panel Sprite menjadi Huruf N, Huruf A, Huruf M, dan Huruf A2 supaya mudah dibedakan.",
          "Susun huruf berjajar di tengah panggung memakai blok go to x: (...) y: (0).",
          "Klik bendera hijau untuk memastikan semua huruf tampil di posisi yang benar.",
        ],
        tip: "Kalau nama punya huruf yang sama, tambahkan sprite huruf itu dua kali. Dua sprite dengan kostum sama tetap punya skrip masing-masing.",
      },
      {
        title: "Huruf Menyala Saat Diklik",
        goal: "Membuat setiap huruf berubah warna dan berbunyi ketika pemain mengkliknya.",
        guide: [
          {
            block: "when this sprite clicked",
            warna: "#FFBF00",
            fungsi: "Menjalankan skrip saat huruf itu sendiri diklik.",
            alasan: "Setiap huruf punya skrip sendiri, jadi pemicunya harus menempel di sprite huruf — bukan di panggung — supaya hanya huruf yang diklik yang bereaksi.",
          },
          {
            block: "change [color v] effect by (25)",
            warna: "#9966FF",
            fungsi: "Menggeser warna huruf sebanyak 25 sehingga terlihat berubah.",
            alasan: "Perubahan kecil tapi pasti ini membuat huruf terasa disentuh; angka 25 cukup terlihat tanpa membuat warnanya melompat jauh.",
          },
          {
            block: "start sound [Pop v]",
            warna: "#CF63CF",
            fungsi: "Memutar bunyi pop saat huruf diklik.",
            alasan: "Blok start sound tidak menunggu bunyi selesai, jadi perubahan warna dan bunyi terjadi bersamaan.",
          },
        ],
        codeTitle: "Skrip untuk tiap huruf:",
        code: `when this sprite clicked
change [color v] effect by (25)
start sound [Pop v]`,
        tip: "Tempel skrip yang sama di semua huruf. Klik berulang akan terus menggeser warna, lalu kembali ke warna awal setelah satu putaran penuh.",
      },
      {
        title: "Huruf Membesar Lalu Menyusut",
        goal: "Menambahkan animasi ukuran supaya huruf terasa hidup saat disentuh.",
        guide: [
          {
            block: "set size to (140)%",
            warna: "#9966FF",
            fungsi: "Memperbesar huruf menjadi 140% dari ukuran aslinya.",
            alasan: "Membesar sesaat memberi kesan huruf melompat ke arah pemain, bukan sekadar berganti warna.",
          },
          {
            block: "wait (0.15) seconds",
            warna: "#FFAB19",
            fungsi: "Menahan ukuran besar sebentar sebelum dikembalikan.",
            alasan: "Tanpa jeda, huruf langsung mengecil dalam satu frame dan mata tidak sempat melihat perubahannya.",
          },
          {
            block: "set size to (100)%",
            warna: "#9966FF",
            fungsi: "Mengembalikan huruf ke ukuran semula.",
            alasan: "Ukuran harus selalu dikembalikan, kalau tidak huruf akan makin besar setiap kali diklik.",
          },
        ],
        codeTitle: "Tambahkan setelah blok warna:",
        code: `when this sprite clicked
set size to (140)%
wait (0.15) seconds
set size to (100)%`,
        tip: "Angka 140 dan 0,15 bisa dicoba-coba. Huruf yang lebih besar mungkin cukup 125%, huruf kecil bisa sampai 160%.",
      },
      {
        title: "Warna Berputar Tanpa Henti",
        goal: "Membuat warna huruf berputar terus selama proyek berjalan.",
        guide: [
          {
            block: "when flag clicked",
            warna: "#FFBF00",
            fungsi: "Menjalankan animasi warna begitu proyek dimulai.",
            alasan: "Animasi latar seperti ini sebaiknya berjalan sendiri, tanpa perlu diklik satu per satu.",
          },
          {
            block: "forever",
            warna: "#FFAB19",
            fungsi: "Mengulang blok di dalamnya selama proyek masih berjalan.",
            alasan: "Warna harus terus berputar; repeat biasa akan berhenti setelah jumlah tertentu.",
          },
          {
            block: "change [color v] effect by (5)",
            warna: "#9966FF",
            fungsi: "Menggeser warna sedikit di setiap putaran.",
            alasan: "Langkah kecil 5 membuat perpindahan warna terlihat halus, bukan berkedip.",
          },
          {
            block: "wait (0.1) seconds",
            warna: "#FFAB19",
            fungsi: "Memberi jeda di antara perubahan warna.",
            alasan: "Tanpa wait, forever berjalan sangat cepat sehingga warna berubah ribuan kali per detik dan terlihat acak.",
          },
        ],
        codeTitle: "Animasi latar di tiap huruf:",
        code: `when flag clicked
forever
change [color v] effect by (5)
wait (0.1) seconds
end`,
        tip: "Kalau semua huruf memakai jeda yang sama, warnanya bergerak serempak. Ubah angka wait sedikit di tiap huruf supaya terlihat lebih hidup.",
      },
      {
        title: "Huruf Melompat ke Posisi Acak",
        goal: "Memindahkan huruf ke tempat baru dengan glide dan posisi acak.",
        guide: [
          {
            block: "start sound [Coin v]",
            warna: "#CF63CF",
            fungsi: "Memutar bunyi koin sebagai tanda huruf mulai berpindah.",
            alasan: "Bunyi membantu pemain menyadari bahwa yang berubah bukan hanya posisi, tapi juga arah gerak huruf.",
          },
          {
            block: "glide (0.6) secs to x: (pick random (-180) to (180)) y: (pick random (-80) to (80))",
            warna: "#4C97FF",
            fungsi: "Menggeser huruf ke titik acak di dalam panggung dengan gerakan halus.",
            alasan: "Glide membuat perpindahan terlihat sebagai gerakan, sedangkan pick random membuat tujuan selalu berbeda setiap klik.",
          },
        ],
        codeTitle: "Ganti skrip klik dengan yang ini:",
        code: `when this sprite clicked
start sound [Coin v]
glide (0.6) secs to x: (pick random (-180) to (180)) y: (pick random (-80) to (80))`,
        tip: "Batasi x sampai 180 dan y sampai 80 supaya huruf tidak keluar panggung. Huruf yang lebih besar butuh rentang yang lebih kecil.",
      },
      {
        title: "Ke Mana Huruf Bergerak?",
        goal: "Melihat bahwa move 10 steps menggeser sprite 10 satuan ke arah hadapnya, dan turn cw 15 degrees memutar arah hadap itu.",
        demo: "move-arrow",
        tip: "Gerak selalu mengikuti panah. Putar dulu arahnya dengan turn, lalu move akan melaju ke arah yang baru.",
      },
      {
        title: "Tantangan: Semua Huruf Bergoyang Bersamaan",
        goal: "Memicu seluruh nama dari satu huruf, lalu memberi jeda acak supaya gerakannya tidak seragam.",
        guide: [
          {
            block: "broadcast [go v] and wait",
            warna: "#FFBF00",
            fungsi: "Mengirim pesan go ke semua huruf, lalu menunggu sampai semuanya selesai bereaksi.",
            alasan: "Satu pemicu di satu huruf membuat seluruh nama bergerak pada saat yang sama, tanpa perlu mengklik tiap huruf.",
          },
          {
            block: "when I receive [go v]",
            warna: "#FFBF00",
            fungsi: "Membuat tiap huruf mulai bereaksi saat pesan go diterima.",
            alasan: "Pesan yang sama bisa didengar banyak sprite sekaligus; itulah cara Scratch menyinkronkan seluruh nama.",
          },
          {
            block: "wait (pick random (1) to (3)) seconds",
            warna: "#FFAB19",
            fungsi: "Memberi jeda acak sebelum huruf bergerak.",
            alasan: "Tanpa jeda acak, semua huruf bergerak serempak dan terlihat seperti satu blok besar, bukan nama yang bergoyang.",
          },
          {
            block: "change [color v] effect by (25)",
            warna: "#9966FF",
            fungsi: "Mengubah warna huruf sebagai reaksi terhadap pesan go.",
            alasan: "Reaksi yang sama di tiap huruf membuat nama tetap terbaca sebagai satu kesatuan meskipun geraknya berbeda-beda.",
          },
        ],
        tip: "Tambahkan turn cw (15) degrees lalu turn ccw (15) degrees di sekitar perubahan warna supaya huruf bergoyang tanpa miring permanen. Kirim pesan go dari tombol atau dari huruf pertama saat diklik.",
      },
    ],
  },
  {
    id: "catch-apple",
    title: "Catch Apple",
    desc: "Tangkap apel yang jatuh dengan keranjang: gerakkan keranjang dengan panah, kumpulkan skor, dan jaga nyawa tetap tersisa.",
    level: "Pemula",
    minutes: 60,
    goals: [
      "Menyiapkan sprite, latar, suara, dan kotak angka sebelum menulis kode.",
      "Membuat apel jatuh terus di tempat yang berubah-ubah.",
      "Menggerakkan keranjang dengan panah dan berhenti di pinggir panggung.",
      "Memakai kotak angka skor dan nyawa sebagai aturan permainan.",
      "Menghentikan permainan dengan pesan dan stop all.",
    ],
    sections: [],
    castTitle: "Sprite dan latar permainan",
    cast: [
      { name: "Apple", image: "sprites/apple.svg" },
      { name: "Bowl", image: "sprites/bowl.svg" },
      { name: "Game Over", image: "sprites/game-over.svg" },
    ],
    backdrop: { name: "Blue Sky", image: "backdrops/blue-sky.svg" },
    embedUrl: "https://scratch.mit.edu/projects/1317982616/embed",
    flow: catchAppleFlow,
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
