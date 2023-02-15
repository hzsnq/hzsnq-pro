/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-02 09:22:01
 * @FilePath: /union-ums-h5/types/pages.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import { DefineComponent, Ref } from 'vue'

declare global {
  //provide时popup属性与方法类型
  interface PopupState {
    visible: Ref<boolean>
    setVisible: (status: boolean) => void
  }

//首页IndexBottom组件入参类型
  interface CardProps {
    haveCardList: Array<any>
    allCardList: Array<any>
  }

//首页IndexTop组件入参类型
  interface UserProps {
    userIntegral: Array<any>
    userInfo: any
  }

  interface NavBarState {
    backgroundColor: string
    title: string
  }

  interface PageComponent {
    key: string
    bindData: object
    bindFunction: object
    component: DefineComponent<{}, {}, any>
  }
}
