/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-06 17:30:18
 * @FilePath: /union-ums-h5/types/global.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
export {}
declare global {
  interface ViteEnv {
    //启动端口号
    VITE_PORT: number
    //云测试环境
    VITE_APP_ENV: string
    //接口地址
    VITE_APP_BASE_URL: string
    //是否显示vconsole调试工具
    VITE_SHOW_VCONSOLE: boolean
    //打包是否去掉console
    VITE_DROP_CONSOLE: boolean
  }

  type Recordable<T = any> = Record<string, T>

  interface AnyObj {
    [key: string]: any
  }

  type KVInferG<T> = { [K in keyof T]: T[K] }

  type VoidG<T> = T | undefined | null

  type AsyncFunction = (...args: any[]) => Promise<void>

  type TFunction = (...args: any[]) => void

  //方法作为入参类型
  type AllFunction = AsyncFunction | TFunction
}
