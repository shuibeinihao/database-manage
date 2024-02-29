import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';
import AutoImport from 'unplugin-auto-import/vite';
import legacy from '@vitejs/plugin-legacy';
import DefineOptions from 'unplugin-vue-define-options/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    // 兼容不支持 < script type = "module" > 特性的浏览器，或 IE浏览器 vue3明确不兼容ie11
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    // vue相关 defineComponent 、computed 、watch等模块依赖根据使用，插件自动导入，你无需关心 import，直接使用即可
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
      // 插件自动生成 自动更新
      dts: 'src/auto-imports.d.ts'
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import "@/assets/style/variable.scss";`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    https: false,
    hmr: true,
    proxy: {
      '/adgm-gateway': {
        target: 'http://10.59.100.121:32392',
        rewrite: (path) => path.replace(/^\/adgm-gateway/, '/adgm-gateway'),
        changeOrigin: true
      }
    }
  },
  //别名设置
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ],
    extensions: ['.js', '.jxs', '.ts', '.json', '.vue']
  },
  // 生产环境打包配置
  //去除 console debugger
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 分类输出
        entryFileNames: 'js/[name]-[hash].js',
        // assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 超大静态资源拆分
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
