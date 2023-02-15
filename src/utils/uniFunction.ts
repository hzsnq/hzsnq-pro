/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-15 09:17:03
 * @FilePath: /hzsnq-pro/src/utils/uniFunction.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
/***
 * @description 封装navigateBack方法，回退几级路由，当前是一级路由，打开首页
 * @params number delta - 回退几级
 */
export function backFn(delta: number) {
  const page = getCurrentPages()
  return function () {
    if (page.length > delta) {
      uni.navigateBack({
        delta: delta
      })
    } else {
      uni.redirectTo({
        url: "/pages/index/index"
      })
    }
  }
}

/***
 * @description 将uni的方法转成异步执行
 */
export const uniAsync = new Proxy({} as any, {
  get(target, name) {
    return (obj: any) =>
      new Promise((resolve, reject) => {
        // @ts-ignore
        uni[name]({
          ...obj,
          success: (ret: any) => {
            resolve(ret)
          },
          fail: (err: any) => {
            reject(err)
          }
        })
      })
  }
})
