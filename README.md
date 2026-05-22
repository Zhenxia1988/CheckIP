# 疗愈师IP线上变现现状测评

这是一个可以直接部署到 GitHub Pages 的纯前端测评网页。

## 功能

- 34 道测评题
- 6 个诊断维度
- 自动计分
- 自动生成用户分型
- 生成雷达图
- 输出优势、卡点、30天行动建议
- 支持一键下载 PNG 图片报告

## 文件说明

- `index.html`：网页结构
- `style.css`：页面样式
- `app.js`：题目、计分逻辑、报告生成逻辑

## 本地预览

直接双击 `index.html` 即可打开。

如果你会用命令行，也可以运行：

```bash
python -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## GitHub Pages 部署

1. 新建 GitHub 仓库，例如：`healer-ip-assessment`
2. 上传本项目的三个文件：`index.html`、`style.css`、`app.js`
3. 进入仓库 `Settings`
4. 找到 `Pages`
5. Source 选择 `Deploy from a branch`
6. Branch 选择 `main`，Folder 选择 `/root`
7. 保存后等待部署完成
8. 打开 GitHub Pages 提供的网址即可访问

## 后续可升级方向

- 接入表单工具收集姓名、微信、答案和分数
- 接入 AI API 自动生成更个性化的报告
- 接入支付系统，免费报告后引导 9.9 元解锁完整版
- 接入预约系统，导流到 500 元/小时诊断咨询


## 本次版本说明

报告页底部按钮已改为“下载报告图片”。

点击后会自动把报告区域生成 PNG 图片并下载，不会弹出打印窗口。
本功能使用浏览器端 html2canvas 实现，适合部署在 GitHub Pages 这类静态网站上。
