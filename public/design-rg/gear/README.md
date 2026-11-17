# 装备板块 · Gear Section

网球装备内容板块：选购指南做流量入口，单品种草做转化。

## 文件清单

| 文件 | 说明 | 状态 |
|------|------|------|
| `明星系列/` | **子合集**：球星装备与时尚版图。8 篇球员版图 + 1 篇单品清单 + 1 篇赛事同款（中英双版），共 10 篇内容 / 11 个页面，入口 `明星系列/index.html` | ✅ 2026-11-17 建合集 |
| `装备板块规划.md` | 关键词矩阵（10 品类，P0-P2）、首批 14 篇选题表、联盟渠道映射、变现预估（假设推演） | ✅ 2026-11-08 |
| `tennis-skirts-guide.html` | 《女款网球裙选购指南》样稿：8 款真实在售（迪卡侬/蕉下/Adidas/Nike/Wilson/Lululemon/On/FILA），三档分级 + spec-grid + FAQ + AFF 占位符 | ✅ 2026-11-08 · impeccable 0 anti-patterns |
| `tennis-racquets-guide.html` | 《网球拍选购指南》样稿：8 支（川崎 SA-100/Wilson 入门/HEAD Attitude Pro/Clash 100/Pure Aero/EZONE 100/Speed Pro/Blade 98），五大选购参数 | ✅ 2026-11-08 · impeccable 0 anti-patterns |
| `ball-machines-guide.html` | 《网球发球机选购指南》：7 款真实在售（Lobster Liberty/Spinshot Lite/Spinshot Player/Spinshot Plus-2/Lobster Elite Two/Lobster Grand Five LE/斯波阿斯 S4015），三档分级 + spec-grid + FAQ + 佣金对比数据面板（估算）；新增 spinshot 联盟渠道（见 affiliates.yaml） | ✅ 2026-11-08 · impeccable 0 anti-patterns |
| `tennis-luxury-collectibles.html` | 《网球高净值好物》：网球珠宝（David Yurman/Julie Vos/VRAI/The Perfect Setting/Shay/Studio Margaret）+ 联名限量（On × Federer、Uniqlo × Federer × CWK、Rado Captain Cook 限量腕表）+ 奢侈跨界（Dior/Céline/LV），含按预算送礼速查；金色调 accent `#b8924a` | ✅ 2026-11-08 · impeccable 0 anti-patterns（em-dash advisory 仅提示性） |
| `slam-skirts-2026.html` | 【时效】《2026 四大满贯最值得入手的网球裙》：按澳/法/温/美四站分章（Nike Slam 海浪/金箔/温网 kirigami/篮球主题），TIMELINE 本季看点提示条 + 购买渠道速查表（OFFICIAL 标注）+ FAQ；勘误「Wilson 婚纱系列」未证实并如实更正为 Lucky in Love 礼服感款 | ✅ 2026-11-08 · impeccable 0 anti-patterns |
| `明星系列/osaka.html` | 【时效】《大阪直美的时尚版图》：同款购物地图（Nike Slam 裙 / GP Challenge 1.5 $180 / Yonex EZONE 98 $305 / Mikimoto 温网珍珠 / Citizen CB1101-03L 限量签名表），高定入场层标注「非卖品」；「Henka」品牌经核实不存在已剔除；accent 珊瑚粉 `#ec8fa7`（对比度≈9:1） | ✅ 2026-11-08 · impeccable 0 anti-patterns |

## 要点

- **子合集**：球星内容统一收进 `明星系列/`（原 `明星库/`），含 8 位球员版图；新增球员先建页再更新合集首页与篇数
- **设计系统**：复用 `04-酒店指南/paris-tennis-vacation.html` 的 editorial-tech 骨架（非对称 hero、mono 章节索引、spec-grid、tier 分档），accent 统一红土 `#d96f3f`
- **关键调研结论**：中文装备搜索头部被知乎攻略占据但多为国产软文，国际品牌深度测评是空白；Spinshot 发球机确认有官网 Affiliate Program（需在 affiliates.yaml 新增 `spinshot` 渠道）；"Physics" 发球机联盟计划待核实
- **优先级**：P0 = 网球裙/球拍/球鞋；P1 = 球线/球/发球机/配件；P2 = 男款服/球包/太阳镜
- **待办**：注册 Amazon Associates、Awin（Tennis-Point）；申请 Spinshot affiliate；变现在规划文档中标注为假设推演（约 $500–2400/月中性 $900–1400）

## 时效内容（2026-11-08 新增品类）

- **定位**：蹭大满贯赛事热度与球星时尚话题的时效稿（如 `slam-skirts-2026.html`、`明星系列/osaka.html`），区别于常青选购指南
- **配比建议**：时效稿 : 常青稿 ≈ 1 : 4——时效稿负责流量脉冲与社交传播（每站大满贯后一周内是发布窗口），常青稿负责 SEO 长尾与联盟转化底盘；时效稿内部应反链到对应常青稿（如裙盘点 → 网球裙选购指南）承接转化
- **生产纪律**：只写经 web_search 核实的真实产品/联名，查不到的条目如实标注「未证实/待核实」或剔除（本批已勘误 Wilson 婚纱系列、剔除 Henka）；下一窗口为 2027 澳网（约 2026.12 中–2027.01 中）
