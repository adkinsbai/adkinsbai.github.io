# Guangyu Bai — product portfolio

Personal product portfolio, deployed with GitHub Pages. Static HTML/CSS/JavaScript. No analytics, forms, credentials or private application materials.

Product statements distinguish live product, published installer, local engineering implementation, prototype, hardware validation and team contributions. Project Flow: https://pmpro.com.cn.

`assets/project-flow.png` is a screenshot from the public adkinsbai/Project-flow repository, website/assets/project-flow-canvas.png. Display fonts are subsets of Noto Sans SC and Noto Serif SC, licensed under SIL Open Font License; license files are in `assets/`.

The product exhibition is implemented in `style.css`, `interaction.css`, `projects.js` and `app.js`, without external runtime dependencies. The hero product plane follows pointer movement with damped rotation. A three-product spatial showcase follows native page scroll, with direct-selection controls; phones and windows up to 650px tall use native horizontal scrolling. Complete screenshots open in an accessible image dialog. TypeUp rewrite/undo and TraceCalendar execution demonstrations are explicitly illustrative: they do not collect audio, invoke models or create real calendar events. Navigation has its own adaptive surface to keep text clear during scrolling. A pause control and `prefers-reduced-motion` provide static alternatives; canvas rendering stops when offscreen or the document is hidden.

`assets/typeup-preview.png` was captured from the owner's local TypeUp frontend in a separate read-only browser preview; it is an empty/default screen with no account data, and the speech engine was not connected. `assets/trace-assistant.png` is a pre-existing screenshot of the owner's TraceCalendar development version, showing the AI assistant empty state without private conversations, memories or schedule entries. Embedded PNG provenance records these boundaries.

Product frames use translucent frosted-glass surfaces with clear inset margins, backdrop blur and edge reflections. Screenshots themselves stay unfiltered. Dark sections use a separate glass tint; phones use less blur. Browsers without backdrop filtering and users requesting reduced transparency receive readable opaque surfaces.
