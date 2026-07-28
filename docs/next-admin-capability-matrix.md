# Next Admin 通用能力迁移矩阵

状态：`P0-007E / IN_PROGRESS`

输入基线：

- 已验收旧 React Router Admin：`tpl-admin-frontend-react@0b58adc4035d2b695646b0700dfc2fb707d14b57`
- 新 Next Admin 首个边界提交：`tpl-admin-frontend@0be6690`
- 配对后端：FastAPI `tpl-admin-backend`

本矩阵的“继承”是行为和契约等价，不是逐文件复制，也不是把 React Router SPA
嵌入 Next。未完成真实 FastAPI/Casdoor、Docker/KIND、滚动升级和回滚前，P0-007E
不得标记为 `ACCEPTED`。

## 能力矩阵

| 旧模板能力 | Next Admin 实现 | 状态 | 验收 |
| --- | --- | --- | --- |
| 响应式 Shell/侧栏/Drawer | Server Layout + `components/admin/app-shell.tsx` | IMPLEMENTED | unit + mobile Playwright |
| 菜单、面包屑、标签单一元数据 | `lib/navigation.ts` + Zustand UI tabs | IMPLEMENTED | role/path unit + Playwright |
| 主题、密度、语言、全屏 | `interface-settings.tsx` + `store/ui.ts` | IMPLEMENTED | reload/locale/browser gate |
| public/protected/403/404/loading/error | Next route groups、Server DAL、route boundaries | IMPLEMENTED | anonymous/role negative/deep link |
| BFF session/CSRF/logout/correlation | server-only DAL + same-origin client + Query cache clear | IMPLEMENTED | unit/fixture；真实配对待 E3 |
| TanStack Query / UI / form 状态归属 | Query provider + Zustand partial persistence + local form | IMPLEMENTED | unit + data-flow review |
| Table/分页/空/加载/错误 | `components/crud/data-table.tsx` | IMPLEMENTED | component + reference route |
| Schema Form/字段错误 | `components/crud/schema-form.tsx` | IMPLEMENTED | component |
| Description/Modal/Drawer | resource description、audited dialog、action drawer | IMPLEMENTED | component + reference route |
| 写操作审计与统一错误 | audit reason + `lib/api/client.ts` structured problem | IMPLEMENTED | component/unit；真实后端待 E3 |
| Notice/Notification | `FeedbackProvider`/aria-live queue | IMPLEMENTED | reference route |
| 上传/下载 adapter | size/type contract + same-origin path + Blob cleanup | IMPLEMENTED | unit/component |
| Avatar/Menu | `components/rich/avatar-tools.tsx` | IMPLEMENTED | reference route |
| 图表边界与无障碍替代 | SVG `MetricChart` + data table | IMPLEMENTED | component/browser |
| 安全文本 Markdown | controlled textarea + text-only preview | IMPLEMENTED | XSS component/browser |
| 本地图标 registry | fixed Lucide registry + fallback | IMPLEMENTED | component |
| 同源音视频 | native controls + URL validation + error boundary | IMPLEMENTED | component/browser |
| Progress/transition/watermark | native progress + CSS/reduced-motion + SVG data watermark | IMPLEMENTED | browser |
| copy/debounce/throttle/drag/long-press/flash/scroll | hooks/components；键盘拖拽替代 | IMPLEMENTED | unit/reference/browser |
| Node standalone 镜像 | precise Node/pnpm + minimal standalone runtime | IMPLEMENTED | Docker/KIND 待 E4 |
| FastAPI Admin 真实配对 | 独立 audience/cookie/session namespace | PENDING | E3 |
| 双 Pod 滚动/回滚与正式标签 | digest、兼容矩阵、连续探针 | PENDING | E4 |

## 明确延期

以下能力不属于三个 Admin 当前生产依赖，不进入基础包：

- PWA / Electron
- 远程 Iconify 或任意网络 SVG
- Vditor WYSIWYG/CDN runtime
- ECharts 全量 option 兼容
- Howler/Video.js 高级控制

恢复任一能力前必须有具体业务场景、owner、威胁模型、bundle/performance 预算和 ADR；
不得因旧示例存在而默认引入。

## 退出条件

- [x] E2 全部实现与 unit/component/browser/build 通过。
- [ ] E3 真实 FastAPI Admin + Casdoor + session/CSRF/role/owner negative matrix 通过。
- [ ] E4 clean-room、Docker、KIND strict TLS、双 Pod、滚动/回滚、固定 digest 通过。
- [ ] 新 canonical repo、父仓 gitlink、tag 和 evidence 一致。
- [ ] 三实例同步任务被激活，且禁止继续基于旧 Vue/SPA 开发。
