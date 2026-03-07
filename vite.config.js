import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Todo",
        short_name: "Todo",
        description: "Minimal todo app",
        theme_color: "#F5F5F5",
        background_color: "#0A0A0A",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-icons/48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/pwa-icons/72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/pwa-icons/96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/pwa-icons/144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/pwa-icons/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-icons/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
