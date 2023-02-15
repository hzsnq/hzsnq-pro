/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-23 20:55:04
 * @FilePath: /union-ums-h5/src/server/httpStatus.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
export const httpStatus: Array<Http.HttpStatus> = [
  { statusCode: 200, msg: "", name: "SUCCESS" },
  { statusCode: 204, msg: "没有资源可返回", name: "NO_CONTENT" },
  { statusCode: 400, msg: "请求报文中存在语法错误", name: "CLIENT_ERROR" },
  { statusCode: 401, msg: "需要鉴权", name: "AUTHENTICATE" },
  { statusCode: 403, msg: "没有权限访问", name: "FORBIDDEN" },
  { statusCode: 404, msg: "请求资源不存在", name: "NOT_FOUND" },
  { statusCode: 500, msg: "服务器错误", name: "SERVER_ERROR" },
  { statusCode: 502, msg: "服务端出现了问题", name: "BAD_GATEWAY" },
  { statusCode: 503, msg: "服务器暂时处于超负载或正在进行停机维护", name: "SERVICE_UNAVAILABLE" }
]

/**
 * @description 自定义请求拦截器方法
 * @return {*}
 */
export const HttpFn: AnyObj = {
  SUCCESS: function (data: any) {
    return data
  },
  NO_CONTENT: function (data: any) {
    return data
  },
  CLIENT_ERROR: function (data: any) {
    return data
  },
  AUTHENTICATE: function (data: any) {
    return data
  },
  FORBIDDEN: function (data: any) {
    return data
  },
  NOT_FOUND: function (data: any) {
    return data
  },
  SERVER_ERROR: function (data: any) {
    return data
  },
  BAD_GATEWAY: function (data: any) {
    return data
  },
  SERVICE_UNAVAILABLE: function (data: any) {
    return data
  }
}
