<!--
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-23 17:36:06
 * @FilePath: /union-ums-h5/src/components/Avatar/Avatar.vue
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
-->
<script setup lang="ts">
import { dynamicGetImg } from "@/utils"
import { isValidURL } from "@/utils/validate"

interface Avatar {
  src: string
  width: string
  height: string
}

const props = withDefaults(defineProps<Avatar>(), {
  src: "",
  size: "",
  height: ""
})

const style = computed(() => {
  return {
    width: props.width,
    height: props.height
  }
})

const imgPath = computed(() => {
  return isValidURL(props.src) ? props.src : dynamicGetImg(props.src)
})
</script>

<template>
  <image v-if="imgPath" class="avatar" :src="imgPath" :style="style" />
</template>

<style scoped lang="less">
.avatar {
  display: block;
  border-radius: 50%;
}
</style>
