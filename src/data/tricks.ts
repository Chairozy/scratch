export interface TrickCard {
  id: string;
  title: string;
  kategori: string;
  fungsi: string;
  code: string;
  tags: string[];
  tip?: string;
  tutorialId?: string;
}

export const trickCategories = [
  "Fisika",
  "Gerak",
  "Clone",
  "Variabel",
  "Input",
  "Kontrol",
  "Tampilan",
  "Teks",
];

export const trickCards: TrickCard[] = [
  {
    id: "gravitasi",
    title: "Gravitasi Sederhana",
    kategori: "Fisika",
    fungsi: "Membuat sprite jatuh makin cepat, seperti ditarik ke bawah oleh gravitasi.",
    code: `forever
change [velocity y v] by (-1)
change y by (velocity y)
end`,
    tags: ["gravitasi", "jatuh", "velocity", "fisika"],
    tip: "Maknanya: makin besar angkanya (misal -1 jadi -2), makin cepat sprite jatuh.",
    tutorialId: "cat-jump-right",
  },
  {
    id: "loncat-platform",
    title: "Melompat saat Menyentuh Platform",
    kategori: "Fisika",
    fungsi: "Sprite langsung meloncat otomatis begitu menempel pada paddle atau platform.",
    code: `if <touching [Paddle v]?> then
set [velocity y v] to [20]
end`,
    tags: ["lompat", "tabrakan", "platform", "touching"],
    tip: "Nilai 20 harus jauh lebih besar daripada gravitasi agar lonjakannya terlihat.",
    tutorialId: "cat-jump-right",
  },
  {
    id: "velocity-awal",
    title: "Menyiapkan Kecepatan Awal",
    kategori: "Fisika",
    fungsi: "Mengosongkan kecepatan vertikal sebelum permainan dimulai.",
    code: `when flag clicked
set [velocity y v] to [0]`,
    tags: ["velocity", "reset", "variabel", "awal"],
    tip: "Tanpa reset, sprite bisa tiba-tiba melesat saat game dimainkan ulang.",
  },
  {
    id: "teleport",
    title: "Pindah Instan ke Koordinat",
    kategori: "Gerak",
    fungsi: "Menempatkan sprite langsung di titik X dan Y tertentu tanpa animasi.",
    code: `go to x: (-180) y: (60)`,
    tags: ["koordinat", "posisi", "go to", "x y"],
    tip: "Titik (0, 0) adalah tengah panggung. X ke kanan, Y ke atas.",
  },
  {
    id: "glide",
    title: "Meluncur Halus",
    kategori: "Gerak",
    fungsi: "Memindahkan sprite secara halus dari posisi sekarang ke titik tujuan.",
    code: `glide (1) secs to x: (150) y: (-50)`,
    tags: ["glide", "animasi", "halus", "gerak"],
    tip: "Perbedaannya dengan go to: glide terlihat bergerak, go to langsung melompat.",
  },
  {
    id: "gerak-tombol",
    title: "Gerak Kiri-Kanan Ditahan",
    kategori: "Input",
    fungsi: "Menggeser sprite terus-menerus selama tombol panah ditahan pemain.",
    code: `forever
if <key [right arrow v] pressed?> then
change x by (6)
end
if <key [left arrow v] pressed?> then
change x by (-6)
end
end`,
    tags: ["tombol", "panah", "kontrol", "key pressed"],
    tip: "Pakai if key pressed di dalam forever agar gerakan berulang selama ditahan.",
    tutorialId: "cat-jump-right",
  },
  {
    id: "ikut-mouse",
    title: "Mengikuti Gerakan Mouse",
    kategori: "Gerak",
    fungsi: "Membuat sprite selalu menempel pada posisi kursor mouse.",
    code: `forever
go to [mouse-pointer v]
end`,
    tags: ["mouse", "kursor", "interaktif"],
    tip: "Ganti go to dengan glide ke mouse-pointer bila ingin gerakan yang lebih lembut.",
  },
  {
    id: "tepi-pantul",
    title: "Memantul di Tepi Panggung",
    kategori: "Gerak",
    fungsi: "Membalikkan arah sprite otomatis saat menyentuh tepi panggung.",
    code: `when flag clicked
forever
move (5) steps
if on edge, bounce
end`,
    tags: ["tepi", "pantul", "bounce", "dinding"],
    tip: "Sprite harus dalam posisi menghadap arah gerak agar pantulannya benar.",
  },
  {
    id: "clone-berulang",
    title: "Mencetak Clone Tiap Detik",
    kategori: "Clone",
    fungsi: "Memunculkan salinan sprite baru secara berkala tanpa henti.",
    code: `when flag clicked
forever
create clone of [myself v]
wait (1) seconds
end`,
    tags: ["clone", "spawner", "timer", "perulangan"],
    tip: "Tanpa wait, forever akan mencetak clone tanpa batas sampai game tersendat.",
    tutorialId: "cat-jump-right",
  },
  {
    id: "clone-jalan",
    title: "Clone Bergerak lalu Menghapus Diri",
    kategori: "Clone",
    fungsi: "Membuat setiap clone berjalan sendiri dan hilang setelah keluar layar.",
    code: `when I start as a clone
show
repeat until <(x position) < (-250)>
change x by (-8)
end
delete this clone`,
    tags: ["clone", "delete", "hapus", "bergerak"],
    tip: "Clone yang tidak dihapus akan menumpuk dan membuat game melambat.",
    tutorialId: "cat-jump-right",
  },
  {
    id: "clone-awal",
    title: "Beberapa Clone di Awal",
    kategori: "Clone",
    fungsi: "Membuat beberapa clone sekaligus di posisi berbeda sejak game dimulai.",
    code: `go to x: (-120) y: (pick random (0) to (-160))
repeat (2)
create clone of [myself v]
change x by (260)
set y to (pick random (0) to (-160))
end`,
    tags: ["clone", "awal", "repeat", "posisi"],
    tip: "Clone lahir di posisi induknya, jadi geser induk tiap putaran untuk mengatur sebarannya.",
    tutorialId: "cat-jump-right",
  },
  {
    id: "induk-sembunyi",
    title: "Menyembunyikan Induk, Menampilkan Clone",
    kategori: "Clone",
    fungsi: "Menyembunyikan sprite asli agar hanya clone-nya yang terlihat di panggung.",
    code: `when flag clicked
hide
forever
create clone of [myself v]
wait (1) seconds
end

when I start as a clone
show`,
    tags: ["clone", "hide", "show", "induk"],
    tip: "Clone mewarisi keadaan tersembunyi induk, jadi setiap clone wajib show sendiri.",
    tutorialId: "cat-jump-right",
  },
  {
    id: "skor",
    title: "Menambah Skor",
    kategori: "Variabel",
    fungsi: "Menyiapkan skor dari nol lalu menambahkannya setiap kali mengambil sesuatu.",
    code: `when flag clicked
set [skor v] to [0]
forever
if <touching [koin v]?> then
change [skor v] by (1)
wait (0.3) seconds
end
end`,
    tags: ["skor", "score", "variabel", "nilai"],
    tip: "Jeda wait mencegah skor bertambah berkali-kali dalam satu sentuhan.",
  },
  {
    id: "ask",
    title: "Bertanya ke Pemain",
    kategori: "Input",
    fungsi: "Menampilkan kotak pertanyaan, menunggu ketikan, lalu membaca jawabannya.",
    code: `ask [Tebak angka 1 sampai 10!] and wait
say (answer) for (2) seconds`,
    tags: ["bertanya", "ask", "input", "answer"],
    tip: "Kata and wait wajib ada, kalau tidak program lanjut sebelum pemain mengetik.",
    tutorialId: "guess-the-number",
  },
  {
    id: "jeda",
    title: "Jeda Sebelum Mulai",
    kategori: "Kontrol",
    fungsi: "Menahan jalannya skrip beberapa saat sebelum melanjutkan ke blok berikutnya.",
    code: `go to x: (250) y: (pick random (0) to (-160))
wait (0.5) seconds
forever
create clone of [myself v]
wait (1) seconds
end`,
    tags: ["wait", "jeda", "timing", "delay"],
    tip: "wait bisa memakai pecahan seperti 0.5 selama satuannya ditulis dalam detik.",
    tutorialId: "cat-jump-right",
  },
  {
    id: "ulang-n",
    title: "Ulangi Sebanyak N Kali",
    kategori: "Kontrol",
    fungsi: "Menjalankan isi blok tepat sebanyak angka yang ditentukan.",
    code: `repeat (3)
change size by (10)
wait (0.3) seconds
end`,
    tags: ["repeat", "perulangan", "loop"],
    tip: "Pakai repeat bila jumlah pengulangannya sudah pasti diketahui.",
  },
  {
    id: "ulang-sampai",
    title: "Ulangi Sampai Kondisi Tercapai",
    kategori: "Kontrol",
    fungsi: "Mengulang terus sampai suatu kondisi bernilai benar, lalu berhenti.",
    code: `repeat until <touching [Paddle v]?>
change y by (-3)
end`,
    tags: ["repeat until", "kondisi", "loop"],
    tip: "Isi blok dicek dulu; kalau kondisinya sudah benar sejak awal, isinya tidak dijalankan.",
  },
  {
    id: "ganti-latar",
    title: "Ganti Latar Panggung",
    kategori: "Tampilan",
    fungsi: "Mengganti backdrop panggung agar suasana proyek berubah.",
    code: `switch backdrop to [Blue Sky 2 v]`,
    tags: ["latar", "backdrop", "panggung", "suasana"],
    tip: "Bisa juga pakai next backdrop untuk berpindah ke latar berikutnya secara bergantian.",
  },
  {
    id: "ukuran",
    title: "Animasi Sprite Membesar",
    kategori: "Tampilan",
    fungsi: "Menumbuhkan sprite sedikit demi sedikit sehingga terlihat beranimasi.",
    code: `set size to (50) %
repeat (5)
change size by (10)
wait (0.3) seconds
end`,
    tags: ["ukuran", "size", "animasi", "tumbuh"],
    tip: "set size menentukan ukuran pasti, change size menambah atau mengurangi sedikit-sedikit.",
    tutorialId: "menyapa-hewan-manis",
  },
  {
    id: "game-over",
    title: "Pesan Game Over lalu Berhenti",
    kategori: "Kontrol",
    fungsi: "Mengakhiri permainan dengan pesan saat sprite jatuh melewati lantai.",
    code: `if <(y position) < (-165)> then
say [Game Over!] for (2) seconds
stop [all v]
end`,
    tags: ["game over", "kalah", "stop", "lantai"],
    tip: "stop all menghentikan semua skrip termasuk clone yang masih berjalan.",
    tutorialId: "cat-jump-right",
  },
  {
    id: "huruf-ke",
    title: "Mengambil Huruf ke-N dari Teks",
    kategori: "Teks",
    fungsi: "Mengambil satu huruf atau digit tertentu dari sebuah teks.",
    code: `set [posisi v] to (1)
repeat (5)
say (letter (posisi) of (answer)) for (1) seconds
change [posisi v] by (1)
end`,
    tags: ["teks", "letter", "digit", "huruf"],
    tip: "Posisi huruf mulai dari 1, bukan 0 — huruf pertama berarti posisi 1.",
    tutorialId: "encode-5-digit",
  },
  {
    id: "contains",
    title: "Mengecek Teks Mengandung Huruf",
    kategori: "Teks",
    fungsi: "Menguji apakah sebuah huruf ada di dalam teks, walaupun urutannya berbeda.",
    code: `if <(kode rahasia) contains (letter (posisi) of (answer))?> then
set [hasil v] to (join (hasil) [Q])
end`,
    tags: ["teks", "contains", "mengandung", "cek"],
    tip: "Cocok untuk cek angka benar tapi posisi salah, seperti nilai Q di game Encode.",
    tutorialId: "encode-5-digit",
  },
  {
    id: "join",
    title: "Merangkai Teks dengan Join",
    kategori: "Teks",
    fungsi: "Menyambung dua teks menjadi satu, misalnya menempelkan huruf ke kata.",
    code: `set [hasil v] to []
repeat (3)
set [hasil v] to (join (hasil) [O])
end
say (hasil) for (2) seconds`,
    tags: ["teks", "join", "gabung", "rangkai"],
    tip: "Mulai dari variabel kosong, lalu tempelkan potongan baru di ujungnya setiap putaran.",
    tutorialId: "encode-5-digit",
  },
];

export function searchTricks(kartu: TrickCard[], query: string, kategori: string | null): TrickCard[] {
  const q = query.trim().toLowerCase();
  return kartu.filter((k) => {
    if (kategori && k.kategori !== kategori) return false;
    if (!q) return true;
    const haystack = [k.title, k.fungsi, k.kategori, k.tags.join(" "), k.code].join(" ").toLowerCase();
    return q.split(/\s+/).every((part) => haystack.includes(part));
  });
}
