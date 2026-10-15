import { For, Show, type Component } from "solid-js";
import ScratchBlocks from "../components/ScratchBlocks";
import { getTutorial, type BlockGuide } from "../data/tutorials";

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
            {/* Bilah aksi layar — disembunyikan saat print */}
            <div class="print-hidden mb-4 flex flex-wrap items-center justify-end gap-2">
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
                      Kenalan dengan para hewan
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

                  <Show
                    when={t().layout === "two-col"}
                    fallback={
                      <>
                        <p class="mt-2 border border-black bg-neutral-100 p-3 text-sm">
                          <strong>Tujuan:</strong> {s.goal}
                        </p>

                        <SectionContent guide={s.guide} steps={s.steps} />

                        <h3 class="mt-4 text-sm font-extrabold uppercase tracking-wide">
                          {s.codeTitle}
                        </h3>
                        <div class="mt-2">
                          <ScratchBlocks code={s.code} />
                        </div>

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
                        <h3 class="text-sm font-extrabold uppercase tracking-wide">
                          {s.codeTitle}
                        </h3>
                        <div class="mt-2">
                          <ScratchBlocks code={s.code} />
                        </div>

                        <p class="mt-3 border-l-4 border-black bg-neutral-100 p-3 text-sm">
                          <strong>Tips:</strong> {s.tip}
                        </p>
                      </div>
                    </div>
                  </Show>
                </section>
              )}
            </For>

          </div>
        );
      }}
    </Show>
  );
};

export default Tutorial;
