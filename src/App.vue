<!--
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-17 17:15:03
 * @FilePath: /hzsnq-pro/src/App.vue
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
-->
<script setup lang="ts">
import { useUser } from "./hooks/useUser"
import { usePages } from "./hooks/usePages"
const { isLogin } = useUser()
const { getSystemInfo, getSystem } = usePages()
onLaunch(() => {
  getSystemInfo()
  getSystem()
  isLogin(() => {})
})
onShow(() => {
  console.log("App Show")
})
onHide(() => {
  console.log("App Hide")
})
</script>
<style>
@import url("./style/common.less");
</style>
