/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-02-13 18:16:58
 * @FilePath: /hzsnq-pro/src/api/api.index.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import { userApi } from "./user/api.user"
import { roomApi } from "./room/api.room"

export const api = {
  ...userApi,
  ...roomApi
}
