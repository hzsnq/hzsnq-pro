/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-15 19:15:35
 * @LastEditors: taoyongjian taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-01-23 16:55:55
 * @FilePath: /union-ums-h5/src/store/index.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */

//pinia 持久化插件uni版
import piniaPersist from "pinia-plugin-persist-uni"

const store = createPinia()
store.use(piniaPersist)
export default store
