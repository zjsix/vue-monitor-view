# Monitor 日志监控系统

本项目为前后端分离的日志监控系统，包含 Node.js 后端与 Vue2 前端，支持用户管理、日志查看、错误追踪等功能。
写的很随便 大致看下就行
需搭配 [vue-monitor](https://github.com/zjsix/vue-monitor) 使用

## 目录结构

```
.
├── node/         # Node.js 后端服务
│   ├── app.js
│   ├── dao/      # 数据库模型
│   ├── service/  # 业务逻辑
│   ├── routes/   # 路由
│   ├── config/   # 配置
│   └── common/   # 工具与通用返回
└── web/          # Vue2 前端项目
    ├── src/
    │   ├── api/          # 接口请求
    │   ├── components/   # 公共组件
    │   ├── views/        # 页面视图
    │   ├── mixins/       # 混入
    │   ├── utils/        # 工具
    │   ├── style/        # 样式
    │   └── router/       # 路由
    └── public/
```

## 功能简介

- **用户管理**：支持用户登录、注册、密码修改、权限管理等。
- **日志查看**：支持分页、搜索、错误详情、操作轨迹查看、日志复制等。
- **权限控制**：管理员与普通用户权限区分。
- **错误追踪**：记录应用错误、用户操作轨迹。
- **邮件通知**：支持错误邮件提醒（需配置邮箱，具体还没写，很简单）。

## 安装与启动

### 1. 后端（Node.js）

```bash
cd node
npm install
# 开发环境启动
npm run dev
# 生产环境启动
npm run start
```

加入初始管理员账号 admin / admin123
```sql
INSERT INTO `user` VALUES (1, 'admin', '44A5B3613E9FD52130161056F51D2F', 1, 'zj_1997@163.com', '2025-09-02 11:38:00', '2025-09-02 11:38:03');
```
mysql需要5.7以上版本

环境变量请参考 `.env.development`、`.env.production` 文件。

### 2. 前端（Vue2）

```bash
cd web
npm install
npm run dev
# 或
npm run start
```

### 3. 访问

- 前端默认端口：`http://localhost:81`
- 后端接口端口：`http://localhost:9066`

## 主要依赖

- 后端：koa、sequelize、mysql2、joi、jsonwebtoken、nodemailer
- 前端：vue2、element-ui、vuex、vue-router、axios、dayjs

## 其他说明

- 超级管理员用户 id 为 1，不能被删除或编辑。
- 邮箱、数据库等敏感信息请在环境变量中配置。

---
