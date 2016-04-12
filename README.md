
使用最前沿的node技术栈（koa2，async/await等）来构建有趣的web应用。
bleeding edge node's web skeleton with koa2 and lots of features to make node fun again~ 

该脚手架包含了如下指南，帮助你快速上手：

- [docker 部署](./docs/docker.md)
- [聚合开发](./docs/composite.md)
- [koa2 框架](./docs/koa2.md)
- [数据验证](./docs/validate.md)
- [request track](./docs/request-track.md)
- [微服务整合](./docs/microservice.md)
- [测试和健康检查](./docs/test.md)

## 安装和使用
确保你的基础node版本不小于5.6，使用 `npm install` 安装依赖。`npm start` 启动该脚手架。
Tip: 使用node 5确保我们的babel transpile 可以尽量让产出的代码精简 (.babelrc 中的preset为 es2015-node5)