/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-02-12 17:13:56
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-12 17:25:43
 * @FilePath: /hzsnq-pro/src/store/modules/system.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import store from "@/store"

interface ISystemState {
  systemInfo: AnyObj
  customBar: number
  statusBar: number
}

export const useSystemStore = defineStore({
  id: "system",
  state: (): ISystemState => {
    return {
      systemInfo: {},
      customBar: 0,
      statusBar: 0
    }
  },
  actions: {
    /** 设置环境数据 */
    setSystemInfo(info: AnyObj) {
      this.systemInfo = info
    }
  }
})

/** 在 setup 外使用 */
export function useSystemStoreHook() {
  return useSystemStore(store)
}
