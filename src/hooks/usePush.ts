/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-16 19:16:18
 * @FilePath: /hzsnq-pro/src/hooks/usePush.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */

// 暴露hook函数
export function usePush() {
  const userPushId = ref<string[]>([])

  const pushFn = async (fnName: string) => {
    const params = {
      id: userPushId.value,
      fnName: fnName
    }
    const res: any = await api.push(params)
    const { data } = res
    console.log("发送推送信息", data)
  }

  /**
   * @description 推送方法，返回一个接受推送的匿名函数
   * @param {AnyObj} strategies 接送推送操作的策略
   * @return {*}
   */
  function listener(strategies: AnyObj): any {
    return (res?: any) => {
      const { data } = res
      console.log("222", data)
      if (data.payload.hasOwnProperty("fnName")) {
        strategies[res.data.payload.fnName]()
      }
    }
  }
  // 返回数据
  return { userPushId, pushFn, listener }
}
