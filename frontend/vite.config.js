import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    //get rid of CORS error
    proxy: {
      "/api": {
        target: "https://threads-clone-api-fgv9.onrender.com/", //"http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
