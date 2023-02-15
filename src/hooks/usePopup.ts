/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-23 16:42:15
 * @FilePath: /union-ums-h5/src/hooks/usePopup.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */

import { PopupKey } from "@/symbols"
import { injectStrict } from "@/utils"

// 暴露hook函数
export function usePopup() {
  /**
   * @description 创建popup向下的provide
   * @param {PopupState} item
   */
  const createPopupProvide = (item: PopupState) => {
    provide(PopupKey, item)
  }

  /**
   * @description 使用popup向下的inject
   */
  const usePopupInject = () => {
    const { visible, setVisible } = injectStrict(PopupKey)
    return { visible, setVisible }
  }

  // 返回数据
  return { createPopupProvide, usePopupInject }
}
