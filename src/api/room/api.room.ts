/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-17 18:14:02
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-17 14:24:00
 * @FilePath: /hzsnq-pro/src/api/room/api.room.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import http from "@/server/httpGateway"

const methods = {
  createRoom: "/room/add",
  updateRoom: "/room/update",
  getRoom: "/room/get",
  getRoomUser: "/roomUser/get",
  addRoomUser: "/roomUser/add",
  updateRoomUser: "/roomUser/update",
  addBarrage: "/barrage/add",
  getBarrage: "/barrage/get"
}

/**
 * @description 创建或者修改房间
 * @param query 入参
 */
export function createRoom(query: object) {
  return http.post({
    method: methods.createRoom,
    obj: { data: query }
  })
}

/**
 * @description 创建或者修改房间
 * @param query 入参
 */
export function updateRoom(query: object) {
  return http.post({
    method: methods.updateRoom,
    obj: { data: query }
  })
}

/**
 * @description 创建或者修改房间
 * @param query 入参
 */
export function getRoom(query: object) {
  return http.post({
    method: methods.getRoom,
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
 * @description 添加房间内的用户
 * @param query 入参
 */
export function addRoomUser(query: object) {
  return http.post({
    method: methods.addRoomUser,
    obj: { data: query }
  })
}

/**
 * @description 用户添加信息
 * @param query 入参
 */
export function addBarrage(query: object) {
  return http.post({
    method: methods.addBarrage,
    obj: { data: query }
  })
}

/**
 * @description 用户添加信息查询
 * @param query 入参
 */
export function getBarrage(query: object) {
  return http.post({
    method: methods.getBarrage,
    obj: { data: query }
  })
}

/**
 * @description 推出房间
 * @param query 入参
 */
export function updateRoomUser(query: object) {
  return http.post({
    method: methods.updateRoomUser,
    obj: { data: query }
  })
}

export const roomApi = {
  createRoom,
  updateRoom,
  getRoom,
  getRoomUser,
  addRoomUser,
  addBarrage,
  getBarrage,
  updateRoomUser
}
