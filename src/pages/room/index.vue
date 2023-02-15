<!--
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-15 15:26:47
 * @FilePath: /hzsnq-pro/src/pages/room/index.vue
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
-->
<script setup lang="ts">
import NavBar from "@/components/NavBar/NavBar.vue"
import Popup from "@/components/Popup/Popup.vue"
import { userInfo } from "os"

import { useRoomGetData } from "./hook/useRoomGetData"

//导入页面公共方法hook
const {
  userInfo,
  roomInfo,
  roomUserInfo,
  testValue,
  barrageList,
  scrollIntoView,
  getRoomById,
  barrage,
  getBarrage,
  pageInit,
  getRoomUser
} = useRoomGetData()
pageInit()
const showPop = ref(false)

const state = reactive({
  navbar: {
    backgroundColor: "linear-gradient(45deg, #0081ff, #1cbbb4)",
    title: `${roomInfo.value?.room_name || "未知的房间"}`,
    textColor: "#fff"
  } as AnyObj,
  roomId: ""
})

const { navbar, roomId } = toRefs(state)

onLoad((option) => {
  console.log("room option", option)
  const scene = option?.scene ? decodeURIComponent(option.scene).split("=")[1] : undefined
  roomId.value = option?.roomId ? option.roomId : scene ? scene : ""
  uni.onPushMessage((res) => {
    console.log("push", res)
    getRoomUser(roomId.value)
    getBarrage()
  })
})

onShow(() => {
  getRoomById(roomId.value)
})

watch(
  () => roomInfo.value,
  () => {
    // console.log("watch")
    navbar.value.title = `${roomInfo.value?.room_name || "未知的房间"}`
  }
)

const showPopFn = () => {
  showPop.value = !showPop.value
}

const closeRoom = () => {
  console.log(roomInfo.value)
  if (roomInfo.value.create_user === userInfo.value._id) {
    console.log("关闭房间")
  } else {
    console.log("只有房主才能关闭房间")
    uni.showToast({
      icon: "none",
      title: "房主才可以关闭房间"
    })
  }
}

onShareAppMessage(() => {
  return {
    title: `${roomInfo.value?.room_name || "未知的房间"}`,
    path: `/pages/room/index?roomId=${roomInfo.value?._id || ""}`,
    imageUrl: `${roomInfo.value?.room_qrcode || ""}`
  }
})
</script>

<template>
  <view class="content">
    <NavBar v-bind="navbar" />
    <view class="flex align-center list">
      <view v-for="(item, index) in roomUserInfo" :key="index" class="item">
        <image class="avatar" :src="item.user_id[0].avatar_url" />
        <view class="text">{{ item.user_id[0].nick_name }}</view>
      </view>
      <view class="item" @click="showPopFn">
        <image
          class="avatar"
          src="https://mp-c1063ab6-7fcb-415c-a4e6-09ceab9d0918.cdn.bspapp.com/cloudstorage/7028fe6f-f585-4c5f-9177-039d4f667ee0.png"
        />
        <view class="text">邀请好友</view>
      </view>
    </view>
    <view class="input">
      <input v-model="testValue" placeholder="请输入" placeholder-class="act" />
      <view class="btn" @click="barrage">发送</view>
    </view>
    <view class="remark">
      <view class="title">留言板</view>
      <scroll-view class="scroll-remark" :scroll-y="true" scroll-with-animation :scroll-into-view="scrollIntoView">
        <view v-for="(item, index) in barrageList" :key="index" class="item">
          <view class="">
            <view class="flex justify-start align-center user">
              <image class="user-avatar" :src="item.user_id[0].avatar_url" />
              <view class="name">{{ item.user_id[0].nick_name }}</view>
            </view>
            <view class="text">{{ item.barrage_text }}</view>
            <view class="flex justify-between align-center">
              <view />
              <view>{{ item.create_date }}</view>
            </view>
          </view>
        </view>
        <view id="bottom" class="bottom" />
      </scroll-view>
    </view>
    <view class="flex justify-between align-center btn-list">
      <view class="btn" @click="closeRoom">关闭房间</view>
      <view class="btn">刷新房间</view>
      <view class="btn">分享房间</view>
    </view>
    <!-- <view class=""></view> -->
  </view>
  <Popup :visible="showPop">
    <template #content>
      <image v-show="roomInfo?.room_qrcode" class="img" :src="roomInfo?.room_qrcode" />
      <view class="close" @click="showPopFn">X</view>
    </template>
  </Popup>
</template>

<style lang="less">
.content {
  width: 750rpx;
  margin: 0 auto;
  color: #000;

  .list {
    padding: 20rpx;

    .item + .item {
      margin-left: 20rpx;
      text-align: center;
    }

    .avatar {
      width: 100rpx;
      height: 100rpx;
      display: block;
      border-radius: 50%;
      // border: 1rpx solid #e0e0e0;
    }

    .text {
      font-size: 26rpx;
      padding-top: 10rpx;
    }
  }

  .input {
    background: #e0e0e0;
    height: 100rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;

    input {
      width: 80%;
      height: 60rpx;
      font-size: 30rpx;
      background: #1cbbb4;
      border-radius: 5000rpx;
      padding-left: 30rpx;
      color: #fff;
    }

    .act {
      color: #fff;
    }

    .btn {
      width: 150rpx;
      background: #0081ff;
      color: #fff;
      text-align: center;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 5000rpx;
      margin-left: 20rpx;
    }
  }

  .remark {
    padding: 20rpx;
    // height: 800rpx;

    .scroll-remark {
      padding: 20rpx;
      height: 700rpx;
    }

    .title {
      font-size: 30rpx;
      padding-bottom: 20rpx;
    }

    .bottom {
      width: 100%;
      height: 1rpx;
    }

    .item {
      font-size: 26rpx;
      // height: 80rpx;
      padding: 20rpx;
      border-bottom: 1rpx solid #e0e0e0;

      .user {
        .user-avatar {
          width: 60rpx;
          height: 60rpx;
          display: block;
          border-radius: 50%;
        }

        .name {
          padding-left: 20rpx;
        }
      }

      .text {
        font-size: 30rpx;
        padding: 20rpx 80rpx;
      }
    }
  }

  .btn-list {
    padding: 20rpx;

    .btn {
      width: 200rpx;
      height: 80rpx;
      background: #0081ff;
      text-align: center;
      line-height: 80rpx;
      color: #fff;
      border-radius: 40rpx;
    }
  }
}

.img {
  display: block;
  width: 430rpx;
  height: 430rpx;
  margin: 20rpx auto;
}

.close {
  margin: 40rpx auto 0;
  color: #fff;
  font-size: 30rpx;
  width: 50rpx;
  height: 50rpx;
  text-align: center;
  line-height: 50rpx;
  border: 1rpx solid #fff;
  border-radius: 50%;
}
</style>
