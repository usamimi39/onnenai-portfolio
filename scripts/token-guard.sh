#!/usr/bin/env bash
# src/ 配下の値の直書きを検出する（SPEC 4.9）。見つかったら exit 1
set -u
cd "$(dirname "$0")/.."

status=0
report() {
  local label="$1" pattern="$2"
  shift 2
  local hits
  hits=$(grep -rnE --include='*.ts' --include='*.tsx' --include='*.css' "$@" -e "$pattern" src 2>/dev/null)
  if [ -n "$hits" ]; then
    echo "[token-guard] $label"
    echo "$hits"
    echo
    status=1
  fi
}

# 自動生成ファイルとテーマ（src/themes/）は対象外。--exclude は --include より後に置く（後勝ち）
common=(--exclude=routeTree.gen.ts --exclude=astryx-themes.ts --exclude-dir=themes)

report "Tailwind の任意値" '-\[' "${common[@]}"
report "Tailwind の既定パレット" '-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}' "${common[@]}"
report "16進カラー / rgb( / hsl(" '#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(' "${common[@]}"
report "style={{ / xstyle / stylex" 'style=\{\{|xstyle|stylex' "${common[@]}"

if [ "$status" -eq 0 ]; then
  echo "[token-guard] OK"
fi
exit "$status"
