import { createEffect, createSignal, For, Show, type Component } from "solid-js";
import ScratchBlocks from "./ScratchBlocks";
import type { Tutorial } from "../data/tutorials";
import type { FlowPath, FlowQuestion, ProjectFlow as FlowData } from "../data/flow";

interface ProjectFlowProps {
  tutorial: Tutorial;
  flow: FlowData;
}

const ProjectFlow: Component<ProjectFlowProps> = (props) => {
  const [answers, setAnswers] = createSignal<Record<string, string>>({});
  const [stage, setStage] = createSignal(0);
  const [activePath, setActivePath] = createSignal<string | null>(null);

  createEffect(() => {
    props.tutorial.id;
    setAnswers({});
    setStage(0);
    setActivePath(null);
  });

  const jawab = (q: FlowQuestion, opt: string) => {
    if (answers()[q.id] === q.answer) return;
    setAnswers((prev) => ({ ...prev, [q.id]: opt }));
  };

  const benar = (q: FlowQuestion) => answers()[q.id] === q.answer;
  const semuaBenar = (qs: FlowQuestion[]) =>
    qs.length > 0 && qs.every((q) => benar(q));

  const lulusPaham = () => semuaBenar(props.flow.understandQuiz);
  const lulusSiap = () => lulusPaham() && semuaBenar(props.flow.prepare.quiz);
  const pathLulus = (p: FlowPath) => semuaBenar(p.quiz);
  const selesaiSemuaPath = () => props.flow.paths.every((p) => pathLulus(p));
  const lulusPath = () => lulusSiap() && selesaiSemuaPath();
  const lulusTest = () => lulusPath() && semuaBenar(props.flow.test.quiz);

  const tahapTerbuka = (i: number) => {
    if (i === 0) return true;
    if (i === 1) return lulusPaham();
    if (i === 2) return lulusSiap();
    return lulusPath();
  };

  const pathTerbuka = (i: number) =>
    i === 0 || pathLulus(props.flow.paths[i - 1]);

  const pathAktif = () => props.flow.paths.find((p) => p.id === activePath());

  const peranUntuk = (nama: string) =>
    (props.tutorial.cast ?? []).find((c) => c.name === nama) ??
    (props.tutorial.backdrop?.name === nama ? props.tutorial.backdrop : undefined);

  const reset = () => {
    setAnswers({});
    setStage(0);
    setActivePath(null);
  };

  const labels = ["Pemahaman", "Persiapan", "Langkah", "Test"];

  const Quiz: Component<{ questions: FlowQuestion[] }> = (qprops) => (
    <div class="mt-3 space-y-3" data-quiz>
      <For each={qprops.questions}>
        {(q, i) => {
          const dipilih = () => answers()[q.id];
          const tepat = () => dipilih() === q.answer;
          return (
            <div data-quiz-card class="border-2 border-black bg-white p-3">
              <p class="text-sm font-bold">
                {i() + 1}. {q.prompt}
              </p>
              <div class="mt-2 flex flex-wrap gap-2">
                <For each={q.options}>
                  {(o) => {
                    const kelas = () =>
                      dipilih() === o.id
                        ? tepat()
                          ? o.blok
                            ? "bg-neutral-200"
                            : "bg-black text-white"
                          : "bg-neutral-300"
                        : "bg-white";
                    return (
                      <button
                        type="button"
                        onClick={() => jawab(q, o.id)}
                        data-option={o.id}
                        disabled={tepat()}
                        class={`border-2 border-black px-3 py-1.5 text-left text-xs font-bold disabled:cursor-default ${kelas()}`}
                      >
                        <Show when={o.blok} fallback={<span>{o.label}</span>}>
                          {(blok) => (
                            <ScratchBlocks code={blok()} scale={0.5} plain />
                          )}
                        </Show>
                      </button>
                    );
                  }}
                </For>
              </div>
              <Show when={dipilih() && !tepat()}>
                <p class="mt-2 border-l-4 border-black bg-neutral-100 p-2 text-xs">
                  <strong>Belum tepat.</strong> {q.salah}
                </p>
              </Show>
              <Show when={tepat()}>
                <p class="mt-2 border-l-4 border-black bg-neutral-100 p-2 text-xs">
                  <strong>Benar.</strong> {q.benar}
                </p>
              </Show>
            </div>
          );
        }}
      </For>
    </div>
  );

  const Lanjut: Component<{ ketika: boolean; label: string; onClick: () => void }> = (lprops) => (
    <Show when={lprops.ketika}>
      <div class="mt-4 border-t-2 border-black pt-3">
        <button
          type="button"
          onClick={lprops.onClick}
          class="border-2 border-black bg-black px-4 py-2 text-sm font-bold text-white"
        >
          {lprops.label} →
        </button>
      </div>
    </Show>
  );

  const KartuPeran: Component<{ nama: string; gambar: string; peran: string }> = (kprops) => (
    <li class="border-2 border-black bg-white p-3">
      <img
        src={kprops.gambar}
        alt={kprops.nama}
        class="mx-auto h-16 w-auto max-w-full object-contain"
      />
      <p class="mt-2 text-sm font-extrabold">{kprops.nama}</p>
      <p class="mt-1 text-xs leading-relaxed">{kprops.peran}</p>
    </li>
  );

  return (
    <>
      <div class="print-hidden mx-auto mb-4 flex max-w-[210mm] flex-wrap items-center justify-between gap-3">
        <ol class="flex flex-wrap gap-2">
          <For each={labels}>
            {(label, i) => (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (tahapTerbuka(i())) setStage(i());
                  }}
                  disabled={!tahapTerbuka(i())}
                  aria-current={stage() === i() ? "step" : undefined}
                  class={`border-2 px-3 py-1.5 text-xs font-bold ${
                    stage() === i()
                      ? "border-black bg-black text-white"
                      : tahapTerbuka(i())
                        ? "border-black bg-white"
                        : "border-neutral-300 bg-white text-neutral-400"
                  }`}
                >
                  {i() + 1}. {label}
                </button>
              </li>
            )}
          </For>
        </ol>
        <div class="flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            class="border-2 border-black bg-white px-3 py-1.5 text-xs font-bold"
          >
            Mulai ulang
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            class="border-2 border-black bg-black px-3 py-1.5 text-xs font-bold text-white"
          >
            Print / Simpan PDF
          </button>
        </div>
      </div>

      <Show when={stage() === 0}>
        <section data-stage class="print-hidden mx-auto max-w-[210mm] border-2 border-black bg-white p-5 md:p-6">
          <p class="text-xs font-bold uppercase tracking-widest">
            Tahap 1 • Pemahaman project
          </p>
          <h2 class="mt-1 text-2xl font-extrabold tracking-tight">
            Mainkan dulu, pahami kemudian
          </h2>

          <h3 class="mt-5 text-sm font-extrabold uppercase tracking-wide">
            Mainkan project hasil
          </h3>
          <Show
            when={props.tutorial.embedUrl}
            fallback={
              <div class="mt-2 flex aspect-[485/402] w-full items-center justify-center border-2 border-dashed border-neutral-400 bg-neutral-50 p-6 text-center">
                <p class="max-w-xs text-sm font-semibold text-neutral-500">
                  Embed Scratch untuk Catch Apple akan ditambahkan di sini.
                </p>
              </div>
            }
          >
            <div class="mt-2 border-2 border-black bg-white p-2">
              <div class="aspect-[485/402] w-full">
                <iframe
                  src={props.tutorial.embedUrl}
                  title={`Coba mainkan: ${props.tutorial.title}`}
                  allowtransparency={true}
                  frameborder="0"
                  scrolling="no"
                  allowfullscreen
                  class="h-full w-full"
                />
              </div>
            </div>
          </Show>
          <p class="mt-2 text-xs leading-relaxed text-neutral-600">
            Mainkan satu kali penuh: tangkap beberapa apel, biarkan beberapa apel
            lolos, lalu perhatikan apa yang berubah pada skor dan nyawa.
          </p>

          <h3 class="mt-5 text-sm font-extrabold uppercase tracking-wide">
            Pendahuluan
          </h3>
          <p class="mt-2 text-sm leading-relaxed">{props.flow.intro}</p>

          <h3 class="mt-5 text-sm font-extrabold uppercase tracking-wide">
            Pertanyaan pemahaman
          </h3>
          <p class="mt-1 text-xs text-neutral-600">
            Jawab dengan benar untuk membuka tahap berikutnya.
          </p>
          <Quiz questions={props.flow.understandQuiz} />

          <Lanjut
            ketika={lulusPaham()}
            label="Lanjut ke Persiapan project"
            onClick={() => setStage(1)}
          />
        </section>
      </Show>

      <Show when={stage() === 1}>
        <section data-stage class="print-hidden mx-auto max-w-[210mm] border-2 border-black bg-white p-5 md:p-6">
          <p class="text-xs font-bold uppercase tracking-widest">
            Tahap 2 • Persiapan project
          </p>
          <h2 class="mt-1 text-2xl font-extrabold tracking-tight">
            Siapkan panggung dan pemainnya
          </h2>

          <h3 class="mt-5 text-sm font-extrabold uppercase tracking-wide">
            Rencana langkah
          </h3>
          <p class="mt-1 text-xs leading-relaxed">
            Kita bikin permainan ini selangkah demi selangkah. Satu langkah dulu,
            lalu langkah berikutnya.
          </p>
          <ol class="mt-2 space-y-2">
            <For each={props.flow.prepare.roadmap}>
              {(r, i) => (
                <li class="border-l-4 border-black bg-neutral-100 p-3">
                  <p class="text-sm font-extrabold">
                    Langkah {i() + 1} — {r.title}
                  </p>
                  <p class="mt-1 text-xs leading-relaxed">{r.goal}</p>
                </li>
              )}
            </For>
          </ol>

          <h3 class="mt-5 text-sm font-extrabold uppercase tracking-wide">
            Setup project
          </h3>
          <ol class="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
            <For each={props.flow.prepare.setup}>{(s) => <li>{s}</li>}</For>
          </ol>

          <h3 class="mt-5 text-sm font-extrabold uppercase tracking-wide">
            Peran sprite dan backdrop
          </h3>
          <ul class="mt-2 grid gap-3 sm:grid-cols-2">
            <For each={props.flow.prepare.roles}>
              {(r) => <KartuPeran nama={r.name} gambar={r.image} peran={r.role} />}
            </For>
          </ul>

          <h3 class="mt-5 text-sm font-extrabold uppercase tracking-wide">
            Pertanyaan persiapan
          </h3>
          <Quiz questions={props.flow.prepare.quiz} />

          <Lanjut
            ketika={lulusSiap()}
            label="Lanjut mengerjakan langkah"
            onClick={() => setStage(2)}
          />
        </section>
      </Show>

      <Show when={stage() === 2}>
        <section data-stage class="print-hidden mx-auto max-w-[210mm] border-2 border-black bg-white p-5 md:p-6">
          <p class="text-xs font-bold uppercase tracking-widest">
            Tahap 3 • Mengerjakan langkah
          </p>
          <h2 class="mt-1 text-2xl font-extrabold tracking-tight">
            {pathAktif() ? pathAktif()!.title : "Pilih satu langkah untuk dikerjakan"}
          </h2>

          <Show when={!pathAktif()}>
            <p class="mt-2 text-xs font-bold uppercase tracking-wide">
              {props.flow.paths.filter((p) => pathLulus(p)).length} dari{" "}
              {props.flow.paths.length} langkah selesai
            </p>
            <ol class="mt-3 space-y-3">
              <For each={props.flow.paths}>
                {(p, i) => {
                  const status = () =>
                    pathLulus(p) ? "selesai" : pathTerbuka(i()) ? "terbuka" : "terkunci";
                  return (
                    <li
                      data-path={p.id}
                      data-status={status()}
                      class={`border-2 p-4 ${
                        status() === "terkunci"
                          ? "border-neutral-300 bg-neutral-50"
                          : "border-black bg-white"
                      }`}
                    >
                      <div class="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p class="text-xs font-bold uppercase tracking-widest text-neutral-500">
                            Langkah {i() + 1}
                          </p>
                          <p class="text-sm font-extrabold">{p.title}</p>
                          <p class="mt-1 text-xs leading-relaxed">{p.goal}</p>
                        </div>
                        <div class="text-right">
                          <Show when={status() === "selesai"}>
                            <p class="border-2 border-black bg-black px-2 py-1 text-xs font-bold text-white">
                              Selesai
                            </p>
                            <button
                              type="button"
                              onClick={() => setActivePath(p.id)}
                              class="mt-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-bold"
                            >
                              Buka lagi
                            </button>
                          </Show>
                          <Show when={status() === "terbuka"}>
                            <button
                              type="button"
                              onClick={() => setActivePath(p.id)}
                              class="border-2 border-black bg-black px-3 py-1.5 text-xs font-bold text-white"
                            >
                              Buka
                            </button>
                          </Show>
                          <Show when={status() === "terkunci"}>
                            <p class="border-2 border-neutral-300 px-2 py-1 text-xs font-bold text-neutral-400">
                              Terkunci
                            </p>
                          </Show>
                        </div>
                      </div>
                      <Show when={status() === "terkunci"}>
                        <p class="mt-2 border-l-4 border-neutral-300 pl-2 text-xs text-neutral-500">
                          Selesaikan langkah {i()} dulu, ya.
                        </p>
                      </Show>
                    </li>
                  );
                }}
              </For>
            </ol>

            <Show when={selesaiSemuaPath()}>
              <div class="mt-4 border-2 border-black bg-neutral-100 p-4">
                <p class="text-sm font-extrabold">Semua langkah selesai.</p>
                <p class="mt-1 text-xs leading-relaxed">
                  Permainanmu sudah jadi. Sekarang mainkan dari awal sampai GAME
                  OVER, lalu jawab pertanyaan di tahap Test.
                </p>
                <button
                  type="button"
                  onClick={() => setStage(3)}
                  class="mt-3 border-2 border-black bg-black px-4 py-2 text-sm font-bold text-white"
                >
                  Lanjut ke Test project →
                </button>
              </div>
            </Show>
          </Show>

          <Show when={pathAktif()}>
            {(p) => {
              const idx = () => props.flow.paths.findIndex((x) => x.id === p().id);
              const berikut = () => props.flow.paths[idx() + 1];
              return (
                <div class="mt-3">
                  <button
                    type="button"
                    onClick={() => setActivePath(null)}
                    class="border-2 border-black bg-white px-3 py-1.5 text-xs font-bold"
                  >
                    ← Daftar langkah
                  </button>

                  <p class="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Langkah {idx() + 1} dari {props.flow.paths.length}
                  </p>
                  <p class="mt-1 border border-black bg-neutral-100 p-3 text-sm">
                    <strong>Tujuan:</strong> {p().goal}
                  </p>

                  <div class="mt-3 border-2 border-black p-3">
                    <p class="text-xs font-extrabold uppercase tracking-wide">
                      Ingat peran
                    </p>
                    <p class="mt-1 text-xs leading-relaxed">{p().recall}</p>
                    <ul class="mt-2 flex flex-wrap gap-2">
                      <For each={p().roleRefs}>
                        {(nama) => {
                          const r = peranUntuk(nama);
                          return (
                            <Show when={r}>
                              {(role) => (
                                <li class="flex items-center gap-2 border border-black px-2 py-1">
                                  <img
                                    src={role().image}
                                    alt={role().name}
                                    class="h-8 w-8 object-contain"
                                  />
                                  <span class="text-xs font-bold">{role().name}</span>
                                </li>
                              )}
                            </Show>
                          );
                        }}
                      </For>
                    </ul>
                  </div>

                  <h3 class="mt-4 text-sm font-extrabold uppercase tracking-wide">
                    Cara kerjanya
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed">{p().cerita}</p>

                  <h3 class="mt-4 text-sm font-extrabold uppercase tracking-wide">
                    {p().codeTitle}
                  </h3>
                  <div class="mt-2">
                    <ScratchBlocks code={p().code} />
                  </div>
                  <Show when={p().catatanKode}>
                    <p class="mt-1 text-xs text-neutral-600">{p().catatanKode}</p>
                  </Show>

                  <p class="mt-3 border-l-4 border-black bg-neutral-100 p-3 text-sm">
                    <strong>Tips:</strong> {p().tip}
                  </p>

                  <h3 class="mt-4 text-sm font-extrabold uppercase tracking-wide">
                    Cek pemahaman langkah ini
                  </h3>
                  <Quiz questions={p().quiz} />

                  <Show when={pathLulus(p())}>
                    <div class="mt-4 border-2 border-black bg-neutral-100 p-4">
                      <p class="text-sm font-extrabold">Langkah selesai.</p>
                      <p class="mt-1 text-xs leading-relaxed">
                        {berikut()
                          ? `Langkah berikutnya: ${berikut()!.title}.`
                          : "Semua langkah sudah selesai. Sekarang lanjut ke Test."}
                      </p>
                      <div class="mt-3 flex flex-wrap gap-2">
                        <Show
                          when={berikut()}
                          fallback={
                            <button
                              type="button"
                              onClick={() => {
                                setActivePath(null);
                                setStage(3);
                              }}
                              class="border-2 border-black bg-black px-4 py-2 text-sm font-bold text-white"
                            >
                              Lanjut ke Test project →
                            </button>
                          }
                        >
                          {(next) => (
                            <button
                              type="button"
                              onClick={() => setActivePath(next().id)}
                              class="border-2 border-black bg-black px-4 py-2 text-sm font-bold text-white"
                            >
                              Lanjut ke Langkah {idx() + 2} →
                            </button>
                          )}
                        </Show>
                        <button
                          type="button"
                          onClick={() => setActivePath(null)}
                          class="border-2 border-black bg-white px-4 py-2 text-sm font-bold"
                        >
                          Kembali ke daftar langkah
                        </button>
                      </div>
                    </div>
                  </Show>
                </div>
              );
            }}
          </Show>
        </section>
      </Show>

      <Show when={stage() === 3}>
        <section data-stage class="print-hidden mx-auto max-w-[210mm] border-2 border-black bg-white p-5 md:p-6">
          <p class="text-xs font-bold uppercase tracking-widest">
            Tahap 4 • Test project
          </p>
          <h2 class="mt-1 text-2xl font-extrabold tracking-tight">
            Uji dan refleksikan
          </h2>
          <p class="mt-2 text-sm leading-relaxed">{props.flow.test.message}</p>

          <div class="mt-3 border-2 border-black bg-neutral-100 p-3 text-sm">
            <p class="font-extrabold">Status proyek</p>
            <ul class="mt-1 space-y-1 text-xs">
              <li>Sprite Apple, Bowl, dan Game Over siap.</li>
              <li>Skor dan nyawa memakai variabel.</li>
              <li>{props.flow.paths.length} dari {props.flow.paths.length} langkah selesai.</li>
            </ul>
          </div>

          <h3 class="mt-5 text-sm font-extrabold uppercase tracking-wide">
            Refleksi
          </h3>
          <Quiz questions={props.flow.test.quiz} />

          <Show when={lulusTest()}>
            <div class="mt-4 border-2 border-black bg-black p-4 text-white">
              <p class="text-sm font-extrabold">Tutorial selesai.</p>
              <p class="mt-1 text-xs leading-relaxed">
                Kamu sudah membangun Catch Apple dari nol: gerak jatuh, kendali
                pemain, pengulangan, skor, nyawa, dan game over. Coba ubah
                kecepatan jatuh atau jumlah nyawa untuk melihat efeknya.
              </p>
              <button
                type="button"
                onClick={reset}
                class="mt-3 border-2 border-white bg-white px-4 py-2 text-sm font-bold text-black"
              >
                Mulai ulang tutorial
              </button>
            </div>
          </Show>
        </section>
      </Show>

      <div class="print-only">
        <section class="print-page mx-auto max-w-[210mm] border-2 border-black bg-white p-6 md:p-8">
          <p class="text-xs font-bold uppercase tracking-widest">
            Tutorial Scratch
          </p>
          <h1 class="mt-2 text-3xl font-extrabold tracking-tight">
            {props.tutorial.title}
          </h1>
          <p class="mt-2 text-sm leading-relaxed">{props.tutorial.desc}</p>
          <p class="mt-2 text-xs font-semibold">
            Level: {props.tutorial.level} • ±{props.tutorial.minutes} menit •{" "}
            {props.flow.paths.length} langkah
          </p>
          <div class="mt-4 border-t-2 border-black pt-4">
            <h2 class="text-sm font-extrabold uppercase tracking-wide">
              Yang akan dipelajari
            </h2>
            <ol class="mt-2 list-decimal space-y-1 pl-5 text-sm">
              <For each={props.tutorial.goals}>{(g) => <li>{g}</li>}</For>
            </ol>
          </div>
          <div class="mt-4 border-t-2 border-black pt-4">
            <h2 class="text-sm font-extrabold uppercase tracking-wide">
              {props.tutorial.castTitle ?? "Sprite dan backdrop"}
            </h2>
            <ul class="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <For each={props.tutorial.cast ?? []}>
                {(c) => (
                  <li class="border border-black bg-white p-2 text-center">
                    <img src={c.image} alt={c.name} class="mx-auto h-20 w-auto" />
                    <p class="mt-1 text-xs font-bold">{c.name}</p>
                  </li>
                )}
              </For>
            </ul>
            <Show when={props.tutorial.backdrop}>
              {(bd) => (
                <div class="mx-auto mt-3 max-w-md border border-black p-2 text-center">
                  <img src={bd().image} alt={bd().name} class="w-full" />
                  <p class="mt-1 text-xs font-bold">{bd().name}</p>
                </div>
              )}
            </Show>
          </div>
        </section>

        <section class="print-page mx-auto max-w-[210mm] border-2 border-black bg-white p-6 md:p-8">
          <p class="text-xs font-bold uppercase tracking-widest">
            Catch Apple • Tahap 1
          </p>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight">
            Pemahaman project
          </h2>
          <p class="mt-2 text-sm leading-relaxed">{props.flow.intro}</p>
          <h3 class="mt-4 text-sm font-extrabold uppercase tracking-wide">
            Pertanyaan
          </h3>
          <PrintQuiz questions={props.flow.understandQuiz} />
        </section>

        <section class="print-page mx-auto max-w-[210mm] border-2 border-black bg-white p-6 md:p-8">
          <p class="text-xs font-bold uppercase tracking-widest">
            Catch Apple • Tahap 2
          </p>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight">
            Roadmap dan setup project
          </h2>
          <ol class="mt-3 space-y-2">
            <For each={props.flow.prepare.roadmap}>
              {(r, i) => (
                <li class="border-l-4 border-black bg-neutral-100 p-2">
                  <p class="text-sm font-extrabold">
                    Langkah {i() + 1} — {r.title}
                  </p>
                  <p class="text-xs leading-relaxed">{r.goal}</p>
                </li>
              )}
            </For>
          </ol>
          <h3 class="mt-4 text-sm font-extrabold uppercase tracking-wide">
            Setup project
          </h3>
          <ol class="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
            <For each={props.flow.prepare.setup}>{(s) => <li>{s}</li>}</For>
          </ol>
        </section>

        <section class="print-page mx-auto max-w-[210mm] border-2 border-black bg-white p-6 md:p-8">
          <p class="text-xs font-bold uppercase tracking-widest">
            Catch Apple • Tahap 2
          </p>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight">
            Peran sprite dan pertanyaan
          </h2>
          <ul class="mt-3 space-y-2">
            <For each={props.flow.prepare.roles}>
              {(r) => (
                <li class="flex items-start gap-3 border border-black p-2">
                  <img src={r.image} alt={r.name} class="h-14 w-14 shrink-0 object-contain" />
                  <div>
                    <p class="text-sm font-extrabold">{r.name}</p>
                    <p class="text-xs leading-relaxed">{r.role}</p>
                  </div>
                </li>
              )}
            </For>
          </ul>
          <h3 class="mt-4 text-sm font-extrabold uppercase tracking-wide">
            Pertanyaan
          </h3>
          <PrintQuiz questions={props.flow.prepare.quiz} />
        </section>

        <section class="print-page mx-auto max-w-[210mm] border-2 border-black bg-white p-6 md:p-8">
          <p class="text-xs font-bold uppercase tracking-widest">
            Catch Apple • Tahap 3
          </p>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight">
            Daftar langkah
          </h2>
          <ol class="mt-3 space-y-3">
            <For each={props.flow.paths}>
              {(p, i) => (
                <li class="border-l-4 border-black pl-3">
                  <p class="text-sm font-extrabold">
                    Langkah {i() + 1} — {p.title}
                  </p>
                  <p class="text-xs leading-relaxed">{p.goal}</p>
                </li>
              )}
            </For>
          </ol>
          <p class="mt-4 border-l-4 border-black bg-neutral-100 p-3 text-xs leading-relaxed">
            Satu lembar berisi satu langkah: peran, cara kerjanya, kode, dan
            pertanyaan. Langkah dengan kode panjang memakai dua lembar supaya
            bloknya tetap utuh.
          </p>
        </section>

        <For each={props.flow.paths}>
          {(p, i) => {
            const panjang = p.code.split("\n").length > 18;
            return (
              <>
                <section class="print-page mx-auto max-w-[210mm] border-2 border-black bg-white p-6 md:p-8">
                  <p class="text-xs font-bold uppercase tracking-widest">
                    Catch Apple • Langkah {i() + 1} dari {props.flow.paths.length}
                  </p>
                  <h2 class="mt-2 text-2xl font-extrabold tracking-tight">{p.title}</h2>
                  <p class="mt-2 border border-black bg-neutral-100 p-2 text-xs leading-relaxed">
                    <strong>Tujuan:</strong> {p.goal}
                  </p>
                  <p class="mt-3 text-xs leading-relaxed">
                    <strong>Ingat peran:</strong> {p.recall}
                  </p>
                  <h3 class="mt-3 text-sm font-extrabold uppercase tracking-wide">
                    Cara kerjanya
                  </h3>
                  <p class="mt-1 text-xs leading-relaxed">{p.cerita}</p>
                  <h3 class="mt-3 text-sm font-extrabold uppercase tracking-wide">
                    {p.codeTitle}
                  </h3>
                  <div class="mt-1">
                    <ScratchBlocks code={p.code} scale={panjang ? 0.64 : 0.7} />
                  </div>
                  <Show when={p.catatanKode}>
                    <p class="mt-1 text-xs text-neutral-600">{p.catatanKode}</p>
                  </Show>
                  <Show when={!panjang}>
                    <p class="mt-2 border-l-4 border-black bg-neutral-100 p-2 text-xs leading-relaxed">
                      <strong>Tips:</strong> {p.tip}
                    </p>
                    <h3 class="mt-3 text-sm font-extrabold uppercase tracking-wide">
                      Pertanyaan
                    </h3>
                    <PrintQuiz questions={p.quiz} />
                  </Show>
                </section>

                <Show when={panjang}>
                  <section class="print-page mx-auto max-w-[210mm] border-2 border-black bg-white p-6 md:p-8">
                    <p class="text-xs font-bold uppercase tracking-widest">
                      Catch Apple • Langkah {i() + 1} dari {props.flow.paths.length} — lanjutan
                    </p>
                    <h2 class="mt-2 text-2xl font-extrabold tracking-tight">{p.title}</h2>
                    <p class="mt-2 border-l-4 border-black bg-neutral-100 p-2 text-xs leading-relaxed">
                      <strong>Tips:</strong> {p.tip}
                    </p>
                    <h3 class="mt-3 text-sm font-extrabold uppercase tracking-wide">
                      Pertanyaan
                    </h3>
                    <PrintQuiz questions={p.quiz} />
                  </section>
                </Show>
              </>
            );
          }}
        </For>

        <section class="print-page mx-auto max-w-[210mm] border-2 border-black bg-white p-6 md:p-8">
          <p class="text-xs font-bold uppercase tracking-widest">
            Catch Apple • Tahap 4
          </p>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight">
            Test project dan refleksi
          </h2>
          <p class="mt-2 text-sm leading-relaxed">{props.flow.test.message}</p>
          <h3 class="mt-4 text-sm font-extrabold uppercase tracking-wide">
            Pertanyaan refleksi
          </h3>
          <PrintQuiz questions={props.flow.test.quiz} />
        </section>
      </div>
    </>
  );
};

const PrintQuiz: Component<{ questions: FlowQuestion[] }> = (props) => (
  <ol class="mt-2 space-y-2">
    <For each={props.questions}>
      {(q, i) => (
        <li>
          <p class="text-xs font-bold">
            {i() + 1}. {q.prompt}
          </p>
          <ol class="mt-1 space-y-0.5 pl-3 text-xs">
            <For each={q.options}>
              {(o, j) => (
                <li class="flex items-start gap-1">
                  <span class="pt-0.5">{String.fromCharCode(97 + j())}.</span>
                  <Show when={o.blok} fallback={<span>{o.label}</span>}>
                    {(blok) => <ScratchBlocks code={blok()} scale={0.55} plain />}
                  </Show>
                </li>
              )}
            </For>
          </ol>
        </li>
      )}
    </For>
  </ol>
);

export default ProjectFlow;
