import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  console.log("🚀 ~ mode:", mode)
  console.log("🚀 ~ STAGING_API_URL:", process.env.STAGING_API_URL)
  

  return defineConfig({
    server: {
        proxy: {
          '/api': {
            secure: false,
            changeOrigin: true,
            target: process.env.STAGING_API_URL
          }
        }
    },
      plugins: [react()],
  });
}
  
