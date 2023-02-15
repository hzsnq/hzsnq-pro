/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-17 18:14:02
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-23 10:12:45
 * @FilePath: /union-ums-h5/src/server/interceptors.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import { httpStatus, HttpFn } from "./httpStatus.js"

/**
 * @description http返回值拦截处理方法
 * @param {any} res
 * @return {*}
 */
function customInterceptor(res: any): any {
  const status: any = httpStatus.find((item: Http.HttpStatus) => {
    return item.statusCode === res.statusCode
  })
  return function () {
    return HttpFn[status?.name](res.data)
  }
}

/**
 * @description 返回处理结果
 * @param {any} res
 * @return {*}
 */
function interceptorData(res: any): any {
  return customInterceptor(res)()
}
export default interceptorData
