import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

// Build statis: base relatif agar dist/ bisa dibuka dari hosting
// statis mana pun maupun file://. Tanpa SSR.
export default defineConfig({
  plugins: [solid()],
  base: "./",
  build: {
    outDir: "dist",
    assetsInlineLimit: 4096,
    target: "es2020",
  },
});
