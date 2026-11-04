# Tennis Open — MVP v1

法网配色 · 中英双语 · Cloudflare Pages 静态站

## 页面
1. `/` 首页 + 活动报名（Stripe 占位）
2. `/ai-coach` AI 测评与教练（上传占位 + 水平榜 + 会员方案）
3. `/vacation` 网球旅行 Blog（联盟链接占位）
4. `/gear` 装备指南 Blog（联盟链接占位）

## 本地运行
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 产物在 dist/
```

## 修改内容（非技术人员版）
所有文案/图文都在 `src/data/*.json`，用任何文本编辑器改：
- `i18n.json` — 界面文案（en/zh 两列对应）
- `events.json` — 活动列表（改日期/地点/价格）
- `evaluations.json` — 水平榜数据
- `blog-vacation.json` / `blog-gear.json` — 文章（改 title/excerpt/body 的 en 和 zh 字段）

改完 commit + push，Cloudflare Pages 自动重新部署。

## 部署 Cloudflare Pages
1. 推到 GitHub
2. Cloudflare Dashboard → Pages → Create project → Connect to Git → 选 repo
3. Build command: `npm run build`，Output directory: `dist`
4. `_headers` 已配置全站 noindex（搜索引擎不可见）

## 待接后端（二期）
- Stripe Checkout：替换 index.astro / ai-coach.astro 中的 `TODO Stripe` 占位，需 STRIPE_SECRET_KEY（Pages Functions 环境变量）
- AI 评分：替换 `functions/api/evaluate.js` 中的 mock，接入 MediaPipe 评分流水线
- 联盟链接：替换文章中的 TODO 注释
