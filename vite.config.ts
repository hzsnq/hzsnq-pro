import { defineConfig } from "vite"
import type { UserConfig, ConfigEnv } from "vite"
import { loadEnv } from "vite"
import { resolve } from "path"
import uni from "@dcloudio/vite-plugin-uni"
import AutoImport from "unplugin-auto-import/vite"
import { wrapperEnv } from "./build/utils"

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_DROP_CONSOLE } = viteEnv
  return {
    plugins: [
      AutoImport({
        dts: "src/auto-imports.d.ts", // 可以自定义文件生成的位置，默认是根目录下
        imports: ["vue", "uni-app", "pinia"],
        dirs: ["./src/api"],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: "readonly" // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      uni()
    ],
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      port: VITE_PORT,
      open: true //自动打开
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    }
  }
})
