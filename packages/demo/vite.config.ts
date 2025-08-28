// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 4000,
//     host: true
//   },
//   resolve: {
//     alias: {
//       // Alias the package name to the local source for HMR
//        'ui-core-kit': path.resolve(__dirname, '../ui-core-kit/src/index.ts')
//     }
//   }
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from 'path';
import dynamicImport from 'vite-plugin-dynamic-import';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros']
      }
    }),
    dynamicImport()
  ],
  server: {
    port: 4000,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 4000,
    },
  },
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      'ui-core-kit': path.resolve(__dirname, '../ui-core-kit/src/index.ts')
    },
  },
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 1600,
    minify: 'esbuild',
    cssMinify: true,
    target: ['es2020'],
    modulePreload: {
      polyfill: true
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react/jsx-runtime', 'react-is', 'scheduler'],
          'vendor-redux': ['react-redux', '@reduxjs/toolkit'],
          'vendor-router': ['react-router-dom'],
          'vendor-formik': ['formik'],
          'vendor-ui': ['@tanstack/react-table', 'react-beautiful-dnd', 'react-modal', 'react-select'],
          'vendor-utils': ['axios', 'dayjs', 'lodash'],
          'vendor-charts': ['apexcharts', 'react-apexcharts', '@visx/pattern'],
          'vendor-calendar': ['@fullcalendar/react', '@fullcalendar/daygrid', '@fullcalendar/timegrid', '@fullcalendar/interaction'],
          'vendor-styling': ['twin.macro', 'tailwindcss']
        },
        inlineDynamicImports: false,
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'chunks/[name].[hash].js',
        entryFileNames: 'entries/[name].[hash].js'
      }
    }
  },
   optimizeDeps: {
    exclude: ['twin.macro'],
  },
    define: {
    'process.env': {},
  },
});
