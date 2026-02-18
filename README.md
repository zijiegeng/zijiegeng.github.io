# Zijie Geng's Personal Homepage

Personal academic homepage built with Jekyll, based on the Minimal Mistakes theme with custom modern enhancements.

**Live site:** [https://zijiegeng.github.io](https://zijiegeng.github.io)

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

## Project Structure

- `_pages/` — Content pages (about, research, publications, talks, blog)
- `_layouts/` — Page templates
- `_includes/` — Reusable components (header, footer, sidebar, etc.)
- `_sass/` — SCSS stylesheets (Minimal Mistakes theme)
- `assets/css/modern.css` — Custom modern design system
- `assets/js/` — JavaScript (particles, scroll animations, modern effects)
- `images/` — Images and favicons
- `files/` — Downloadable files (PDFs)
- `slides/` — Presentation slides
- `ai-history/` — 软链接到 `../ai-everything`，便于本地查看源项目结构；站内「人工智能发展史」文章正文与配图已内置于 `_pages/ai-history/` 与 `assets/images/ai-history/`，因此 GitHub Pages 构建不依赖该链接

### 人工智能发展史系列（后续更新）

- 目录展示在 **Blog** 页（`/blog/`）的「人工智能发展史 · 第一章 哲学溯源」区域。
- 新增文章时：在 `_pages/ai-history/` 增加对应页面的 Markdown（front matter + 正文，正文中图片路径用 `./figures/`，由 Liquid 替换为 `article_baseurl`）；将配图放入 `assets/images/ai-history/编号/`；在 `_pages/blog.md` 的 `ai-history-grid` 中增加一条卡片（标题链接 + 封面图）。

## License

MIT
