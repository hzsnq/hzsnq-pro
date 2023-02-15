/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-15 12:33:04
 * @FilePath: /hzsnq-pro/src/hooks/usePages.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import { useSystemStoreHook } from "@/store/modules/system"

// 暴露hook函数
export function usePages() {
  const { systemInfo, customBar, statusBar } = storeToRefs(useSystemStoreHook())

  /**
   * @description 初始化页面
   */
  function pageInit() {
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  }

  /**
   * @description 获取系统参数设置小程序安全区域高度
   */
  function getSystemInfo() {
    uni.getSystemInfo({
      success: function (e) {
        statusBar.value = e.statusBarHeight || 0
        let capsule = uni.getMenuButtonBoundingClientRect()
        if (capsule.width <= 0) {
          console.log(capsule, "capsule获取异常")
          capsule = {
            width: 80,
            height: 30,
            left: e.windowWidth - 12 - 80,
            right: e.windowWidth - 12,
            top: e.statusBarHeight || 0 + 10,
            bottom: e.statusBarHeight || 0 + 10 + 30
          }
        }
        if (capsule) {
          customBar.value = capsule.bottom + capsule.top - (e.statusBarHeight || 0)
        } else {
          customBar.value = e.statusBarHeight || 0 + 50
        }
      }
    })
  }

  /**
   * @description 获取系统参数设置小程序安全区域高度
   */
  function getSystem() {
    systemInfo.value = uni.getAccountInfoSync()
    // console.log("小程序信息", systemInfo.value)
  }

  // 返回数据
  return { pageInit, getSystemInfo, customBar, statusBar, systemInfo, getSystem }
}
