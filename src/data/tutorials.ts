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
  codeTitle: string;
  /** Kode sintaks scratchblocks (blok berbahasa Inggris). */
  code: string;
  /** Tips singkat. */
  tip: string;
}

export interface SpriteCast {
  name: string;
  image: string;
  x?: number;
  y?: number;
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
            block: "go to x: (-120) y: (60)",
            warna: "#4C97FF",
            fungsi: "Menempatkan cat di kiri atas panggung.",
            alasan: "Posisi awal yang di atas memberi ruang jatuh, sehingga pemain langsung paham bahwa ada gravitasi.",
          },
        ],
        codeTitle: "Susun blok seperti ini (di sprite Cat):",
        code: `when flag clicked
switch backdrop to [Blue Sky 2 v]
set [velocity y v] to [0]
go to x: (-120) y: (60)`,
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
            block: "change [velocity y v] by (-0.5)",
            warna: "#FF8C1A",
            fungsi: "Mengurangi kecepatan vertikal sebesar 0.5 setiap putaran.",
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
change [velocity y v] by (-0.5)
change y by (velocity y)
end`,
        tip: "Klik bendera lalu lihat cat jatuh perlahan. Kalau masih terlalu cepat, ubah -0.5 menjadi -0.3.",
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
            block: "set [velocity y v] to [8]",
            warna: "#FF8C1A",
            fungsi: "Melemparkan cat ke atas dengan kecepatan 8.",
            alasan: "Nilai 8 cukup besar untuk menandingi gravitasi, jadi cat terlihat meloncat tinggi sebelum jatuh lagi.",
          },
        ],
        codeTitle: "Tambahkan di dalam forever (skrip Cat):",
        code: `forever
change [velocity y v] by (-0.5)
change y by (velocity y)
if <touching [Paddle v]?> then
set [velocity y v] to [8]
end
end`,
        tip: "Uji dengan cara menjatuhkan cat tepat di atas paddle — cat harus memantul naik sendiri.",
      },
      {
        title: "Bergerak Hanya ke Kiri dan ke Kanan",
        goal: "Mengendalikan cat dengan panah kiri dan kanan tanpa mengganggu gravitasi.",
        guide: [
          {
            block: "when [right arrow v] key pressed",
            warna: "#FFBF00",
            fungsi: "Menjalankan skrip saat tombol panah kanan ditekan.",
            alasan: "Tombol panah adalah pilihan paling alami untuk game lompat; tidak perlu menambah tombol lain.",
          },
          {
            block: "change x by (6)",
            warna: "#4C97FF",
            fungsi: "Menggeser cat ke kanan enam langkah.",
            alasan: "Angka 6 membuat perpindahan terasa cepat tetapi masih bisa diarahkan dengan tepat.",
          },
          {
            block: "change x by (-6)",
            warna: "#4C97FF",
            fungsi: "Menggeser cat ke kiri saat panah kiri ditekan.",
            alasan: "Mengubah X saja berarti pemain sama sekali tidak bisa menambah ketinggian — gerakan tetap terbatas kiri-kanan.",
          },
        ],
        codeTitle: "Buat dua skrip terpisah (keduanya di sprite Cat):",
        code: `when [right arrow v] key pressed
change x by (6)

when [left arrow v] key pressed
change x by (-6)`,
        tip: "Jangan pernah mengubah Y di skrip ini, karena ketinggian cat sepenuhnya diatur oleh gravitasi dan lonjakan.",
      },
      {
        title: "Tiga Paddle di Awal Layar",
        goal: "Membuat tiga paddle pertama di x -180, -20, dan 140 memakai repeat 3.",
        guide: [
          {
            block: "when flag clicked",
            warna: "#FFBF00",
            fungsi: "Menjalankan skrip paddle saat game dimulai.",
            alasan: "Paddle harus mulai mencetak clone bersamaan dengan cat mulai jatuh, bukan setelah pemain menekan tombol lain.",
          },
          {
            block: "go to x: (-180) y: (pick random (0) to (-160))",
            warna: "#4C97FF",
            fungsi: "Menempatkan paddle induk di titik awal paling kiri dengan ketinggian acak.",
            alasan: "Paddle induk dipakai sebagai pencetak clone, jadi posisinya menentukan di mana clone muncul.",
          },
          {
            block: "repeat (3)",
            warna: "#FFAB19",
            fungsi: "Mengulang pembuatan clone sebanyak tiga kali untuk tiga paddle awal.",
            alasan: "Ketiga paddle awal punya skrip yang sama persis, jadi cukup ditulis satu kali lalu diulang tiga kali.",
          },
          {
            block: "create clone of [myself v]",
            warna: "#FFAB19",
            fungsi: "Memunculkan salinan paddle tepat di posisi induk saat itu.",
            alasan: "Clone selalu lahir di tempat induknya berada — itulah cara mengatur posisi awal tanpa menulis koordinat satu per satu.",
          },
          {
            block: "change x by (160)",
            warna: "#4C97FF",
            fungsi: "Memindahkan induk ke titik awal berikutnya, 160 langkah ke kanan.",
            alasan: "Dari -180 bergeser 160 menjadi -20, lalu menjadi 140 — jarak 160 adalah selisih ketiga titik yang diminta.",
          },
          {
            block: "set y to (pick random (0) to (-160))",
            warna: "#4C97FF",
            fungsi: "Memberi ketinggian baru sebelum clone berikutnya dibuat.",
            alasan: "Tanpa ini, ketiga paddle awal akan berbaris rata pada ketinggian yang sama dan terlalu mudah dilewati.",
          },
          {
            block: "hide",
            warna: "#9966FF",
            fungsi: "Menyembunyikan paddle induk, hanya clone-nya yang tampil.",
            alasan: "Clone mewarisi sifat tersembunyi dari induknya, jadi induk harus disembunyikan lebih dulu sebelum mencetak clone.",
          },
        ],
        codeTitle: "Buat skrip baru di sprite Paddle:",
        code: `when flag clicked
go to x: (-180) y: (pick random (0) to (-160))
repeat (3)
create clone of [myself v]
change x by (160)
set y to (pick random (0) to (-160))
end
hide`,
        tip: "Klik bendera dan hitung: harus ada tepat tiga paddle yang langsung meluncur dari kiri, tengah, dan kanan.",
      },
      {
        title: "Paddle Baru Muncul Terus",
        goal: "Mencetak paddle baru dari sisi kanan setiap satu detik, lalu menghapusnya saat keluar layar.",
        guide: [
          {
            block: "go to x: (250) y: (pick random (0) to (-160))",
            warna: "#4C97FF",
            fungsi: "Memindahkan induk ke luar sisi kanan panggung sebelum mulai mencetak.",
            alasan: "X 250 berada di luar layar sehingga paddle terlihat benar-benar masuk dari kanan, bukan muncul tiba-tiba.",
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
change [velocity y v] by (-0.5)
change y by (velocity y)
if <touching [Paddle v]?> then
set [velocity y v] to [8]
end
if <(y position) < (-165)> then
say [Game Over!] for (2) seconds
stop [all v]
end
end`,
        tip: "Setelah game over, klik bendera hijau untuk bermain lagi. Coba ubah nilai loncatan 8 menjadi 10 agar cat meloncat lebih tinggi.",
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
