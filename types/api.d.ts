/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-17 18:14:02
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-23 20:48:52
 * @FilePath: /union-ums-h5/types/api.d.ts
 * @Description
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
declare namespace Http {
  type Response<T> = Promise<{
    data?: T
  }>

  type method = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

  interface HttpStatus {
    statusCode: number
    msg: string
    name: string
  }

  interface Params {
    method: string
    obj: object
  }
}
