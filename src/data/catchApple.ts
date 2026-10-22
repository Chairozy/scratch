import type { ProjectFlow } from "./flow";

export const catchAppleFlow: ProjectFlow = {
  intro:
    "Kita bikin permainan tangkap apel. Apel jatuh dari langit. Kamu pegang keranjang, geser ke kiri atau ke kanan. Apel yang masuk keranjang bikin skor tambah satu. Apel yang lewat bikin nyawa kurang satu. Kalau nyawa habis, permainan selesai.",
  understandQuiz: [
    {
      id: "paham-1",
      prompt: "Apa yang bikin apel datang terus-terusan?",
      options: [
        { id: "a", label: "forever", blok: "forever\nend" },
        { id: "b", label: "wait 1 detik", blok: "wait (1) seconds" },
        { id: "c", label: "ganti latar", blok: "switch backdrop to [Blue Sky v]" },
      ],
      answer: "a",
      salah: "Lihat blok yang mengulang. Tanpa blok itu, apel cuma jatuh sekali.",
      benar: "Iya! forever bikin apel balik ke atas lalu jatuh lagi.",
    },
    {
      id: "paham-2",
      prompt: "Kalau apel masuk keranjang, skornya jadi apa?",
      options: [
        { id: "a", label: "Skor kurang satu" },
        { id: "b", label: "Skor tambah satu" },
        { id: "c", label: "Skor tetap, cuma ada bunyi" },
      ],
      answer: "b",
      salah: "Apel masuk keranjang itu berhasil, jadi skormu tambah.",
      benar: "Iya! Skor tambah satu.",
    },
  ],
  prepare: {
    roadmap: [
      {
        title: "Apel jatuh",
        goal: "Apel muncul di langit, lalu turun pelan-pelan sampai bawah.",
      },
      {
        title: "Keranjang bisa digeser",
        goal: "Kamu tekan panah kiri atau kanan, keranjang ikut geser.",
      },
      {
        title: "Apel datang lagi",
        goal: "Apel yang sudah lewat balik ke atas di tempat lain.",
      },
      {
        title: "Skor dan nyawa",
        goal: "Apel masuk keranjang, skor tambah. Apel lewat, nyawa kurang.",
      },
      {
        title: "Permainan selesai",
        goal: "Kalau nyawa habis, tulisan GAME OVER muncul dan semuanya berhenti.",
      },
    ],
    setup: [
      "Buang sprite Kucing. Ambil sprite Apple di Food dan Bowl di Things.",
      "Bikin sprite baru bernama Game Over. Gambar tulisan GAME OVER warna merah.",
      "Pilih backdrop Blue Sky supaya ada langit.",
      "Tambah suara Chomp untuk apel yang masuk keranjang, dan Lose untuk nyawa yang habis.",
      "Bikin kotak angka skor mulai 0 dan nyawa mulai 3. Tampilkan dua-duanya di panggung.",
      "Taruh Bowl di x 0 y -140. Taruh Game Over di tengah dan sembunyikan dulu.",
      "Atur ukuran: Apple 60, Bowl 80, Game Over 100.",
    ],
    roles: [
      {
        name: "Apple",
        image: "sprites/apple.svg",
        role: "Apel yang jatuh. Dia yang tahu apel masuk keranjang atau lewat.",
      },
      {
        name: "Bowl",
        image: "sprites/bowl.svg",
        role: "Keranjangmu. Kamu geser pakai panah. Dia yang menyentuh apel.",
      },
      {
        name: "Game Over",
        image: "sprites/game-over.svg",
        role: "Tulisan penutup. Muncul kalau nyawa habis, lalu semua berhenti.",
      },
      {
        name: "Blue Sky",
        image: "backdrops/blue-sky.svg",
        role: "Langit tempat apel jatuh. Cuma latar, tidak mengatur permainan.",
      },
    ],
    quiz: [
      {
        id: "siap-1",
        prompt: "Siapa yang menyentuh apel?",
        options: [
          { id: "a", label: "Bowl" },
          { id: "b", label: "Game Over" },
          { id: "c", label: "Blue Sky" },
        ],
        answer: "a",
        salah: "Yang kena apel itu keranjang.",
        benar: "Iya! Bowl yang kena apel.",
      },
      {
        id: "siap-2",
        prompt: "Kapan nyawa berkurang?",
        options: [
          { id: "a", label: "Apel masuk keranjang" },
          { id: "b", label: "Apel lewat ke bawah" },
          { id: "c", label: "Latar berganti" },
        ],
        answer: "b",
        salah: "Nyawa berkurang kalau apel lolos ke bawah.",
        benar: "Iya! Apel yang lewat bikin nyawa kurang.",
      },
      {
        id: "siap-3",
        prompt: "Kenapa tulisan GAME OVER disembunyikan dulu?",
        options: [
          { id: "a", label: "Supaya tidak menutupi permainan" },
          { id: "b", label: "Supaya apel berhenti" },
          { id: "c", label: "Supaya latar berganti" },
        ],
        answer: "a",
        salah: "Tulisan itu cuma perlu muncul di akhir.",
        benar: "Iya! Dia muncul nanti, saat permainan selesai.",
      },
    ],
  },
  paths: [
    {
      id: "path-1",
      title: "Apel jatuh dari atas",
      goal: "Apel muncul di langit, lalu turun sampai bawah.",
      recall: "Yang dipakai cuma sprite Apple. Keranjang belum jalan.",
      roleRefs: ["Apple"],
      cerita:
        "Apel mulai dari atas langit. Saat green flag diklik, apel pindah ke tengah atas, lalu kelihatan. Apel turun sedikit-sedikit. Saat sudah sampai bawah, apel berhenti turun, lalu disembunyikan.",
      codeTitle: "Kode apel jatuh",
      code: `when green flag clicked
go to x: (0) y: (170)
show
repeat until <(y position) < (-150)>
  change y by (-5)
end
hide`,
      tip: "Angka -5 itu kecepatan turun. Makin besar angkanya, makin cepat apel jatuh.",
      quiz: [
        {
          id: "p1-1",
          prompt: "Blok mana yang bikin apel turun sedikit-sedikit?",
          options: [
            { id: "a", label: "change y by (-5)", blok: "change y by (-5)" },
            { id: "b", label: "go to x 0 y 170", blok: "go to x: (0) y: (170)" },
            { id: "c", label: "hide", blok: "hide" },
          ],
          answer: "a",
          salah: "Lihat blok yang mengubah posisi tiap putaran.",
          benar: "Iya! change y by -5 bikin y berkurang, jadi apel turun.",
        },
        {
          id: "p1-2",
          prompt: "Kapan apel berhenti turun?",
          options: [
            { id: "a", label: "Saat apel kena keranjang" },
            { id: "b", label: "Saat y position kurang dari -150" },
            { id: "c", label: "Setelah 5 detik" },
          ],
          answer: "b",
          salah: "Keranjang belum dipakai. Yang menghentikan apel itu posisi y.",
          benar: "Iya! Apel berhenti saat sudah lewat batas bawah.",
        },
      ],
    },
    {
      id: "path-2",
      title: "Keranjang jalan ke kiri dan kanan",
      goal: "Keranjang bisa digeser pakai panah.",
      recall: "Yang dipakai sprite Bowl. Keranjang berjalan saat tombol panah ditekan.",
      roleRefs: ["Bowl"],
      cerita:
        "Keranjang digeser pakai panah. Kalau panah kiri ditekan, keranjang jalan ke kiri. Kalau panah kanan ditekan, keranjang jalan ke kanan.",
      codeTitle: "Kode keranjang",
      code: `when [left arrow v] key pressed
change x by (-15)
when [right arrow v] key pressed
change x by (15)`,
      tip: "Panah kiri bikin keranjang ke kiri, panah kanan bikin keranjang ke kanan.",
      quiz: [
        {
          id: "p2-1",
          prompt: "Apa yang bikin keranjang jalan?",
          options: [
            {
              id: "a",
              label: "when left arrow key pressed",
              blok: "when [left arrow v] key pressed",
            },
            { id: "b", label: "forever", blok: "forever\nend" },
            { id: "c", label: "wait 0.2 detik", blok: "wait (0.2) seconds" },
          ],
          answer: "a",
          salah: "Keranjang jalan karena kamu pencet panah, bukan karena blok ulang.",
          benar: "Iya! Tombol panah yang bikin keranjang jalan.",
        },
        {
          id: "p2-2",
          prompt: "Kalau tombol panah tidak ditekan, keranjang gimana?",
          options: [
            { id: "a", label: "Berjalan sendiri" },
            { id: "b", label: "Diam di tempat" },
            { id: "c", label: "Jatuh ke bawah" },
          ],
          answer: "b",
          salah: "Keranjang cuma bergerak kalau kamu pencet panah.",
          benar: "Iya! Kalau tidak ditekan, keranjang diam di tempat.",
        },
      ],
    },
    {
      id: "path-3",
      title: "Apel datang lagi dari tempat lain",
      goal: "Apel yang sudah lewat balik ke atas di tempat acak.",
      recall:
        "Yang dipakai sprite Apple. pick random yang memilih tempat apel berikutnya.",
      roleRefs: ["Apple"],
      cerita:
        "Sekarang apel datang terus. Apel muncul di tempat acak, lalu jatuh. Saat sampai bawah, apel sembunyi sebentar, lalu muncul lagi di tempat lain. Begitu terus, tidak berhenti.",
      codeTitle: "Kode apel berulang",
      code: `when green flag clicked
+forever
  go to x: (pick random (-200) to (200)) y: (170)
  show
  repeat until <(y position) < (-150)>
    change y by (-5)
  end
  hide
+wait (0.2) seconds
end`,
      catatanKode: "Blok bergaris tebal adalah blok baru.",
      tip: "pick random bikin tempat apel selalu berubah, jadi kamu tidak bisa menebak.",
      quiz: [
        {
          id: "p3-1",
          prompt: "pick random (-200) to (200) dipakai untuk apa?",
          options: [
            { id: "a", label: "Ngatur tinggi apel" },
            { id: "b", label: "Ngatur posisi kiri-kanan apel" },
            { id: "c", label: "Ngatur jumlah apel" },
          ],
          answer: "b",
          salah: "Blok itu isi bagian x di blok go to.",
          benar: "Iya! Angka acak jadi posisi x, jadi apel datang dari tempat berbeda.",
        },
        {
          id: "p3-2",
          prompt: "Kenapa ada wait 0.2 seconds sesudah hide?",
          options: [
            { id: "a", label: "Biar ada jeda sebelum apel muncul lagi" },
            { id: "b", label: "Biar apel jatuh lebih cepat" },
            { id: "c", label: "Biar skor tambah" },
          ],
          answer: "a",
          salah: "Jeda itu bikin apel tidak muncul terlalu cepat.",
          benar: "Iya! Jeda sebentar bikin permainan enak dilihat.",
        },
      ],
    },
    {
      id: "path-4",
      title: "Skor dan nyawa",
      goal: "Apel masuk keranjang, skor tambah. Apel lewat, nyawa kurang.",
      recall:
        "Yang dipakai sprite Apple dan Bowl, plus kotak angka skor dan nyawa.",
      roleRefs: ["Apple", "Bowl"],
      cerita:
        "Saat mulai, skor jadi 0 dan nyawa jadi 3. Apel muncul di tempat acak, lalu turun. Kalau apel kena keranjang, skor tambah satu dan ada bunyi Chomp. Kalau apel lewat, nyawa kurang satu dan ada bunyi Lose. Kalau nyawa sudah 0, apel mengirim pesan game over.",
      codeTitle: "Kode skor dan nyawa",
      code: `when green flag clicked
+set [skor v] to (0)
+set [nyawa v] to (3)
forever
  go to x: (pick random (-200) to (200)) y: (170)
  show
  repeat until <<(y position) < (-150)> or <touching [Bowl v]?>>
    change y by (-5)
  end
+  if <touching [Bowl v]?> then
+    change [skor v] by (1)
+    start sound [Chomp v]
+  else
+    change [nyawa v] by (-1)
+    start sound [Lose v]
+    if <(nyawa) = (0)> then
+      broadcast [game over v]
+    end
+  end
  hide
  wait (0.2) seconds
end`,
      catatanKode: "Blok bergaris tebal adalah blok baru.",
      tip: "repeat until berhenti kalau apel kena keranjang atau lewat. if yang memilih: dapat skor atau kehilangan nyawa.",
      quiz: [
        {
          id: "p4-1",
          prompt: "Blok mana yang mengecek apel masuk keranjang?",
          options: [
            { id: "a", label: "touching Bowl?", blok: "<touching [Bowl v]?>" },
            {
              id: "b",
              label: "pick random",
              blok: "(pick random (-200) to (200))",
            },
            { id: "c", label: "wait 0.2 detik", blok: "wait (0.2) seconds" },
          ],
          answer: "a",
          salah: "Apel masuk keranjang berarti apel menyentuh keranjang.",
          benar: "Iya! touching Bowl yang bikin skor tambah.",
        },
        {
          id: "p4-2",
          prompt: "Kalau nyawa jadi 0, apa yang terjadi?",
          options: [
            { id: "a", label: "Apel berhenti selamanya" },
            { id: "b", label: "Kirim pesan game over" },
            { id: "c", label: "Langit jadi malam" },
          ],
          answer: "b",
          salah: "Yang menutup permainan itu pesan untuk tulisan GAME OVER.",
          benar: "Iya! Pesan game over bikin tulisan GAME OVER muncul.",
        },
      ],
    },
    {
      id: "path-5",
      title: "Tulisan GAME OVER muncul",
      goal: "Kalau nyawa habis, tulisan GAME OVER muncul dan semua berhenti.",
      recall:
        "Yang dipakai sprite Game Over dan Apple, ditambah kotak angka nyawa.",
      roleRefs: ["Game Over", "Apple"],
      cerita:
        "Tulisan GAME OVER sembunyi dulu saat mulai. Saat dapat pesan game over, tulisan itu muncul. Semua gerakan langsung berhenti, jadi permainan selesai.",
      codeTitle: "Kode game over",
      code: `when green flag clicked
hide

when I receive [game over v]
show
stop [all v]`,
      tip: "stop all menghentikan semua sprite sekaligus. stop this script cuma menghentikan satu.",
      quiz: [
        {
          id: "p5-1",
          prompt: "Kapan tulisan GAME OVER muncul?",
          options: [
            { id: "a", label: "Saat green flag diklik" },
            { id: "b", label: "Saat dapat pesan game over" },
            { id: "c", label: "Tiap apel jatuh" },
          ],
          answer: "b",
          salah: "Tulisan ini menunggu pesan, bukan menunggu klik panah.",
          benar: "Iya! Dia menunggu pesan game over.",
        },
        {
          id: "p5-2",
          prompt: "Blok mana yang menghentikan semua?",
          options: [
            { id: "a", label: "stop all", blok: "stop [all v]" },
            { id: "b", label: "hide", blok: "hide" },
            {
              id: "c",
              label: "ganti latar",
              blok: "switch backdrop to [Blue Sky v]",
            },
          ],
          answer: "a",
          salah: "stop all berlaku untuk semua sprite.",
          benar: "Iya! Semua gerakan berhenti, jadi permainan selesai.",
        },
      ],
    },
  ],
  test: {
    message:
      "Semua langkah sudah selesai. Mainkan permainanmu dari awal sampai GAME OVER. Habis itu, jawab pertanyaan ini.",
    quiz: [
      {
        id: "tes-1",
        prompt: "Apa yang bikin apel terus muncul?",
        options: [
          { id: "a", label: "forever", blok: "forever\nend" },
          { id: "b", label: "touching Bowl?", blok: "<touching [Bowl v]?>" },
          { id: "c", label: "stop all", blok: "stop [all v]" },
        ],
        answer: "a",
        salah: "Yang mengulang itu blok forever di kode apel.",
        benar: "Iya! forever bikin apel balik ke atas terus.",
      },
        {
          id: "tes-2",
          prompt: "Kalau kamu tekan panah kiri, keranjang kemana?",
          options: [
            { id: "a", label: "Ke kiri" },
            { id: "b", label: "Ke kanan" },
            { id: "c", label: "Diam di tempat" },
          ],
          answer: "a",
          salah: "Panah kiri bikin keranjang ke kiri.",
          benar: "Iya! Keranjang bergerak ke kiri.",
        },
      {
        id: "tes-3",
        prompt: "Kenapa skor dan nyawa disimpan di kotak angka (variabel)?",
        options: [
          {
            id: "a",
            label: "Karena angkanya berubah dan dipakai untuk memilih",
          },
          { id: "b", label: "Karena kotak angka bikin latar berubah" },
          { id: "c", label: "Karena kotak angka menghapus suara" },
        ],
        answer: "a",
        salah: "Kotak angka menyimpan angka yang berubah dan bisa dibandingkan.",
        benar: "Iya! Kode bisa menambah, mengurangi, dan membandingkan angkanya.",
      },
    ],
  },
};
