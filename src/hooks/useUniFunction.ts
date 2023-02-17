/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-17 14:58:21
 * @FilePath: /hzsnq-pro/src/hooks/useUniFunction.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import { backFn } from "@/utils/uniFunction"

// 暴露hook函数
export function useUniFunction() {
  /**
   * @description: 定义回退1的方法
   */
  const backToOne = backFn(1)

  /**
   * @description c端跳转判断登录条件
   * @param {type} params
   * @return {*}
   */
  /**
   * @description 弹窗提示2000ms后关闭弹窗
   * @param {string} title
   * @param {AllFunction} fn
   * @return {*}
   */
  function showToastFn(title: string, fn?: AllFunction, time = 2000): any {
    uni.showToast({
      title: title,
      icon: "none",
      mask: true
    })
    if (fn) {
      setTimeout(() => {
        fn()
      }, time)
    }
  }

  // 返回数据
  return { backToOne, showToastFn }
}
