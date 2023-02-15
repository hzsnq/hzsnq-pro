/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-13 19:06:25
 * @FilePath: /hzsnq-pro/src/hooks/useUniFunction.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import { backFn } from "@/utils/uniFunction"
import { useUserStoreHook } from "@/store/modules/user"

// 暴露hook函数
export function useUniFunction() {
  const { userInfo } = storeToRefs(useUserStoreHook())
  /**
   * @description: 定义回退1的方法
   */
  const backToOne = backFn(1)

  /**
   * @description c端跳转判断登录条件
   * @param {type} params
   * @return {*}
   */
  function navigateForLoginC(params: string): any {
    if (Object.keys(userInfo.value).length === 0) {
      uni.navigateTo({
        url: "/pages/login/index"
      })
      return
    } else {
      uni.navigateTo({
        url: params
      })
    }
  }

  // 返回数据
  return { backToOne, navigateForLoginC }
}
