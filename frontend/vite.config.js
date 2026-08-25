import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // In dev, forward /api/* to the Express backend running on 3001
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
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
