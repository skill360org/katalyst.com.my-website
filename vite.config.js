import path from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { glob } from "glob";

// Auto-discover all HTML pages in the root directory
const htmlFiles = glob.sync("*.html", { cwd: __dirname });
const input = Object.fromEntries(
  htmlFiles.map((file) => [
    file.replace(".html", ""),
    path.resolve(__dirname, file),
  ]),
);

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, "partials"),
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input,
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash][extname]",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    environment: "node",
    include: ["assets/js/**/*.test.js"],
  },
});
