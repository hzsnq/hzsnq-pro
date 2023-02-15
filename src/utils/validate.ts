/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-23 20:55:37
 * @FilePath: /union-ums-h5/src/utils/validate.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

export const isArray = (arg: any) => {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]"
  }
  return Array.isArray(arg)
}

/***
 * @description 判断是否是网址
 * @params string url - 地址
 */
export const isValidURL = (url: string) => {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/***
 * @description 判断是否是手机号
 * @params string phone - 手机号
 */
export const isPhone = (phone: string) => {
  const myReg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/
  return myReg.test(phone)
}

/***
 * @description 表单校验规则
 */
const strategies: AnyObj = {
  isNonEmpty: function (obj: AnyObj) {
    if (obj.value === "") {
      return obj.errMsg
    }
  },
  minLength: function (obj: AnyObj) {
    if (obj.value.length < obj.minLength) {
      return obj.errMsg
    }
  },
  maxLength: function (obj: AnyObj) {
    if (obj.value.length > obj.maxLength) {
      return obj.errMsg
    }
  },
  isMobile: function (obj: AnyObj) {
    if (!isPhone(obj.value)) {
      return obj.errMsg
    }
  }
}

/***
 * @description 表单校验类
 */
export class Validator {
  /* 私有的仅在当前类可访问和修改 */
  private cache: Array<any>
  // 构造函数
  constructor() {
    this.cache = []
  }

  add(obj: AnyObj) {
    this.cache.push(() => {
      return strategies[obj.name](obj)
    })
  }

  start() {
    for (let i = 0; i < this.cache.length; i++) {
      const msg = this.cache[i]()
      if (msg) return msg
    }
  }
}
