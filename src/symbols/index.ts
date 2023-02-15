/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-23 09:53:54
 * @FilePath: /union-ums-h5/src/symbols/index.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import type { InjectionKey } from "vue"

/**
 * @description Popup InjectionKey Symbol
 */
export const PopupKey: InjectionKey<PopupState> = Symbol("popup")

/**
 * @description NavBar InjectionKey Symbol
 */
export const navBarKey: InjectionKey<NavBarState> = Symbol("navbar")
