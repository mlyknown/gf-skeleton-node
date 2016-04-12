测试脚本

除了我们常见的使用 mocha/assert 等，甚至集合supertest来测试express相关的任务，我们也需要对 nginx location的设置进行检查（尤其是我们项目中使用 openresty），也需要提供健康检查脚本给微服务框架来做定期的检查，从而帮助我们重启等操作

