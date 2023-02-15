# 安装项目

- 正常安装即可
- 可以使用 @dcloudio/uvm 管理编译器的版本，此工具仅自动增加或更新 uni-app 编译器主要依赖，对于新增的编译命令（scripts）暂时不会自动处理，需手动参考新工程进行配置。
- npx @dcloudio/uvm

# 所用技术栈

- 小程序框架： [uni-app](https://uniapp.dcloud.io/)
- 构建工具： [Vite](https://vitejs.dev/)
- 前端框架： [Vue3.x](https://v3.cn.vuejs.org/)
- 编程语言： [TypeScript](https://www.typescriptlang.org/)
- 代码规范：
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
- css 预处理器： [less](https://less.bootcss.com/)
- 状态管理工具：[pinia](https://pinia.vuejs.org/)
- pinia 数据持久化插件：[pinia-plugin-persist-uni](https://allen-1998.github.io/pinia-plugin-persist-uni/)
- vite 插件：
  - [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

# 启动项目

```markdown
//test 环境
npm run dev:test

//uat 环境
npm run dev:uat

//prod 环境
npm run dev:prod
```

# 打包项目

```markdown
//test 环境
npm run build:test

//uat 环境
npm run build:uat

//prod 环境
npm run build:prod
```

# 目录结构

```text
|-- root
    |-- .env                //公共环境变量配置文件
    |-- .env.dev            //dev环境变量配置文件
    |-- .env.prod           //prod环境变量配置文件
    |-- .env.uat            //uat环境变量配置文件
    |-- .gitignore
    |-- README.md
    |-- index.html          //默认打包入口文件
    |-- package-lock.json
    |-- package.json
    |-- tsconfig.json        //ts配置文件
    |-- vite.config.ts       //vite配置文件
    |-- src
        |-- App.vue         //vite配置文件
        |-- env.d.ts
        |-- main.ts
        |-- manifest.json
        |-- pages.json
        |-- uni.less
        |-- api
        |   |-- api.index.ts   //api统一入口
        |   |-- user
        |       |-- api.user.ts  //各模块api文件
        |-- components         //项目公共组件
        |-- hooks              //自定义封装hooks
        |   |-- useUser.ts
        |-- pages              //各模块页面文件
        |   |-- index
        |   |   |-- index.vue
        |   |-- ...
        |-- server             //请求封装
        |   |-- httpGateway.ts
        |   |-- httpStatus.ts
        |   |-- interceptors.ts
        |   |-- signGateway.ts
        |-- static            //静态资源
        |-- store             //使用pinia,组件/页面共享状态管理
        |   |-- index.ts
        |   |-- modules
        |       |-- user.ts
        |-- style             //公共样式库
        |   |-- common.less
        |-- utils             //公共方法库
            |-- validate.ts

```
