/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-17 18:14:02
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-23 10:20:34
 * @FilePath: /union-ums-h5/src/server/commonParams.ts
 * @Description：公共请求参数处理
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import { getNowFormatDate } from "@/utils"

const commonParams = {
  appid: "",
  charset: "UTF-8",
  data: "",
  format: "JSON",
  req_no: new Date().getTime(),
  sign_type: "MD5",
  timestamp: getNowFormatDate(),
  version: "1.0",
  sign: ""
}

/**
 * @description 返回公共请求参数
 * @return {*}
 */
export function getCommonParams(): any {
  return Object.assign({}, commonParams)
}

/**
 * @description: 添加公共请求参数
 * @param {Object} params
 * @return {*}
 */
export function setCommonParams(params: Object): any {
  Object.assign(commonParams, params)
}
