# 网球网站 MVP 首版（Tennis MVP v1）

用静态站技术栈（推荐 Astro 或纯 HTML/CSS/JS，任选简单可靠者），生成一个完整可部署到 Cloudflare Pages 的网球网站。

## 页面（4个）
1. **首页 + 网球活动报名**：活动列表卡片（标题/时间/地点/级别/价格），点击进入报名页，集成 Stripe Checkout 付款流程（用占位 API key + 环境变量，标注 TODO）。报名成功页。
2. **AI 网球测评 & 教练**：上传正手/反手/发球等动作视频（每个 10 秒），前端上传界面 + 占位 API（POST /api/evaluate，返回模拟评分 0-100 和 NTRP 等级 1.0-7.0）；用户测评结果公开展示在"水平榜"页面区块；AI 教练文字点评（占位数据示例）。会员计划说明：免费会员 3 次/月，订阅会员 30 次/月（Stripe 订阅占位）。
3. **网球旅行 Tennis Vacation Blog**：blog 列表 + 文章页，推荐带网球场酒店，内嵌联盟佣金链接占位（标注 affiliate）。
4. **网球装备 Gear Blog**：同上结构，推荐装备产品，联盟链接占位。

## 设计规范（法网 Roland-Garros 配色）
- 主色：Clay 橙 #DA5A2A（CTA/强调）、深绿 #00736A（主背景/导航）、米白 #F5F1E8（底色）
- 现代运动风，移动端优先响应式
- 法网风格衬线标题字体（如 Playfair Display）+ 无衬线正文

## 中英双语
- 简单 i18n：EN/中文切换按钮，内容存 JSON/Markdown 文件，结构类似 ACF 字段——非技术用户改 JSON 文件即可改文案/图文，无需动代码
- 所有 blog 文章用 markdown/JSON 内容文件 + 示例文章各 2 篇

## 部署与配置要求
- 根目录放 `_headers` 文件：全站 `X-Robots-Tag: noindex`（搜索引擎不可见）
- Cloudflare Pages 兼容（静态输出，wrangler.toml 可选）
- README.md：本地运行、修改内容、部署 Cloudflare Pages 的步骤说明（写给非技术用户）
- 严禁调用任何真实付费 API；Stripe 用测试模式占位

## 完成后
git add + commit（信息："MVP v1: 4 pages, RG theme, bilingual, Stripe placeholder"）
