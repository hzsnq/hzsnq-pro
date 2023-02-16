<!--
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-16 13:53:53
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

onLoad(() => {})

onShow(() => {
  getUserRoom()
})

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
    <!-- <image :src="avatarUrl" />
    <view class="btn" @click="getCode">生成二维码</view>
    <input type="nickname" placeholder="请输入昵称" />
    <view class="btn" @click="handleSend">发送信息</view> -->
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
