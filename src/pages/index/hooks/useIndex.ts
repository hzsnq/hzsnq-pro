/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-16 14:43:46
 * @FilePath: /hzsnq-pro/src/pages/index/hooks/useIndex.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */

import { useUser } from "@/hooks/useUser"
import { randomString } from "@/utils/index"

// 暴露hook函数
export function useIndex() {
  const { userInfo } = useUser()

  const state = reactive({
    roomInfo: {} as AnyObj
  })

  const { roomInfo } = toRefs(state)

  async function getUserRoom() {
    // const params = {
    //   userId: userInfo.value._id,
    //   type: "get"
    // }
    // // console.log(params)
    // const res: any = await api.getRoom(params)
    // const { data } = res
    // // console.log("房间信息", data)
    // roomInfo.value = data

    const params = {
      userId: userInfo.value._id
    }
    // console.log(params)
    const res: any = await api.getRoomUser(params)
    const { data, code } = res
    console.log("房间信息", data)
    if (code === "000") {
      const item = data.find((i: any) => {
        return i.room_id[0]?._id
      })
      if (item) {
        roomInfo.value = item.room_id[0]
      } else {
        roomInfo.value = {}
      }
    }
  }

  async function createRoom() {
    const params = {
      roomName: `${userInfo.value.nick_name}的房间`,
      roomKey: randomString(4),
      roomQrcode: "",
      createUser: userInfo.value._id
    }
    // console.log(params)
    const res: any = await api.createRoom(params)
    const { data } = res
    console.log(data)
    getUserRoom()
  }

  watch(
    () => userInfo.value,
    () => {
      console.log("watch")
      getUserRoom()
    }
  )
  // 返回数据
  return { roomInfo, getUserRoom, createRoom }
}
