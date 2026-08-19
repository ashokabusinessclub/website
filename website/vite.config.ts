import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // gray-matter pulls in node built-ins that are unused in the browser
      fs: path.resolve(__dirname, "./src/lib/node-shims/fs.ts"),
      path: path.resolve(__dirname, "./src/lib/node-shims/path.ts"),
      buffer: "buffer",
    },
  },
  define: {
    "process.env": {},
  },
}));
