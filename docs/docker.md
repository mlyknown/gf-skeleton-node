
现在不少公司通过docker来弯道超车，解放了运维和开发的环境搭建和服务部署的老大难问题，甚至也初步具有的云计算的能力。所以我们需要在node项目中集成docker发布等工作。 脱离原来的gulp/grunt脚本，我们利用更加轻量的npm scripts来实施我们的构建工作。

- npm run rsync:gftest
把现有构建后的es5代码同步到内部的测试机器上，用于内部测试和部署。

- npm run restart
用于重启docker，传入配置文件（如外部api通过环境变量文件导入等）

- npm run docker:build
通过 Dockfile 构建 docker 镜像

- npm run docker:push
推送构件号的 docker 镜像到公司私有的docker中央服务器上


```js
{
    "rsync:gftest": "rsync --cvs-exclude -cauvz -e \"ssh -A gf@<relay-ip> ssh\" .es5 ubuntu@<dest-ip>:/opt/gf/gfwealth-composite/",
    "docker:prebuild": "rsync -avz --exclude .es5 --exclude .idea . ./.es5 && babel . --out-dir ./.es5 --ignore ./.es5,./node_modules",
    "docker:build": "cd .. && docker build -t <private-docker-host>/gfwealth-composite:koa-2016-03-17 .",
    "docker:run": "sudo docker run -d --name gfwealth-composite -p 8000:9321 -v /opt/gf/gfwealth-composite/logs:/opt/gf/gfwealth-composite/logs -v /etc/localtime:/etc/localtime:ro --env-file=\"config/env/product\" docker.gf.com.cn/gfwealth-composite:koa-2016-03-17",
    "docker:restart": "npm run docker:run && npm run docker:rm"
    "docker:rm": "sudo docker rm -f gfwealth-composite",
    "docker:push": "docker login docker.gf.com.cn && docker push <private-docker-host>/gfwealth-composite:koa-2016-03-17"
}
```