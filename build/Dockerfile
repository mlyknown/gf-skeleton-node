FROM docker.gf.com.cn/appbase-node5:v1
MAINTAINER gaohailang <gaohailang@gf.com.cn>

RUN mkdir -p /opt/koa-app-name
ADD .es5 /opt/koa-app-name

RUN mkdir /var/run/sshd -p
EXPOSE 22

WORKDIR /opt/koa-app-name
CMD pm2 start .pm2_config.json && /usr/sbin/sshd && tail -f /etc/hosts