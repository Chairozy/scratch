import { For, Show, createMemo, createSignal, type Component } from "solid-js";
import ScratchBlocks from "../components/ScratchBlocks";
import {
  searchTricks,
  trickCards,
  trickCategories,
  type TrickCard,
} from "../data/tricks";

const TrickCardItem: Component<{ card: TrickCard }> = (props) => (
  <article class="flex h-full flex-col border-2 border-black bg-white p-4">
    <div class="flex items-center justify-between gap-2">
      <span class="rounded-full border border-black px-2 py-0.5 text-[11px] font-bold">
        {props.card.kategori}
      </span>
      <Show when={props.card.tutorialId}>
        <a
          href={`#/tutorial/${props.card.tutorialId}`}
          class="text-[11px] font-bold underline underline-offset-2"
        >
          lihat tutorial →
        </a>
      </Show>
    </div>

    <h3 class="mt-2 text-lg font-extrabold leading-snug">
      {props.card.title}
    </h3>
    <p class="mt-1 text-sm leading-relaxed">{props.card.fungsi}</p>

    <div class="mt-3">
      <ScratchBlocks code={props.card.code} scale={0.7} />
    </div>

    <Show when={props.card.tip}>
      <p class="mt-3 border-t border-dashed border-black pt-2 text-xs leading-relaxed">
        {props.card.tip}
      </p>
    </Show>

    <p class="mt-auto pt-3 text-[11px] font-semibold text-neutral-700">
      {props.card.tags.map((t) => `#${t}`).join("  ")}
    </p>
  </article>
);

const TrickCards: Component = () => {
  const [query, setQuery] = createSignal("");
  const [kategori, setKategori] = createSignal<string | null>(null);

  const hasil = createMemo(() =>
    searchTricks(trickCards, query(), kategori()),
  );

  return (
    <div class="mx-auto max-w-5xl px-4 py-8">
      <section class="border-2 border-black bg-white p-6 md:p-8">
        <p class="text-xs font-bold uppercase tracking-widest">
          Bahasa Indonesia
        </p>
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          Kartu Trik Scratch
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-relaxed">
          Kumpulan potongan blok kode siap pakai. Ketik kata kunci untuk
          mencari trik berdasarkan nama, fungsi, atau isi bloknya.
        </p>
        <p class="mt-2 text-xs font-semibold">
          {trickCards.length} kartu trik
        </p>
      </section>

      <div class="print-hidden mt-6 flex flex-col gap-3">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label class="relative flex-1">
            <span class="sr-only">Cari kartu trik</span>
            <input
              type="search"
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
              placeholder="Cari trik... misal: gravitasi, clone, skor, tombol"
              class="w-full border-2 border-black bg-white px-3 py-2 text-sm font-semibold outline-none placeholder:font-normal placeholder:text-neutral-500 focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </label>
          <Show when={query()}>
            <button
              type="button"
              onClick={() => setQuery("")}
              class="border-2 border-black bg-white px-3 py-2 text-sm font-bold hover:bg-neutral-100"
            >
              Hapus
            </button>
          </Show>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setKategori(null)}
            aria-pressed={kategori() === null}
            class={`border-2 border-black px-3 py-1 text-xs font-bold ${
              kategori() === null ? "bg-black text-white" : "bg-white"
            }`}
          >
            Semua
          </button>
          <For each={trickCategories}>
            {(k) => (
              <button
                type="button"
                onClick={() => setKategori(kategori() === k ? null : k)}
                aria-pressed={kategori() === k}
                class={`border-2 border-black px-3 py-1 text-xs font-bold ${
                  kategori() === k ? "bg-black text-white" : "bg-white"
                }`}
              >
                {k}
              </button>
            )}
          </For>
        </div>

        <p class="text-xs font-semibold">
          Menampilkan {hasil().length} dari {trickCards.length} kartu
          <Show when={kategori()}> {`• kategori ${kategori()}`}</Show>
          <Show when={query()}> {`• pencarian "${query()}"`}</Show>
        </p>
      </div>

      <Show
        when={hasil().length > 0}
        fallback={
          <p class="mt-6 border-2 border-dashed border-black bg-white p-6 text-sm font-semibold">
            Tidak ada kartu trik yang cocok. Coba kata kunci lain atau pilih
            tombol Semua.
          </p>
        }
      >
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <For each={hasil()}>{(c) => <TrickCardItem card={c} />}</For>
        </div>
      </Show>
    </div>
  );
};

export default TrickCards;
