/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-22 21:50:01
 * @FilePath: /union-ums-h5/build/utils.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n")
    realName = realName === "true" ? true : realName === "false" ? false : realName

    //启动端口
    if (envName === "VITE_PORT") {
      realName = Number(realName)
    }
    //代理配置
    // if (envName === 'VITE_PROXY' && realName) {
    //     try {
    //         realName = JSON.parse(realName.replace(/'/g, '"'));
    //     } catch (error) {
    //         realName = '';
    //     }
    // }
    ret[envName] = realName
    if (typeof realName === "string") {
      process.env[envName] = realName
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}
