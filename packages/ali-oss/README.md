# 阿里云@types/ali-oss
# 阿里云RAM STS临时授权备忘录
* 进入ram控制台
* 用户管理 -> 新建用户 -> 赋予 AliyunSTSAssumeRoleAccess 权限
* 策略管理 -> 新建授权策略 -> 策略内容尽可能小粒度 "Resource": ["acs:oss:*:*:oyb/project-name/*"]
* 角色管理 -> 新建角色 -> 用户角色 -> 授权
