---
layout: archive
title: "Blog"
permalink: /blog/
author_profile: true
---

<p class="archive__subtitle">Thoughts, presentations, and articles on AI research and technology.</p>

<div class="blog-intro">
  <div class="blog-intro__inner">
    <div class="blog-intro__body">
      <p>Welcome to my blog! Here you'll find my latest presentations, research insights, and thoughts on artificial intelligence, machine learning, and technology.</p>
      <p>欢迎关注我的微信公众号。</p>
    </div>
    <div class="blog-intro__qrcode">
      <img src="{{ site.baseurl }}/slides/0219-xuzhou-ai-talk/ai-tongjian-qrcode.png" alt="微信公众号：AI 通鉴" width="140" height="140">
    </div>
  </div>
</div>

<h2 class="archive__subtitle">Presentations</h2>

<div class="presentations-grid">
  <article class="archive__item presentation-card">
    <h3 class="archive__item-title presentation-title-with-icon">
      <span class="presentation-icon-inline" aria-hidden="true">🎤</span>
      <a href="/slides/0219-xuzhou-ai-talk/">人工智能的昨天、今天、明天</a>
    </h3>
    <p class="page__meta">February 19, 2026 • Xuzhou, China</p>
    <p class="archive__item-excerpt">
      A comprehensive talk on the 70-year journey of artificial intelligence, covering the 
bitter lesson from history, the current state of AI, and the future of AI.
    </p>
    <div class="presentation-tags">
      <span class="tag">AI History</span>
      <span class="tag">Deep Learning</span>
      <span class="tag">Future of AI</span>
    </div>
    <a href="/slides/0219-xuzhou-ai-talk/" class="btn btn--primary">View Presentation →</a>
  </article>
</div>

<style>
.blog-intro {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  padding: 2em;
  border-radius: 12px;
  margin-bottom: 2em;
  border-left: 4px solid #2563eb;
}

.blog-intro__inner {
  display: flex;
  align-items: center;
  gap: 2em;
}

.blog-intro__body {
  flex: 1;
  min-width: 0;
}

.blog-intro__body p {
  margin: 0 0 0.5em;
  font-size: 1.1em;
  color: #1e40af;
}

.blog-intro__body p:last-child {
  margin-bottom: 0;
}

.blog-intro__qrcode {
  flex-shrink: 0;
}

.blog-intro__qrcode img {
  display: block;
  width: 140px;
  height: 140px;
  border-radius: 8px;
  border: 1px solid rgba(37, 99, 235, 0.3);
  object-fit: cover;
}

.presentations-grid {
  display: grid;
  gap: 1.1em;
}

.presentation-card {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-left: 4px solid #f59e0b;
  padding: 1.25em 1.5em;
  margin-top: 0.6em;
}

.presentation-title-with-icon {
  display: flex;
  align-items: center;
  gap: 0.35em;
  margin-bottom: 0.25em;
}

.presentation-icon-inline {
  font-size: 1em;
  line-height: 1;
  flex-shrink: 0;
}

.presentation-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin: 0.6em 0;
}

.tag {
  display: inline-block;
  padding: 0.25em 0.75em;
  background-color: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 500;
}

.page__meta {
  color: #6b7280;
  font-size: 0.9em;
  margin-bottom: 0.35em;
}

.archive__subtitle + .presentations-grid {
  margin-top: 0.75em;
}

.read-time {
  color: #9ca3af;
}

@media (max-width: 768px) {
  .blog-intro {
    padding: 1.5em;
  }

  .blog-intro__inner {
    flex-direction: column;
    gap: 1.2em;
  }

  .blog-intro__qrcode img {
    width: 120px;
    height: 120px;
  }
  
  .presentations-grid {
    grid-template-columns: 1fr;
  }
}
</style>
