<!--
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-14 10:25:22
 * @FilePath: /hzsnq-pro/src/components/NavBar/NavBar.vue
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
-->
<script setup lang="ts">
import { useUniFunction } from "@/hooks/useUniFunction"
import { usePages } from "@/hooks/usePages"

interface NavbarProps {
  backgroundColor: string
  title: string
  textColor: string
}
const { customBar, statusBar } = usePages()
const props = withDefaults(defineProps<NavbarProps>(), {
  backgroundColor: "#fff",
  title: "",
  textColor: "#000"
})

const { backToOne } = useUniFunction()

const navbarStyle = computed(() => {
  return {
    background: props.backgroundColor,
    color: props.textColor,
    height: `${customBar.value}px`,
    paddingTop: `${statusBar.value}px`
  }
})

const textColorStyle = computed(() => {
  return {
    color: props.textColor
  }
})

const heightStyle = computed(() => {
  return {
    height: `${customBar.value}px`
  }
})

const back = () => {
  backToOne()
}
</script>

<template>
  <view class="navbar" :style="heightStyle">
    <view class="fixed flex justify-between align-center" :style="navbarStyle">
      <view class="left" @click="back">
        <view class="left-arrow" />
      </view>
      <view class="content" :style="textColorStyle">
        {{ props.title }}
      </view>
      <view class="right" />
    </view>
  </view>
</template>

<style scoped lang="less">
.navbar {
  width: 100%;
  .fixed {
    max-width: 750rpx;
    width: 100%;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
  }

  .left {
    width: 44rpx;
    margin-left: 24rpx;
    position: relative;
    z-index: 1001;

    .left-arrow {
      width: 44rpx;
      height: 44rpx;
      background: url(https://mp-c1063ab6-7fcb-415c-a4e6-09ceab9d0918.cdn.bspapp.com/cloudstorage/60ed7030-a6c9-4b20-8e8b-e18ddda29454.png)
        no-repeat;
      background-size: 100% 100%;
    }
  }

  .right {
    width: 44rpx;
    margin-right: 24rpx;
  }

  .content {
    font-size: 28rpx;
    font-weight: 400;
  }
}
</style>
