import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import UnoCSS from "unocss/vite"
import presetUno from "@unocss/preset-uno"
import presetAttributify from "@unocss/preset-attributify"

export default defineConfig({
   plugins: [
      vue(),
      Components(),
      AutoImport({
         // targets to transform
         include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
         ],
         // global imports to register
         imports: [
            // presets
            "vue",
            "vue-router",
         ],
      }),
      UnoCSS({
         theme: {
            breakpoints: {
               sm: "640px",
               md: "768px",
               lg: "1150px",
               xl: "1200px",
               xxl: "1440px",
            },
            fontFamily: {
               jost: "Jost, sans-serif",
            },
         },
         shortcuts: [
            {
               btn: "rounded-10px text-#F2F4FE  text-13px md:text-14px font-bold leading-1.25rem py-10px px-16px md:py-12px md:px-25px",
               btn1: "bg-#AD1FEA hover:bg-#C75AF6",
               btn_blue: "bg-#4661E6 hover:bg-#7C91F9",
               btn_dark: "bg-#3A4374 hover:bg-#656EA3",
               btn_red: "bg-#D73737 hover:bg-#E98888",
               go_back:
                  "text-.8125rem  sm:text-0.875rem font-bold leading-1.25rem  hover:underline cursor-pointer",
               btn_go_back: "bg-#373F68 text-white hover:underline py-16px px-40px",
               h1: "font-bold text-1.5rem leading-2.19rem -tracking-0.33px",
               h2: "font-bold text-1.25rem leading-1.81rem -tracking-0.25px",
               h3: "font-bold text-1.125rem leading-1.625rem -tracking-0.25px",
               h4: "font-bold text-.875rem leading-1.25rem -tracking-0.20px",
               body1: "text-1rem leading-1.44rem font-normal",
               body2: "text-.937rem leading-1.38rem font-normal",
               body3: "text-.812rem leading-1.19rem font-semibold",
            },
         ],
         presets: [
            presetUno(),
            presetAttributify({
               /* options */
            }),
            // ...other presets
         ],
      }),
   ],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   server: {
      proxy: {},
   },
   build: {
      rollupOptions: {
         output: {
            assetFileNames: (assetInfo) => {
               let extType = assetInfo.name.split(".").at(1)
               if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                  extType = "img"
               }
               return `assets/${extType}/[name]-[hash][extname]`
            },
            chunkFileNames: "assets/js/[name]-[hash].js",
            entryFileNames: "assets/js/[name]-[hash].js",
         },
      },
   },
})
