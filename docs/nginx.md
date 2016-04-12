
nginx 配置属于入门容易，但是很难精通，很多人把配置文件写的『又长又臭』，没有把nginx内置的一些功能用好如（include等）。同时，为了实现一些rewrite或try_files很多人不熟悉，但是没去了解文档把location配置的很蹩脚

关于一些指令和用法
- add_header
- content_by_lua_file
- set $args $args&service
- client_max_body_size 1000k;
- proxy_set_header X-Real-IP $remote_addr;
- rewrite /composite/(.*) /$1 break;

关于一些常用的变量

关于反向代理proxy

https://github.com/nginx-boilerplate/nginx-boilerplate
Features
Convenient include-based config structure
Optimized defaults
Connection and requests rate limiting settings
Backend response caching
Various predefined locations
Advanced logging

https://github.com/lebinh/nginx-conf
Table of Contents
The Nginx Command
Rewrite and Redirection
Force www
Force no-www
Force HTTPS
Force Trailing Slash
Redirect a Single Page
Redirect an Entire Site
Redirect an Entire Sub Path
Performance
Contents Caching
Gzip Compression
Open File Cache
SSL Cache
Upstream Keepalive
Monitoring
Security
Enable Basic Authentication
Only Allow Access From Localhost
Secure SSL settings
Miscellaneous
Sub-Request Upon Completion
Enable Cross Origin Resource Sharing
Links