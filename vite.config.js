import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve("./src"),
  envDir: path.resolve("."),
  plugins: [react(), tailwindcss()],
});
