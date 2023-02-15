/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-17 18:14:02
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-14 18:21:44
 * @FilePath: /hzsnq-pro/src/api/room/api.room.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import http from "@/server/httpGateway"

const methods = {
  createOrUpdateRoom: "/room",
  getRoomUser: "/roomUser",
  barrage: "/barrage"
}

/**
 * @description 创建或者修改房间
 * @param query 入参
 */
export function createOrUpdateRoom(query: object) {
  return http.post({
    method: methods.createOrUpdateRoom,
    obj: { data: query }
  })
}

/**
 * @description 获取房间内的用户
 * @param query 入参
 */
export function getRoomUser(query: object) {
  return http.post({
    method: methods.getRoomUser,
    obj: { data: query }
  })
}

/**
 * @description 获取房间内的用户
 * @param query 入参
 */
export function barrage(query: object) {
  return http.post({
    method: methods.barrage,
    obj: { data: query }
  })
}

export const roomApi = {
  createOrUpdateRoom,
  getRoomUser,
  barrage
}
