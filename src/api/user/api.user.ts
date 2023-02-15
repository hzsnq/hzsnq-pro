/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-17 18:14:02
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-13 18:06:38
 * @FilePath: /hzsnq-pro/src/api/user/api.user.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import http from "@/server/httpGateway"

const methods = {
  loginOrRegister: "/login",
  upload: "/upload",
  getQrCode: "/getQrCode",
  push: "/push"
}

/**
 * @description 静默登录
 * @param query 入参
 */
export function loginOrRegister(query: object) {
  return http.post({
    method: methods.loginOrRegister,
    obj: { data: query }
  })
}

/**
 * @description 上传文件
 * @param query 入参
 */
export function upload(query: object) {
  return http.post({
    method: methods.upload,
    obj: { data: query }
  })
}

/**
 * @description 上传文件
 * @param query 入参
 */
export function getQrCode(query: object) {
  return http.post({
    method: methods.getQrCode,
    obj: { data: query }
  })
}

/**
 * @description 推送消息
 * @param query 入参
 */
export function push(query: object) {
  return http.post({
    method: methods.push,
    obj: { data: query }
  })
}

export const userApi = {
  loginOrRegister,
  upload,
  getQrCode,
  push
}
