import { createEffect, createSignal, For, Show, type Component } from "solid-js";
import ScratchBlocks from "../components/ScratchBlocks";
import StageMap from "../components/StageMap";
import MoveArrowDemo from "../components/MoveArrowDemo";
import ProjectFlow from "../components/ProjectFlow";
import { exportTutorialPptx } from "../lib/exportPptx";
import { getTutorial, type BlockGuide, type TutorialQuiz } from "../data/tutorials";

interface TutorialProps {
  id: string;
}

const StepsList: Component<{ steps: string[] }> = (props) => (
  <>
    <h3 class="mt-4 text-sm font-extrabold uppercase tracking-wide">
      Langkah-langkah
    </h3>
    <ol class="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
      <For each={props.steps}>{(step) => <li>{step}</li>}</For>
    </ol>
  </>
);

function inkFor(hex: string): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.6 ? "#000" : "#fff";
}

const GuideList: Component<{ guide: BlockGuide[] }> = (props) => (
  <>
    <h3 class="mt-4 text-sm font-extrabold uppercase tracking-wide">
      Penggunaan blok
    </h3>
    <div class="mt-2 space-y-3 text-sm leading-relaxed">
      <For each={props.guide}>
        {(g) => (
          <p>
            <code
              class="px-1.5 py-0.5 font-mono text-[13px] font-bold"
              style={{
                background: g.warna,
                color: inkFor(g.warna),
              }}
            >
              {g.block}
            </code>{" "}
            {g.fungsi} {g.alasan}
          </p>
        )}
      </For>
    </div>
  </>
);

const SectionContent: Component<{
  guide: BlockGuide[] | undefined;
  steps: string[] | undefined;
}> = (props) => (
  <Show
    when={props.guide}
    fallback={<StepsList steps={props.steps ?? []} />}
  >
    {(guide) => <GuideList guide={guide()} />}
  </Show>
);

const Tutorial: Component<TutorialProps> = (props) => {
  const tutorial = () => getTutorial(props.id);

  const printNow = () => window.print();

  const [makingPptx, setMakingPptx] = createSignal(false);
  const downloadPptx = async () => {
    const tut = tutorial();
    if (!tut || makingPptx()) return;
    setMakingPptx(true);
    try {
      await exportTutorialPptx(tut);
    } finally {
      setMakingPptx(false);
    }
  };

  const [quizTerpilih, setQuizTerpilih] = createSignal<string[]>([]);
  const [quizSalah, setQuizSalah] = createSignal(false);
  const [quizLulus, setQuizLulus] = createSignal(false);

  createEffect(() => {
    props.id;
    setQuizTerpilih([]);
    setQuizSalah(false);
    setQuizLulus(false);
  });

  const toggleQuiz = (id: string) => {
    setQuizTerpilih((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    setQuizSalah(false);
  };

  const periksaQuiz = () => {
    const q = tutorial()?.quiz;
    if (!q) return;
    const picked = quizTerpilih();
    const lengkap = q.wajib.every((w) => picked.includes(w));
    const bersih = !picked.some((id) => q.terlarang.includes(id));
    if (lengkap && bersih) {
      setQuizLulus(true);
      setQuizSalah(false);
    } else {
      setQuizSalah(true);
    }
  };

  return (
    <Show
      when={tutorial()}
      fallback={
        <div class="mx-auto max-w-5xl px-4 py-10">
          <div class="border-2 border-black bg-white p-6">
            <h1 class="text-xl font-extrabold">Tutorial tidak ditemukan</h1>
            <p class="mt-2 text-sm">
              ID “{props.id}” tidak ada dalam daftar.
            </p>
            <a
              href="#/"
              class="mt-4 inline-block border-2 border-black px-4 py-2 text-sm font-bold"
            >
              ← Kembali ke Beranda
            </a>
          </div>
        </div>
      }
    >
      {(t) => {
        return (
          <div class="mx-auto max-w-5xl px-4 py-6">
            <Show when={t().flow}>
              {(flow) => <ProjectFlow tutorial={t()} flow={flow()} />}
            </Show>

            <Show when={!t().flow}>
            {/* ===== Pendahuluan permasalahan ===== */}
            <Show when={t().intro}>
              {(intro) => (
                <div class="print-hidden mx-auto mb-4 max-w-[210mm] border-2 border-black bg-white p-5 md:p-6">
                  <p class="text-xs font-bold uppercase tracking-widest">
                    Pendahuluan
                  </p>
                  <p class="mt-1 text-sm leading-relaxed">{intro()}</p>
                </div>
              )}
            </Show>

            {/* ===== Siluet blok sebagai tebak-tebakan ===== */}
            <Show when={t().teaserCode}>
              {(code) => (
                <div class="print-hidden mx-auto mb-4 max-w-[210mm] border-2 border-black bg-black p-5 text-white md:p-6">
                  <p class="text-xs font-bold uppercase tracking-widest text-neutral-400">
                    Tebak dulu
                  </p>
                  <p class="mt-1 text-sm leading-relaxed">
                    Ini siluet skrip yang akan kita susun. Coba tebak apa yang
                    dilakukan tiap blok sebelum membuka materi di bawah.
                  </p>
                  <div class="mt-3">
                    <ScratchBlocks code={code()} scale={0.9} />
                  </div>
                </div>
              )}
            </Show>

            {/* ===== Embed proyek di paling atas ===== */}
            <Show when={t().embedUrl}>
              {(url) => (
                <div class="print-hidden mx-auto mb-4 max-w-[210mm]">
                  <div class="border-2 border-black bg-white p-2">
                    <div class="aspect-[485/402] w-full">
                      <iframe
                        src={url()}
                        title={`Coba mainkan: ${t().title}`}
                        allowtransparency={true}
                        frameborder="0"
                        scrolling="no"
                        allowfullscreen
                        class="h-full w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Show>

            {/* ===== Soal pembuka: harus benar dulu sebelum materi terbuka ===== */}
            <Show when={t().quiz}>
              {(q) => (
                <section class="print-hidden mx-auto mb-4 max-w-[210mm] border-2 border-black bg-white p-5 md:p-6">
                  <p class="text-xs font-bold uppercase tracking-widest">
                    Soal pembuka
                  </p>
                  <h2 class="mt-1 text-lg font-extrabold leading-snug">
                    {q().prompt}
                  </h2>
                  <p class="mt-1 text-xs">
                    Benar bila semua bagian wajib sudah dipilih dan tidak ada
                    pilihan yang salah.
                  </p>

                  <For each={q().grup}>
                    {(g) => (
                      <div class="mt-3">
                        <p class="text-xs font-bold uppercase tracking-wide">
                          {g.judul}
                        </p>
                        <div class="mt-2 flex flex-wrap gap-2">
                          <For each={g.pilihan}>
                            {(p) => (
                              <button
                                type="button"
                                onClick={() => toggleQuiz(p.id)}
                                aria-pressed={quizTerpilih().includes(p.id)}
                                disabled={quizLulus()}
                                class={`border-2 border-black px-3 py-1.5 text-xs font-bold disabled:opacity-70 ${
                                  quizTerpilih().includes(p.id)
                                    ? "bg-black text-white"
                                    : "bg-white"
                                }`}
                              >
                                {p.label}
                              </button>
                            )}
                          </For>
                        </div>
                      </div>
                    )}
                  </For>

                  <div class="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={periksaQuiz}
                      disabled={quizLulus()}
                      class="border-2 border-black bg-black px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                    >
                      Periksa jawaban
                    </button>
                    <p class="text-xs font-semibold">
                      {quizTerpilih().length} pilihan dipilih
                    </p>
                  </div>

                  <Show when={quizSalah()}>
                    <p class="mt-3 border-l-4 border-black bg-neutral-100 p-3 text-sm">
                      <strong>Belum tepat.</strong> {q().petunjuk}
                    </p>
                  </Show>
                  <Show when={quizLulus()}>
                    <p class="mt-3 border-l-4 border-black bg-neutral-100 p-3 text-sm">
                      <strong>Benar!</strong> Materi tutorial terbuka di bawah.
                    </p>
                  </Show>
                </section>
              )}
            </Show>

            <Show when={!t().quiz || quizLulus()}>
              {/* Bilah aksi layar — disembunyikan saat print */}
              <div class="print-hidden mb-4 flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={downloadPptx}
                  disabled={makingPptx()}
                  class="border-2 border-black bg-white px-4 py-2 text-sm font-bold disabled:opacity-50"
                >
                  {makingPptx() ? "Membuat PPT..." : "Unduh PPT"}
                </button>
                <button
                  type="button"
                  onClick={printNow}
                  class="border-2 border-black bg-black px-4 py-2 text-sm font-bold text-white"
                >
                  Print / Simpan PDF
                </button>
            </div>

              {/* ===== Halaman 1: sampul + tujuan (1 lembar print) ===== */}
              <section class="print-page mx-auto max-w-[210mm] border-2 border-black bg-white p-6 md:p-8">
                <p class="text-xs font-bold uppercase tracking-widest">
                  Tutorial Scratch
                </p>
                <h1 class="mt-2 text-3xl font-extrabold tracking-tight">
                  {t().title}
                </h1>
                <p class="mt-2 text-sm leading-relaxed">{t().desc}</p>
                <p class="mt-2 text-xs font-semibold">
                  Level: {t().level} • ±{t().minutes} menit •{" "}
                  {t().sections.length} materi
                </p>
                <div class="mt-4 border-t-2 border-black pt-4">
                  <h2 class="text-sm font-extrabold uppercase tracking-wide">
                    Yang akan dipelajari
                  </h2>
                  <ol class="mt-2 list-decimal space-y-1 pl-5 text-sm">
                    <For each={t().goals}>{(g) => <li>{g}</li>}</For>
                  </ol>
                </div>
                <div class="mt-4 border-t-2 border-black pt-4">
                  <h2 class="text-sm font-extrabold uppercase tracking-wide">
                    Daftar materi
                  </h2>
                  <ol class="mt-2 list-decimal space-y-1 pl-5 text-sm">
                    <For each={t().sections}>
                      {(s) => <li>{s.title}</li>}
                    </For>
                  </ol>
                </div>
                <Show when={t().cast}>
                  {(cast) => (
                    <div class="mt-4 border-t-2 border-black pt-4">
                      <h2 class="text-sm font-extrabold uppercase tracking-wide">
                        {t().castTitle ?? "Kenalan dengan para hewan"}
                      </h2>
                      <ul class="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <For each={cast()}>
                          {(c) => (
                            <li class="border border-black bg-white p-2 text-center">
                              <img
                                src={c.image}
                                alt={c.name}
                                class="mx-auto h-20 w-auto"
                              />
                              <p class="mt-1 text-xs font-bold">{c.name}</p>
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  )}
                </Show>
                <Show when={t().backdrop}>
                  {(bd) => (
                    <div class="mt-4 border-t-2 border-black pt-4">
                      <h2 class="text-sm font-extrabold uppercase tracking-wide">
                        Latar panggung
                      </h2>
                      <div class="mx-auto mt-2 max-w-md border border-black p-2 text-center">
                        <img
                          src={bd().image}
                          alt={bd().name}
                          class="w-full"
                        />
                        <p class="mt-1 text-xs font-bold">{bd().name}</p>
                      </div>
                    </div>
                  )}
                </Show>
              </section>

              {/* ===== Tiap section = 1 lembar print ===== */}
              <For each={t().sections}>
                {(s, i) => (
                  <section class="print-page mx-auto mt-6 max-w-[210mm] border-2 border-black bg-white p-6 md:p-8">
                    <p class="text-xs font-bold uppercase tracking-widest">
                      {t().title}
                    </p>
                    <h2 class="mt-2 text-2xl font-extrabold tracking-tight">
                      {i() + 1}. {s.title}
                    </h2>

                    <Show when={s.map}>
                      <div class="mt-4">
                        <h3 class="text-sm font-extrabold uppercase tracking-wide">
                          Peta posisi di panggung
                        </h3>
                        <div class="mx-auto mt-2 max-w-md">
                          <StageMap
                            backdrop={t().backdrop?.image}
                            spots={(t().cast ?? []).flatMap((c) =>
                              c.x !== undefined && c.y !== undefined
                                ? [
                                    {
                                      name: c.name,
                                      image: c.image,
                                      x: c.x,
                                      y: c.y,
                                    },
                                  ]
                                : [],
                            )}
                          />
                        </div>
                      </div>
                    </Show>

                    <Show
                      when={t().layout === "two-col"}
                      fallback={
                        <>
                          <p class="mt-2 border border-black bg-neutral-100 p-3 text-sm">
                            <strong>Tujuan:</strong> {s.goal}
                          </p>

                          <Show when={s.demo === "move-arrow"}>
                            <MoveArrowDemo />
                          </Show>

                        <SectionContent guide={s.guide} steps={s.steps} />

                        <Show when={s.code}>
                          {(code) => (
                            <>
                              <h3 class="mt-4 text-sm font-extrabold uppercase tracking-wide">
                                {s.codeTitle}
                              </h3>
                              <div class="mt-2">
                                <ScratchBlocks code={code()} />
                              </div>
                            </>
                          )}
                        </Show>

                        <p class="mt-3 border-l-4 border-black bg-neutral-100 p-3 text-sm">
                          <strong>Tips:</strong> {s.tip}
                        </p>
                        </>
                      }
                    >
                      <div class="mt-4 grid gap-6 lg:grid-cols-2 print:grid-cols-2">
                        <div>
                          <p class="border border-black bg-neutral-100 p-3 text-sm">
                            <strong>Tujuan:</strong> {s.goal}
                          </p>

                        <SectionContent guide={s.guide} steps={s.steps} />
                      </div>
                      <div class="print:mt-4">
                        <Show when={s.code}>
                          {(code) => (
                            <>
                              <h3 class="text-sm font-extrabold uppercase tracking-wide">
                                {s.codeTitle}
                              </h3>
                              <div class="mt-2">
                                <ScratchBlocks code={code()} />
                              </div>
                            </>
                          )}
                        </Show>

                        <p class="mt-3 border-l-4 border-black bg-neutral-100 p-3 text-sm">
                          <strong>Tips:</strong> {s.tip}
                        </p>
                        </div>
                      </div>
                    </Show>
                  </section>
                )}
              </For>
            </Show>
            </Show>
          </div>
        );
      }}
    </Show>
  );
};

export default Tutorial;
