#!/usr/bin/env bash
# 将 Slidev 演讲构建并部署到本站 slides 目录
# 用法: ./scripts/deploy-slidev.sh

set -e

SLIDEV_PROJECT="${SLIDEV_PROJECT:-/Users/gengzijie/Projects/SlideV/0219-xuzhou-ai-talk}"
SITE_ROOT="${SITE_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
SLIDES_SUBDIR="slides/0219-xuzhou-ai-talk"
TARGET_DIR="${SITE_ROOT}/${SLIDES_SUBDIR}"
# 必须与站点内访问路径一致，且首尾带 /，这样打包内的资源与路由才会正确
BASE_PATH="/${SLIDES_SUBDIR}/"

echo "Slidev 项目: $SLIDEV_PROJECT"
echo "站点根目录: $SITE_ROOT"
echo "目标目录:   $TARGET_DIR"
echo "Base 路径:  $BASE_PATH"
echo ""

cd "$SLIDEV_PROJECT"
echo "[1/3] 安装依赖..."
pnpm install

echo "[2/3] 构建 Slidev SPA（--base $BASE_PATH）..."
set +e
pnpm exec slidev build --base "$BASE_PATH"
set -e
# 若未安装 Playwright 浏览器，build 可能在导出步骤报错，但 dist/ 通常已生成
if [ ! -d "dist" ]; then
  echo "错误: 未找到 dist 目录。可尝试在 Slidev 项目下执行: pnpm exec playwright install"
  exit 1
fi

echo "[3/3] 复制到站点 slides 目录..."
mkdir -p "$TARGET_DIR"
rsync -a --delete dist/ "$TARGET_DIR/"

# 无 hash 时跳转到第一页，保证从 blog 点开即显示第一页
if [ -f "$TARGET_DIR/index.html" ] && ! grep -q "location.replace.*#/1" "$TARGET_DIR/index.html"; then
  idx="$TARGET_DIR/index.html"
  python3 -c "
import re, os
p = r'(\s*</body>)'
r = r'  <script>(function(){var h=location.hash;if(!h||h===\"#\"||h===\"#/\"||h===\"#/\")location.replace(location.pathname+location.search+\"#/1\");})();</script>\n\1'
path = os.environ.get('IDX', '')
if path and os.path.isfile(path):
    with open(path) as f: s = f.read()
    with open(path, 'w') as f: f.write(re.sub(p, r, s, count=1))
" IDX="$idx"
fi

echo ""
echo "完成。演讲已更新到 $TARGET_DIR"
echo "可在站点仓库执行 git add $SLIDES_SUBDIR && git commit -m 'Update Slidev talk' && git push 推送。"
