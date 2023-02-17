/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-17 16:47:39
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
    const userInfoLength = Object.keys(userInfo.value).length
    return function (fn: AllFunction) {
      if (userInfoLength === 0) {
        loginOrRegister()
      } else {
        updatePushId()
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
            const { data, code } = res
            if (code === "000") {
              console.log("个人信息", data)
              setUserInfo(data)
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
   * @description 有登录信息时，判断当前推送id是否更新
   * @return {*}
   */
  async function updatePushId(): Promise<any> {
    uni.getPushClientId({
      success: async (res) => {
        pushId.value = res.cid
        console.log("客户端推送标识:", res.cid)
        if (pushId.value !== userInfo.value.push_clientid) {
          console.log("更新推送信息")
          const params = {
            userId: userInfo.value._id,
            pushId: pushId.value
          }
          const res: any = await api.updateUser(params)
          const { data, code } = res
          if (code === "000") {
            console.log("更改个人信息", data)
            setUserInfo(data)
          }
        } else {
          console.log("推送无更新")
        }
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
  return { userInfo, setUserInfo, resetUserInfo, isLogin, updatePushId }
}
