import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          bootstrap: ["bootstrap", "react-bootstrap"],
          particles: [
            "@tsparticles/react",
            "@tsparticles/engine",
            "tsparticles",
          ],
          icons: ["@fortawesome/react-fontawesome", "react-icons"],
          markdown: ["react-markdown", "react-syntax-highlighter"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "bootstrap", "react-bootstrap"],
  },
});
