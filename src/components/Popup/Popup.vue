<!--
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-22 22:17:17
 * @FilePath: /union-ums-h5/src/components/Popup/Popup.vue
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
-->
<script setup lang="ts">
interface PopupProps {
  visible: boolean
}

const props = withDefaults(defineProps<PopupProps>(), {
  visible: false
})

const moveHandle = () => {}
</script>

<template>
  <view :class="props.visible ? 'popup show' : 'popup'" @touchmove.stop.prevent="moveHandle">
    <view class="dialog">
      <slot name="content" />
    </view>
  </view>
</template>

<style scoped lang="less">
.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 11100;
  opacity: 0;
  outline: 0;
  text-align: center;
  -ms-transform: scale(1.185);
  transform: scale(1.185);
  backface-visibility: hidden;
  perspective: 2000rpx;
  background: rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease-in-out 0s;
  pointer-events: none;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.popup::before {
  content: "\200B";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.popup.show {
  opacity: 1;
  transition-duration: 0.3s;
  -ms-transform: scale(1);
  transform: scale(1);
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;
}

.dialog {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  //overflow: hidden;
}
</style>
