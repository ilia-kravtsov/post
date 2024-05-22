import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import {VitePWA, VitePWAOptions} from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "post",
    short_name: "post",
    description: "An app to calculate the pressure and the time for firefighters",
    icons: [
      {
        "src": "/maskable_196.png",
        "sizes": "196x196",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/calculator_192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/calculator_256.png",
        "sizes": "256x256",
        "type": "image/png"
      },
      {
        "src": "/calculator_384.png",
        "sizes": "384x384",
        "type": "image/png"
      },
      {
        "src": "/calculator_512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    theme_color: "#3a5ace",
    background_color: "#1C1C1CFF",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  server: {
    open: true,
  },
})
