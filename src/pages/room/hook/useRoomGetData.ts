/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-17 16:49:29
 * @FilePath: /hzsnq-pro/src/pages/room/hook/useRoomGetData.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */

import { useUser } from "@/hooks/useUser"
import { usePages } from "@/hooks/usePages"
import { useUniFunction } from "@/hooks/useUniFunction"
import { usePush } from "@/hooks/usePush"

// 暴露hook函数
export function useRoomGetData() {
  const { userInfo, updatePushId } = useUser()
  const { systemInfo, pageInit } = usePages()
  const { backToOne, showToastFn } = useUniFunction()
  const { userPushId, listener, pushFn } = usePush()

  const state = reactive({
    roomInfo: {} as AnyObj,
    roomUserInfo: [] as Array<AnyObj>,
    testValue: "",
    barrageList: [] as Array<AnyObj>,
    scrollIntoView: ""
  })

  const { roomInfo, roomUserInfo, testValue, barrageList, scrollIntoView } = toRefs(state)

  /**
   * @description 通过房间id查询房间信息
   * @param {string} id
   * @return {*}
   */
  async function getRoomById(id: string): Promise<any> {
    const params = {
      roomId: id
    }
    const res: any = await api.getRoom(params)
    const { data, code } = res
    console.log("房间信息 by id", data)
    if (code === "000") {
      roomInfo.value = data
      if (!data.room_qrcode) {
        getCode(data._id)
      }
      getRoomUser()
      updatePushId()
      getBarrage()
    } else {
      backToOne()
    }
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
      roomId: roomInfo.value._id
    }
    const res: any = await api.updateRoom(params)
    const { data } = res
    roomInfo.value = data
    console.log("添加二维码返回", data)
  }

  /**
   * @description 关闭房间
   * @return {*}
   */
  async function closeRoom(): Promise<any> {
    const params = {
      roomId: roomInfo.value._id
    }
    const res: any = await api.updateRoom(params)
    const { data, code } = res
    if (code === "000") {
      roomInfo.value = data
      console.log("关闭房间", data)
      pushFn("closeRoomFn")
      backToOne()
    }
  }

  /**
   * @description 推出房间
   * @return {*}
   */
  async function outRoom(): Promise<any> {
    const params = {
      roomId: roomInfo.value._id,
      userId: userInfo.value._id
    }
    const res: any = await api.updateRoomUser(params)
    const { data, code } = res
    if (code === "000") {
      console.log("推出房间", data)
      pushFn("getRoomUserFn")
      backToOne()
    }
  }

  /**
   * @description 获取房间内的用户
   * @return {*}
   */
  async function getRoomUser(): Promise<any> {
    const params = {
      roomId: roomInfo.value._id
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
      // console.log("用户id", userInfo.value._id)
      // console.log("用户信息", roomUserInfo.value)
      if (roomUserInfo.value.length >= 4) {
        console.log("房间人满了")
        backToOne()
        return
      }
      if (roomUserInfo.value.length === 0) {
        console.log("房间人数不正确")
        // backToOne()
        return
      }
      if (!roomUserInfo.value) {
        console.log("房间人数不正确")
        // backToOne()
        return
      }
      const index = roomUserInfo.value.findIndex((i: any) => {
        return userInfo.value._id === i?.user_id[0]._id
      })
      console.log(index)
      if (index < 0) {
        const params = {
          roomId: roomInfo.value._id,
          userId: userInfo.value._id
        }
        const res: any = await api.addRoomUser(params)
        const { code, message } = res
        if (code === "000") {
          console.log("用户加入成功")
          userPushId.value.push(userInfo.value?.push_clientid)
          pushFn("getRoomUserFn")
        } else {
          showToastFn(message, backToOne)
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
      text: testValue.value
    }

    const res: any = await api.addBarrage(params)
    const { code } = res
    if (code === "000") {
      pushFn("getBarrageFn")
    }
    testValue.value = ""
    console.log("添加弹幕", code)
  }

  /**
   * @description 获取房间内的用户
   * @return {*}
   */
  async function getBarrage(): Promise<any> {
    scrollIntoView.value = ""
    const params = {
      roomId: roomInfo.value._id
    }

    const res: any = await api.getBarrage(params)
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
      // addRoomUser()
      getRoomUser()
    }
  )

  /***
   * @description 监听回调方法策略
   */
  const strategies: AnyObj = {
    getRoomUserFn: () => {
      console.log("getRoomUser")
      getRoomUser()
    },
    getBarrageFn: () => {
      console.log("getBarrage")
      getBarrage()
    },
    closeRoomFn: () => {
      console.log("closeRoomFn")
      showToastFn("房主关闭房间", backToOne)
    }
  }

  const roomListener = listener(strategies)

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
    pageInit,
    closeRoom,
    listener,
    roomListener,
    outRoom
  }
}
