# QQ 邮箱 SMTP 设置

1. 登录 QQ 邮箱网页版，打开「设置 → 账户」，启用 POP3/SMTP 服务并生成客户端授权码。不要使用 QQ 登录密码。
2. 在 GitHub 仓库 `Settings → Secrets and variables → Actions` 添加以下 Repository secrets：

   | Secret | 值 |
   | --- | --- |
   | `SMTP_HOST` | `smtp.qq.com` |
   | `SMTP_PORT` | `465` |
   | `SMTP_USER` | 完整 QQ 邮箱地址 |
   | `SMTP_PASSWORD` | QQ 邮箱客户端授权码 |
   | `EMAIL_TO` | 通知接收地址 |

3. 打开 `Actions → Monitor X for reset → Run workflow`，勾选 `test_notify` 并运行。
4. 收到测试邮件后，监控会继续按 workflow 中的 schedule 自动检查。

凭据只通过 workflow 环境传入发送脚本的标准输入；配置检查只记录每项是否存在，不打印其值。
