# Guangyu Bai — product portfolio

Personal product portfolio, deployed with GitHub Pages. Static HTML/CSS/JavaScript. No analytics, forms, credentials or private application materials.

Product statements distinguish live product, published installer, local engineering implementation, prototype, hardware validation and team contributions. Project Flow: https://pmpro.com.cn.

`assets/project-flow.png` is a screenshot from the public adkinsbai/Project-flow repository, website/assets/project-flow-canvas.png. Display fonts are subsets of Noto Sans SC and Noto Serif SC, licensed under SIL Open Font License; license files are in `assets/`.

The product exhibition is implemented in `style.css`, `projects.js` and `app.js`, without external runtime dependencies. It replaces the former split hero and project list with a full-width spatial product selector, a scroll-driven Project Flow exploded view, interactive TypeUp rewrite/undo and TraceCalendar execution demonstrations, and a project wall. Demonstrations are explicitly illustrative: they do not collect audio, invoke models or create real calendar events. A pause control and `prefers-reduced-motion` provide static alternatives; canvas rendering stops when offscreen or the document is hidden.
