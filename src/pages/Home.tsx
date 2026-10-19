import { For, type Component } from "solid-js";
import { tutorials } from "../data/tutorials";
import { trickCards } from "../data/tricks";

const Home: Component = () => (
  <div class="mx-auto max-w-5xl px-4 py-8">
    <section class="border-2 border-black bg-white p-6 md:p-8">
      <p class="text-xs font-bold uppercase tracking-widest">
        Bahasa Indonesia
      </p>
      <h1 class="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
        Daftar Tutorial Scratch
      </h1>
      <p class="mt-3 max-w-2xl text-sm leading-relaxed">
        Pilih satu tutorial untuk membuka halaman isinya, lengkap dengan
        contoh blok kode Scratch yang bisa langsung disusun.
      </p>
      <p class="mt-2 text-xs font-semibold">
        {tutorials.length} tutorial
      </p>
    </section>

    <a
      href="#/trick-cards"
      class="mt-6 block border-2 border-black bg-white p-5 transition-transform hover:-translate-y-0.5"
    >
      <p class="text-xs font-bold uppercase tracking-widest">
        Referensi cepat
      </p>
      <h2 class="mt-1 text-xl font-extrabold leading-snug">
        Kartu Trik Scratch
      </h2>
      <p class="mt-1 text-sm leading-relaxed">
        {trickCards.length} potongan blok siap pakai — gravitasi, clone, skor,
        tombol, dan lain-lain. Bisa dicari dengan kata kunci.
      </p>
      <span class="mt-3 inline-block border-b-2 border-black text-sm font-bold">
        Cari kartu trik →
      </span>
    </a>

    <ol class="mt-6 grid gap-4 md:grid-cols-2">
      <For each={tutorials}>
        {(t, i) => (
          <li>
            <a
              href={`#/tutorial/${t.id}`}
              class="block h-full border-2 border-black bg-white p-5 transition-transform hover:-translate-y-0.5"
            >
              <div class="flex items-start justify-between gap-3">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-black text-base font-extrabold">
                  {i() + 1}
                </span>
                <span class="rounded-full border border-black px-2 py-0.5 text-[11px] font-bold">
                  {t.level}
                </span>
              </div>
              <h2 class="mt-3 text-xl font-extrabold leading-snug">
                {t.title}
              </h2>
              <p class="mt-1 text-sm leading-relaxed">{t.desc}</p>
              <p class="mt-3 text-xs font-semibold">
                {t.sections.length} materi • ±{t.minutes} menit
              </p>
              <span class="mt-3 inline-block border-b-2 border-black text-sm font-bold">
                Buka tutorial →
              </span>
            </a>
          </li>
        )}
      </For>
    </ol>
  </div>
);

export default Home;
