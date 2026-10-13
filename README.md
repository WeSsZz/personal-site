# 周骏炜 · 个人网站

基于 Astro 的个人作品集，包含首页、公开项目与项目详情、教育和实习经历、Markdown 文章。

线上地址：<https://wesszz.github.io/personal-site/>

## 本地开发

Node.js 24，使用仓库内的 npm 锁文件：

```bash
npm ci
npm run dev
npm run build
npm run verify
npm run preview
```

开发预览路径是 `/personal-site/`，与 GitHub Pages 保持一致。

## 内容维护

- `src/data/resume.ts`：个人资料、经历与技能。文件开头的 `backendInternship` 同时更新实习经历和数据集平台项目，避免重复维护。
- `src/data/projects.ts`：Shopping SFT + GRPO、Enterprise Agent 的介绍、设计取舍和结果。购物项目的 `comparison` 更新开发集对照表；`link` 可省略，公司项目无需提供源码链接。
- `src/content/blog/`：公开文章。`draft: true` 的文章不会生成页面。
- `src/styles/global.css`：主题、响应式布局、文章排版与打印样式。

会话导出、私人交接、面试准备和密钥不进入公开仓库。

在 GitHub 打开对应文件，点击铅笔修改，再提交到 `main`；Actions 部署成功后，线上内容会自动更新。只更新 `backendInternship` 即可同步后端实习的公司、时间、项目和职责。购物项目标注为开源复现，源码链接指向上游；页面实验结果只使用本地复现记录。

## GitHub Pages

`main` 的提交通过 `.github/workflows/deploy.yml` 自动构建、检查和发布。仓库 Pages 的发布来源设为 GitHub Actions。`astro.config.mjs` 中的 `site` 与 `base`、所有站内链接和资源路径已统一。

官方文档：[GitHub Pages 工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)、[Astro GitHub Pages 部署](https://docs.astro.build/en/guides/deploy/github/)。
