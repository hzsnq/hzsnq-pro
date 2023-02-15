/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-22 22:47:35
 * @FilePath: /union-ums-h5/src/env.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import {DefineComponent} from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'crypto-js/md5'
