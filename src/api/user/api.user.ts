/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-17 18:14:02
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-16 15:06:22
 * @FilePath: /hzsnq-pro/src/api/user/api.user.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import http from "@/server/httpGateway"

const methods = {
  loginOrRegister: "/user/add",
  getUser: "/user/get",
  updateUser: "/user/update",
  upload: "/upload",
  addQrCode: "/qrCode/add",
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
 * @description 获取用户信息
 * @param query 入参
 */
export function getUser(query: object) {
  return http.post({
    method: methods.getUser,
    obj: { data: query }
  })
}

/**
 * @description 更改用户信息
 * @param query 入参
 */
export function updateUser(query: object) {
  return http.post({
    method: methods.updateUser,
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
    method: methods.addQrCode,
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
  getUser,
  updateUser,
  upload,
  getQrCode,
  push
}
