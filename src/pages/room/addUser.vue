<!--
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-18 11:36:33
 * @FilePath: /hzsnq-pro/src/pages/room/addUser.vue
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
-->
<script setup lang="ts">
import { usePages } from "@/hooks/usePages"

//导入页面公共方法hook
const { pageInit } = usePages()
pageInit()

onLoad(() => {})

// onShow(() => {
//   getUserRoom()
// })

const handleRoom = async () => {
  // if (roomInfo.value?._id) {
  //   console.log("打开房间")
  //   uni.navigateTo({
  //     url: `/pages/room/index?roomId=${roomInfo.value._id}`
  //   })
  // } else {
  //   createRoom()
  // }
}
</script>

<template>
  <view class="index">
    <view class="content">
      <image
        class="cover-img"
        src="https://mp-c1063ab6-7fcb-415c-a4e6-09ceab9d0918.cdn.bspapp.com/cloudstorage/8facdf1f-8dfd-4453-8ee3-22ea0e410706.png"
        mode="aspectFill"
      />
      <view class="btn" @click="handleRoom"> 接受邀请 </view>
    </view>
  </view>
</template>

<style lang="less">
.index {
  .content {
    width: 750rpx;
    min-height: 100vh;
    margin: 0 auto;
    position: relative;
    // background: #7aac5f;
    // color: #fff;

    .cover-img {
      width: 750rpx;
      min-height: 100vh;
      display: block;
    }

    .btn {
      width: 140rpx;
      height: 140rpx;
      position: absolute;
      font-size: 26rpx;
      bottom: 330rpx;
      left: 50%;
      margin-left: -70rpx;
      // background: rgba(0, 0, 0, 0.3);
      background: linear-gradient(45deg, #39b54a, #8dc63f);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #f9f8e9;
      animation: styles 1.5s ease-out infinite;
    }

    @keyframes styles {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      20% {
        box-shadow: 0 0 0 4rpx rgba(0, 0, 0, 0.2);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
      }
      80% {
        box-shadow: 0 0 0 8rpx rgba(0, 0, 0, 0);
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
  }
}
</style>
