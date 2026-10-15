import { createEffect, onCleanup, type Component } from "solid-js";
import scratchblocks from "scratchblocks";

interface ScratchBlocksProps {
  /** Kode teks sintaks scratchblocks, satu blok per baris. */
  code: string;
  /** Skala render blok. Default 0.85 agar muat di lebar A4. */
  scale?: number;
}

/**
 * Merender kode teks scratchblocks menjadi gambar blok Scratch (SVG)
 * sepenuhnya di browser — tanpa network call tambahan.
 */
const ScratchBlocks: Component<ScratchBlocksProps> = (props) => {
  let host!: HTMLDivElement;

  const draw = (code: string, scale: number) => {
    host.innerHTML = "";
    try {
      const doc = scratchblocks.parse(`${code.trim()}\n`, {
        languages: ["en"],
      });
      const svg = scratchblocks.render(doc, {
        style: "scratch3",
        scale,
      });
      host.appendChild(svg);
    } catch {
      // Fallback: tampilkan kode mentah jika sintaks tidak dikenali.
      const pre = document.createElement("pre");
      pre.className = "text-sm whitespace-pre-wrap font-mono";
      pre.textContent = code;
      host.appendChild(pre);
    }
  };

  createEffect(() => {
    draw(props.code, props.scale ?? 0.85);
  });

  onCleanup(() => {
    host.innerHTML = "";
  });

  return <div class="sb-wrap rounded border border-black p-3" ref={host} />;
};

export default ScratchBlocks;
