/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-17 18:14:02
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-09 18:14:42
 * @FilePath: /hzsnq-pro/src/main.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import { createSSRApp } from "vue"
import App from "./App.vue"
import store from "./store"
// import VConsole from "vconsole"
// import { wrapperEnv } from "./utils/env"

//判断引入vConsole
// const { VITE_SHOW_VCONSOLE } = wrapperEnv
// if (VITE_SHOW_VCONSOLE) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
//   // const vConsole = new VConsole({ theme: "dark" })
// }

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
