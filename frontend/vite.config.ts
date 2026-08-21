import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      fs: path.resolve(__dirname, "./src/lib/node-shims/fs.ts"),
      path: path.resolve(__dirname, "./src/lib/node-shims/path.ts"),
      buffer: "buffer",
    },
  },
  define: {
    "process.env": {},
  },
  publicDir: "public",
  server: {
    host: "::",
    port: 8080,
    middleware: [
      (req, res, next) => {
        if (req.url?.startsWith("/admin/")) {
          const filePath = path.join(__dirname, "public", req.url);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath);
            const mimeTypes = {
              ".html": "text/html",
              ".js": "application/javascript",
              ".css": "text/css",
              ".png": "image/png",
              ".jpg": "image/jpeg",
              ".svg": "image/svg+xml",
              ".woff": "font/woff",
              ".woff2": "font/woff2",
            };
            res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
            res.end(fs.readFileSync(filePath));
            return;
          }
        }
        next();
      },
    ],
  },
}));