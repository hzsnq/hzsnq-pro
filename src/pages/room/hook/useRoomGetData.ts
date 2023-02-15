/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-15 13:16:54
 * @FilePath: /hzsnq-pro/src/pages/room/hook/useRoomGetData.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */

import { useUser } from "@/hooks/useUser"
import { usePages } from "@/hooks/usePages"
import { useUniFunction } from "@/hooks/useUniFunction"

// 暴露hook函数
export function useRoomGetData() {
  const { userInfo } = useUser()
  const { systemInfo, pageInit } = usePages()
  const { backToOne } = useUniFunction()

  const state = reactive({
    roomInfo: {} as AnyObj,
    roomUserInfo: [] as Array<AnyObj>,
    testValue: "",
    userPushId: [] as Array<string>,
    barrageList: [] as Array<AnyObj>,
    scrollIntoView: ""
  })

  const { roomInfo, roomUserInfo, testValue, userPushId, barrageList, scrollIntoView } = toRefs(state)

  /**
   * @description 通过房间id查询房间信息
   * @param {string} id
   * @return {*}
   */
  async function getRoomById(id: string): Promise<any> {
    const params = {
      id: id,
      type: "get"
    }
    const res: any = await api.createOrUpdateRoom(params)
    const { data } = res
    console.log("房间信息 by id", data)
    roomInfo.value = data
    if (!data.room_qrcode) {
      getCode(data._id)
    }
    getRoomUser(id)
    getBarrage()
  }

  /**
   * @description 创建房间小程序码
   * @param {string} id
   * @return {*}
   */
  const getCode = async (id: string): Promise<any> => {
    const params = {
      page: "pages/room/index",
      scene: `room=${id}`,
      envVersion: `${systemInfo.value.miniProgram.envVersion}`
    }
    const res: any = await api.getQrCode(params)
    const { code, data } = res
    console.log("房间二维码", data?.fileID)
    if (code === "000") {
      saveRoomQrcode(data?.fileID)
    }
  }

  /**
   * @description 添加二维码
   * @param {string} qrcode
   * @return {*}
   */
  async function saveRoomQrcode(qrcode: string): Promise<any> {
    const params = {
      roomQrcode: qrcode,
      id: roomInfo.value._id,
      type: "edit"
    }
    const res: any = await api.createOrUpdateRoom(params)
    const { data } = res
    roomInfo.value = data
    console.log("添加二维码返回", data)
  }

  /**
   * @description 获取房间内的用户
   * @return {*}
   */
  async function getRoomUser(id: string): Promise<any> {
    const params = {
      roomId: id,
      type: "get"
    }

    const res: any = await api.getRoomUser(params)
    const { data } = res
    roomUserInfo.value = data
    const arr = data.map((item: any) => {
      // console.log(item)
      return item.user_id[0].push_clientid
    })
    userPushId.value = arr
    console.log("查询房间用户信息", data)
    addRoomUser()
  }

  /**
   * @description 房间加人
   * @return {*}
   */
  async function addRoomUser(): Promise<any> {
    if (userInfo.value?._id) {
      console.log("用户id", userInfo.value._id)
      // console.log("用户信息", roomUserInfo.value)
      if (roomUserInfo.value.length >= 4) {
        console.log("房间人满了")
        backToOne()
        return
      }
      const index = roomUserInfo.value.findIndex((i: any) => {
        return userInfo.value._id === i?.user_id[0]._id
      })
      console.log(index)
      if (index < 0) {
        const params = {
          roomId: roomInfo.value._id,
          userId: userInfo.value._id,
          type: "add"
        }
        const res: any = await api.getRoomUser(params)
        const { code } = res
        if (code === "000") {
          console.log("用户加入成功")
          userPushId.value.push(userInfo.value?.push_clientid)
          pushFn()
        } else {
          console.log("用户加入失败")
          backToOne()
        }
      } else {
        console.log("已加入房间")
        return
      }
    } else {
      console.log("无用户id")
    }
  }

  /**
   * @description 发送弹幕
   * @return {*}
   */
  async function barrage(): Promise<any> {
    if (!testValue.value) return
    const params = {
      roomId: roomInfo.value._id,
      userId: userInfo.value._id,
      text: testValue.value,
      type: "add"
    }

    const res: any = await api.barrage(params)
    const { code } = res
    if (code === "000") {
      pushFn()
    }
    testValue.value = ""
    console.log("添加弹幕", code)
  }

  const pushFn = async () => {
    console.log("推送id", userPushId.value)

    const params = {
      id: userPushId.value
    }
    const res: any = await api.push(params)
    // const { data } = res
    console.log(res)

    // avatarUrl.value = data?.fileID
    // console.log(res)
  }

  /**
   * @description 获取房间内的用户
   * @return {*}
   */
  async function getBarrage(): Promise<any> {
    scrollIntoView.value = ""
    const params = {
      roomId: roomInfo.value._id,
      type: "get"
    }

    const res: any = await api.barrage(params)
    const { code, data } = res
    if (code === "000") {
      barrageList.value = data
      nextTick(() => {
        scrollIntoView.value = "bottom"
      })
    }
    console.log("获取弹幕", data)
  }

  watch(
    () => userInfo.value,
    (data) => {
      console.log("watch", data)
      addRoomUser()
      // getUserRoom()
    }
  )
  // 返回数据
  return {
    userInfo,
    roomInfo,
    roomUserInfo,
    testValue,
    barrageList,
    scrollIntoView,
    getRoomById,
    getRoomUser,
    barrage,
    getBarrage,
    pageInit
  }
}
