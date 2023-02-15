/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-15 09:00:10
 * @FilePath: /hzsnq-pro/src/hooks/useUser.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import { useUserStoreHook } from "@/store/modules/user"

// 暴露hook函数
export function useUser() {
  const userStoreHook = useUserStoreHook()

  const { userInfo } = storeToRefs(userStoreHook)

  const pushId = ref("")
  /**
   * @description 设置用户信息
   */
  const setUserInfo = (item: AnyObj) => {
    userStoreHook.setUserInfo(item)
  }

  /**
   * @description 重置用户信息，退出
   */
  const resetUserInfo = () => {
    userStoreHook.resetUserInfo()
  }

  /**
   * @description 判断是否有用户信息
   */
  function isLoginFn() {
    const userInfoLengthForC = Object.keys(userInfo.value).length
    return function (fn: AllFunction) {
      if (userInfoLengthForC === 0) {
        loginOrRegister()
      } else {
        fn()
      }
    }
  }

  /**
   * @description 首次打开小程序判断是否有用户信息，没有则注册或登录并返回信息
   * @return {*}
   */
  async function loginOrRegister(): Promise<any> {
    uni.getPushClientId({
      success: (res) => {
        pushId.value = res.cid
        console.log("客户端推送标识:", res.cid)
        uni.login({
          success: async (e) => {
            const params = {
              jsCode: e.code,
              pushId: pushId.value
            }
            const res: any = await api.loginOrRegister(params)
            const { data } = res
            if (data && data.length > 0) {
              console.log("个人信息", data[0])
              setUserInfo(data[0])
            }
          }
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  }

  /**
   * @description 判断用户是否登录，执行传入方法
   * @param {AllFunction} fn
   * @return {*}
   */
  const isLogin = (fn: AllFunction): any => {
    isLoginFn()(fn)
  }

  // 返回数据
  return { userInfo, setUserInfo, resetUserInfo, isLogin }
}
