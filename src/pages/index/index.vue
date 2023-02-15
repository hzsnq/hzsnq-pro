<!--
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-14 11:54:59
 * @FilePath: /hzsnq-pro/src/pages/index/index.vue
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
-->
<script setup lang="ts">
import { usePages } from "@/hooks/usePages"
import { useIndex } from "./hooks/useIndex"

//导入页面公共方法hook
const { pageInit } = usePages()
const { roomInfo, getUserRoom, createRoom } = useIndex()
pageInit()

const pushId = ref("")
const avatarUrl = ref(
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
)

// const onChooseAvatar = async (e: any) => {
//   const { avatarUrl: n } = e.detail
//   avatarUrl.value = n
//   const base64 = uni.getFileSystemManager().readFileSync(n, "base64")
//   const result: any = await api.upload({ path: base64 })
//   const { data } = result
//   avatarUrl.value = data.fileID
// }
onLoad(() => {
  // const scene = decodeURIComponent(option?.scene)
  // console.log("scene", typeof scene)
  // uni.getPushClientId({
  //   success: (res) => {
  //     let push_clientId = res.cid
  //     pushId.value = res.cid
  //     console.log("客户端推送标识:", push_clientId)
  //   },
  //   fail(err) {
  //     console.log(err)
  //   }
  // })
  // uni.onPushMessage((res) => {
  //   console.log(res)
  // })
})

onShow(() => {
  getUserRoom()
})
const pushFn = async (id: string) => {
  const params = {
    id: [id]
  }
  const res: any = await api.push(params)
  // const { data } = res
  console.log(res)

  // avatarUrl.value = data?.fileID
  // console.log(res)
}

const getCode = async () => {
  const params = {
    page: "pages/room/index",
    scene: "room=63ea24e9e1a35c87859a0a41"
  }
  const res: any = await api.getQrCode(params)
  const { data } = res
  avatarUrl.value = data?.fileID
  console.log(res)
}

const handleSend = async () => {
  pushFn(pushId.value)
}

const handleRoom = async () => {
  if (roomInfo.value?._id) {
    console.log("打开房间")
    uni.navigateTo({
      url: `/pages/room/index?roomId=${roomInfo.value._id}`
    })
  } else {
    createRoom()
  }
}
</script>

<template>
  <view class="index">
    <!-- <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="avatar" :src="avatarUrl" />
    </button> -->
    <image :src="avatarUrl" />
    <view class="btn" @click="getCode">生成二维码</view>
    <input type="nickname" placeholder="请输入昵称" />
    <view class="btn" @click="handleSend">发送信息</view>
    <view class="btn" @click="handleRoom">
      {{ roomInfo?._id ? "打开房间" : "创建房间" }}
    </view>
  </view>
</template>

<style lang="less">
.index {
  .content {
    width: 750rpx;
    margin: 0 auto;
    color: #fff;

    .box {
      width: 100%;
      position: fixed;
      left: 0;
      height: 100rpx;
      background: #000;
    }
  }

  .btn {
    width: 300rpx;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    background-color: red;
  }
}
</style>
