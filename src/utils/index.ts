/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-13 19:04:34
 * @FilePath: /hzsnq-pro/src/utils/index.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import type { InjectionKey } from "vue"
import { inject } from "vue"

/**
 * @description:  处理inject注入属性 undefined 问题
 */
export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }
  return resolved
}

/***
 * @description vite动态加载静态资源图片
 * @params string name - 图片名称
 */
export function dynamicGetImg(name: string) {
  if (!name) return
  try {
    return new URL(`../static/images/${name}`, import.meta.url).href
  } catch (error) {
    console.log(error)
  }
}

/**
 * @description:  获取当前时间的时间戳
 */
export function getNowFormatDate(): string {
  //时间戳
  const Dates = new Date()
  //年份
  const Year = Dates.getFullYear()
  //星期
  // const data: number = Dates.getDay()
  //月份下标是0-11
  const Months = Dates.getMonth() + 1 < 10 ? "0" + (Dates.getMonth() + 1) : Dates.getMonth() + 1
  //具体的天数
  const Day = Dates.getDate() < 10 ? "0" + Dates.getDate() : Dates.getDate()
  //小时
  const Hours = Dates.getHours() < 10 ? "0" + Dates.getHours() : Dates.getHours()
  //分钟
  const Minutes = Dates.getMinutes() < 10 ? "0" + Dates.getMinutes() : Dates.getMinutes()
  //秒
  const Seconds = Dates.getSeconds() < 10 ? "0" + Dates.getSeconds() : Dates.getSeconds()
  return `${Year}-${Months}-${Day} ${Hours}:${Minutes}:${Seconds}`
}

/**
 * @description:  深拷贝方法
 * @param source 需要拷贝的源
 */
export function deepClone<T>(source: T): T {
  return Array.isArray(source)
    ? source.map((item) => deepClone(item))
    : source instanceof Date
    ? new Date(source.getTime())
    : source && typeof source === "object"
    ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
        Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!)
        o[prop] = deepClone((source as { [key: string]: any })[prop])
        return o
      }, Object.create(Object.getPrototypeOf(source)))
    : (source as T)
}

/**
 * @description 生成数字加字母的随机字符串
 * @param {number} len
 * @param {string} charSet 可选
 * @return {*}
 */
export function randomString(len: number, charSet?: string): string {
  charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let randomString = ""
  for (let i = 0; i < len; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length)
    randomString += charSet.substring(randomPoz, randomPoz + 1)
  }
  return randomString
}
