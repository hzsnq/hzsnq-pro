/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-23 10:02:42
 * @FilePath: /union-ums-h5/src/server/signGateway.ts
 * @Description:加签方法
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import MD5 from "crypto-js/md5"
import { wrapperEnv } from "@/utils/env"

const { VITE_SERVER_KEY } = wrapperEnv

/**
 * @description ASCII排序，生成加签明文
 * @param {any} data
 * @return {*}
 */
const sortJson = (data: any) => {
  data = data || "{}"
  const arr: Array<any> = []
  for (const key in data) {
    arr.push(key)
  }
  arr.sort()
  let str = ""
  for (const i in arr) {
    if (data[arr[i]] !== "" && data[arr[i]] != null && data[arr[i]] != undefined) {
      str += arr[i] + "=" + data[arr[i]] + "&"
    }
  }
  str = str.substring(0, str.length - 1)
  return str
}

/**
 * @description 加签方法
 * @param {object} bodyParam
 * @param {string} signType
 * @return {*}
 */
export const sign = (bodyParam: object, signType: string) => {
  const bodyParams = sortJson(bodyParam)
  let md5Value = ""
  let str = ""
  if (signType === "MD5") {
    str = bodyParams + "&key=" + VITE_SERVER_KEY
    md5Value = MD5(str).toString()
  } else if (signType === "RSA2") {
    // str = bodyParam + '&key=' + key
    // md5Value = CryptoJS_one.HmacSHA256(str, key).toString()
  } else {
    console.log("加密类型错误")
  }
  return md5Value.toUpperCase()
}
