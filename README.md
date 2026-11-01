# 樂章之間｜Music & Culture Guides

古典音樂、音樂會、電影、藝術與文化導讀的 GitHub Pages 網站。

## 本機預覽

```bash
python3 -m http.server 8000
```

開啟 `http://localhost:8000`。

## 新增文章

每篇文章直接以 `articles/<slug>.html` 撰寫，圖片放在 `assets/`，版面共用 `styles.css`，互動共用 `script.js`。公開網站只包含實際顯示的 HTML、CSS、JavaScript 與圖片。

## 部署

推送到 `main` 後，GitHub Actions 會直接部署靜態 HTML、CSS、JavaScript 與圖片到 GitHub Pages。請在 repository 的 **Settings → Pages → Build and deployment** 選擇 **GitHub Actions**。
