# 任务农场 — 独立仓库部署说明

把游戏放到一个**独立的 GitHub Pages 仓库**，地址 `https://xijie2013.github.io/farm/`。
它和看板同一个域名（`xijie2013.github.io`），所以仍然共享登录/token、能读看板数据；
但路径在看板作用域之外，能独立"添加到主屏幕"、独立离线，不再干涉看板。

## 这个文件夹里应该有
- `index.html`        ← 游戏本体（从 life-work-kanban\kanban-farm-idle.html 复制并改名）
- `farm-manifest.json`（已备好）
- `farm-sw.js`（已备好）
- `farm-icon.svg`（已备好）
- `farm-assets\`       ← 三张怪兽图（从 life-work-kanban\farm-assets\ 复制过来）

## 你要做的两件复制（在电脑文件管理器里）
1. 把 `life-work-kanban\kanban-farm-idle.html` 复制到本文件夹，**改名为 `index.html`**（覆盖现有的）。
2. 把 `life-work-kanban\farm-assets\` 里的三张 png 复制到本文件夹的 `farm-assets\` 里。

## 建仓库 + 发布（任选一种）

### A. GitHub Desktop（最简单）
1. 打开 GitHub Desktop → File → Add local repository → 选这个 `farm-game` 文件夹
   （若提示不是仓库，选 "create a repository"）。
2. 仓库名填 **`farm`**，Publish repository（取消勾选 "Keep this code private"，要公开）。
3. 到 github.com 该仓库 → Settings → Pages → Source 选 `main` 分支、根目录，Save。
4. 等 1–2 分钟，访问 `https://xijie2013.github.io/farm/`。

### B. 命令行
```
cd farm-game
git init
git add -A && git commit -m "farm game"
git branch -M main
git remote add origin https://github.com/xijie2013/farm.git   (先在 github.com 建好空仓库 farm)
git push -u origin main
```
然后在仓库 Settings → Pages 开启（main 分支 / 根目录）。

## 手机上
访问 `https://xijie2013.github.io/farm/` → Chrome 菜单 → 添加到主屏幕。
现在它是独立 App，和看板互不影响。

## 以后更新
改完文件后跑 `deploy.bat`（或 GitHub Desktop 提交推送）即可。
