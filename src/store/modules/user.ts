/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-12 14:26:33
 * @FilePath: /hzsnq-pro/src/store/modules/user.ts
 * @Description:c端与b端用户数据store操作与存储
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import store from "@/store"

interface IUserState {
  userInfo: AnyObj
}

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => {
    return {
      userInfo: {}
    }
  },
  actions: {
    /** 设置用户数据 */
    setUserInfo(info: AnyObj) {
      this.userInfo = info
    },
    /** 退出登录 */
    resetUserInfo() {
      this.userInfo = {}
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: window?.localStorage,
        paths: ["userInfo"]
      }
    ],
    detached: true
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
