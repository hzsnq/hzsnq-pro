/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-22 22:34:52
 * @FilePath: /union-ums-h5/types/store.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
export {}
declare global {
  interface ITabBarState {
    tabBarList: Array<ITabBar>
    selectKey: string
  }

  interface ITabBar {
    key: string
    name: string
    iconPath: string,
    iconActivePath: string
  }
}
