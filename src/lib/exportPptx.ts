import PptxGenJS from "pptxgenjs";
import type { Tutorial } from "../data/tutorials";

async function imageToDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let bin = "";
    const CHUNK = 0x8000;
    for (let i = 0; i < bytes.length; i += CHUNK) {
      bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
    }
    const mime = url.endsWith(".png") ? "image/png" : "image/svg+xml";
    return `data:${mime};base64,${btoa(bin)}`;
  } catch {
    return null;
  }
}

function fileNameOf(title: string): string {
  return `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")}.pptx`;
}

export async function exportTutorialPptx(t: Tutorial): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.author = "Tutorial Scratch";
  pptx.title = t.title;
  pptx.subject = t.desc;

  const cover = pptx.addSlide();
  cover.background = { color: "FFFFFF" };
  cover.addText(t.title, {
    x: 0.5,
    y: 0.4,
    w: 9,
    h: 0.9,
    fontSize: 32,
    bold: true,
    color: "000000",
  });
  cover.addText(t.desc, {
    x: 0.5,
    y: 1.4,
    w: 9,
    h: 0.8,
    fontSize: 14,
    color: "333333",
  });
  cover.addText(`Level: ${t.level} • ±${t.minutes} menit`, {
    x: 0.5,
    y: 2.2,
    w: 9,
    h: 0.4,
    fontSize: 12,
    bold: true,
    color: "000000",
  });
  cover.addText(
    t.goals.map((g) => ({ text: g, options: { bullet: true } })),
    { x: 0.5, y: 2.8, w: 9, h: 1.6, fontSize: 13, color: "000000" },
  );

  if (t.cast && t.cast.length > 0) {
    const imgs = await Promise.all(
      t.cast.map((c) => imageToDataUrl(c.image)),
    );
    let ix = 0.5;
    for (const data of imgs) {
      if (!data) continue;
      cover.addImage({ data, x: ix, y: 4.6, w: 1.1, h: 1.1 });
      ix += 1.3;
      if (ix > 8) break;
    }
  }

  for (const [i, s] of t.sections.entries()) {
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addText(`${i + 1}. ${s.title}`, {
      x: 0.5,
      y: 0.3,
      w: 9,
      h: 0.7,
      fontSize: 24,
      bold: true,
      color: "000000",
    });
    slide.addText(`Tujuan: ${s.goal}`, {
      x: 0.5,
      y: 1.1,
      w: 9,
      h: 0.6,
      fontSize: 13,
      italic: true,
      color: "333333",
    });

    let y = 1.9;
    if (s.guide) {
      for (const g of s.guide) {
        slide.addText(
          [
            { text: `${g.block} — `, options: { bold: true } },
            { text: `${g.fungsi} ${g.alasan}` },
          ],
          { x: 0.5, y, w: 9, h: 0.9, fontSize: 12, color: "000000" },
        );
        y += 1.0;
      }
    } else if (s.steps) {
      slide.addText(
        s.steps.map((st, n) => ({
          text: `${n + 1}. ${st}`,
          options: { bullet: true },
        })),
        { x: 0.5, y, w: 9, h: 2.2, fontSize: 12, color: "000000" },
      );
      y += 2.3;
    }

    if (s.code) {
      slide.addText(s.codeTitle ?? "", {
        x: 0.5,
        y,
        w: 9,
        h: 0.35,
        fontSize: 12,
        bold: true,
        color: "000000",
      });
      y += 0.4;
      slide.addText(s.code, {
        x: 0.5,
        y,
        w: 9,
        h: 1.6,
        fontSize: 11,
        fontFace: "Consolas",
        color: "000000",
        fill: { color: "F2F2F2" },
      });
      y += 1.7;
    }
    slide.addText(`Tips: ${s.tip}`, {
      x: 0.5,
      y,
      w: 9,
      h: 0.7,
      fontSize: 12,
      italic: true,
      color: "333333",
    });
  }

  await pptx.writeFile({ fileName: fileNameOf(t.title) });
}
