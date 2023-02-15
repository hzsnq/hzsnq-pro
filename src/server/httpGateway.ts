/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-22 11:06:34
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-12 21:32:56
 * @FilePath: /hzsnq-pro/src/server/httpGateway.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import { sign } from "./signGateway"
import { wrapperEnv } from "@/utils/env"
import { showLoading, hideLoading } from "./serviceLoading"
import { getCommonParams } from "./commonParams"
import interceptorData from "./interceptors"

const { VITE_APP_BASE_URL } = wrapperEnv
const requestUrl = VITE_APP_BASE_URL

const httpRequestGateway = (method: Http.method, headersMethod: string, query: AnyObj) => {
  return new Promise((resolve, reject) => {
    showLoading()

    /**
     * @description 成功回调方法
     * @param {any} response
     * @return {*}
     */
    const appNetworkResponseResolve = (response: UniNamespace.RequestSuccessCallbackResult): any => {
      const toastFn = hideLoading()
      const data = interceptorData(response)
      if (data.code !== "000") {
        toastFn(data.message || "")
      }
      data.data = data?.data?.data ? data?.data?.data : data?.data
      resolve(data)
    }

    /**
     * @description 失败回调方法
     * @param {any} response
     * @return {*}
     */
    const appNetworkResponseReject = (response: UniNamespace.GeneralCallbackResult): any => {
      const toastFn = hideLoading()
      toastFn(`网络不给力，请检查您的网络设置~`)
      reject(response)
    }

    //成功或失败都会调用
    const appNetworkResponseComplete = () => {}

    //请求header
    const headers = {
      "content-type": method === "POST" ? "application/json" : "application/x-www-form-urlencoded"
    }

    //data统一处理成字符串
    query.data = JSON.stringify(query.data)

    //请求参数加签
    query.sign = sign(query, query.sign_type)

    uni.request({
      url: `${requestUrl}${headersMethod}`,
      method: method,
      data: query,
      header: headers,
      success: appNetworkResponseResolve,
      fail: appNetworkResponseReject,
      complete: appNetworkResponseComplete
    })
  })
}

const http = {
  get: <T>(params: Http.Params) =>
    httpRequestGateway("GET", params.method, { ...getCommonParams(), ...params.obj }) as Http.Response<T>,
  post: <T>(params: Http.Params) =>
    httpRequestGateway("POST", params.method, { ...getCommonParams(), ...params.obj }) as Http.Response<T>
}

export default http
