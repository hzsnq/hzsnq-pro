/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-02-03 15:18:03
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-06 16:55:45
 * @FilePath: /union-ums-h5/src/hooks/useValidator.ts
 * @Description:fun
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */

import { Validator } from "@/utils/validate"

export function useValidator() {
  /**
   * @description 校验规则，有入参方法时执行方法，没有入参方法返回true or false
   * @param {Array} rules 校验数组
   * @param {AnyObj} params 可选，执行方法入参
   * @param {AllFunction} fn 可选，执行方法
   * @return {*}
   */
  function validatorFn(rules: Array<any>, params?: AnyObj, fn?: AllFunction): any {
    const validator = new Validator()
    rules.forEach((rule: AnyObj) => {
      validator.add(rule)
    })
    const errMsg = validator.start()
    if (errMsg) {
      uni.showToast({
        icon: "none",
        title: errMsg
      })
      return false
    }
    if (fn) {
      fn(params)
    } else {
      return true
    }
  }
  return { validatorFn }
}
