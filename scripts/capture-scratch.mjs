import { chromium } from "playwright-core";
import { homedir } from "os";
import path from "path";

const EXE = path.join(
  homedir(),
  "AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe",
);

const OUT = [
  { file: "public/ui/flag-stop.png", clip: { x: 725, y: 44, width: 130, height: 48 } },
  { file: "public/ui/stage.png", clip: { x: 760, y: 90, width: 505, height: 330 } },
  { file: "public/ui/sprite-info.png", clip: { x: 740, y: 435, width: 400, height: 115 } },
  { file: "public/ui/sprite-add.png", clip: { x: 755, y: 520, width: 510, height: 270 } },
];

const browser = await chromium.launch({
  executablePath: EXE,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
});
await page.goto("https://scratch.mit.edu/projects/editor/", {
  waitUntil: "domcontentloaded",
  timeout: 120000,
});
await page.waitForTimeout(15000);
for (const s of OUT) {
  await page.screenshot({ path: s.file, clip: s.clip });
  console.log("OK " + s.file);
}
await browser.close();
console.log("DONE");
