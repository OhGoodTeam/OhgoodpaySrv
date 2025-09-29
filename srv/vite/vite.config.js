import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://ohgoodteam.shinhanacademy.co.kr", // 스프링 부트 포트
        changeOrigin: true,
      },
    },
  },
});
