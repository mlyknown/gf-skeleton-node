

公司内部整理的微服务化规范中。包括：

- docker化（见[指南](./docker.md)
- 无状态。从而方便Kubernets扩缩容或调整机器资源（重启等），或者有状态恢复机制
- 环境变量配置优先（配置项通过env传入，如数据库，redis等
- 不要使用卷映射（如logs文件通常打到console中，然后fluentd传入大数据（走kafka; node_modules ADD file 到docker中
- 提供健康检查脚本(见[指南](./test.md))


## 环境变量相关的处理

关于配置我们集成了confit和shorthandle（来自paypal）。

```sh
GFWC_storeExShopList=http://shopdev.gf.com.cn/api/store/shop/excellentshop/{id}/{page}/{size}
GFWC_storeSpShopList=http://shopdev.gf.com.cn/api/store/shop/special
GFWC_userFavShopList=http://shopdev.gf.com.cn/api/store/auth/favorites/shop/inorg
```

```js
{
  api: {
    GFWC_storeExShopList=http://shopdev.gf.com.cn/api/store/shop/excellentshop/{id}/{page}/{size}
    GFWC_storeSpShopList=http://shopdev.gf.com.cn/api/store/shop/special
    GFWC_userFavShopList=http://shopdev.gf.com.cn/api/store/auth/favorites/shop/inorg
  }
}
```

```js
// load config at dev environment
if(process.env['NODE_ENV'] === 'dev') {
  var env = require('node-env-file');
  env('./config/env/dev');
}

// load config at docker run
docker run --envfile=config/env/product xxxx

// use conf:
var apiConf = require('../base').config.get('api');
var {stockPortfolioExpert, stockPortfolioExperting,
  stockPortfolioSelfMaster} = apiConf;

```
