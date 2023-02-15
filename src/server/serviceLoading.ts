/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-23 10:05:22
 * @FilePath: /union-ums-h5/src/server/serviceLoading.ts
 * @Description:处理批量请求loading提升不匹配问题
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
let loadingCount = 0

/**
 * @description 显示loading
 * @return {*}
 */
export function showLoading() {
  uni.showLoading({
    title: "加载中",
    mask: true
  })
  loadingCount = loadingCount + 1
}

/**
 * @description 隐藏loading
 * @return {*}
 */
export function hideLoading() {
  loadingCount = loadingCount - 1
  if (loadingCount === 0) {
    uni.hideLoading()
    return function (msg: string) {
      uni.showToast({
        title: msg,
        icon: "none"
      })
    }
  } else {
    return () => {}
  }
}
