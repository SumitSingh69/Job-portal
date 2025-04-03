import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600, // Increase the warning limit to 600kb
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create a vendor chunk for node_modules
          if (id.includes("node_modules")) {
            return "vendor";
          }

          // Create an auth chunk for authentication related code
          if (
            id.includes("src/context/authContext") ||
            id.includes("src/hooks/useAxios")
          ) {
            return "auth";
          }
        },
      },
    },
  },
});
