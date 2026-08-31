import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CmsProvider } from "./lib/cms";
import "./index.css";

// gray-matter expects a Buffer global when running in the browser
(globalThis as unknown as { Buffer: typeof Buffer }).Buffer =
  (globalThis as unknown as { Buffer?: typeof Buffer }).Buffer ?? Buffer;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15_000,
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <CmsProvider>
      <App />
    </CmsProvider>
  </QueryClientProvider>,
);
