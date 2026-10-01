/**
 * Builder-only styling, injected as a <style> element by the canvas. Plain CSS
 * keyed on data attributes on purpose: none of this may leak into the public
 * Tailwind class contract (CMS_CLASS_LIST), and the canvas must look the same
 * whatever the public CSS build contains.
 */
const GOLD = '#b88a2a';
const OLIVE_DARK = '#2e3a24';
const BLUE = '#3b82f6';

export const CANVAS_CSS = `
html[data-cms-canvas] *, html[data-cms-canvas] *::before, html[data-cms-canvas] *::after {
  transition: none !important; animation: none !important; scroll-behavior: auto !important;
}
html[data-cms-canvas], html[data-cms-canvas] body { overflow-x: hidden; }
html[data-cms-canvas] [data-cms-site-chrome] { pointer-events: none; user-select: none; }
html[data-cms-canvas] iframe, html[data-cms-canvas] video { pointer-events: none; }
html[data-cms-canvas] [data-node-kind] { position: relative; }
html[data-cms-canvas] [data-node-kind="widget"] { cursor: default; }

[data-cms-placeholder] { opacity: .45; font-style: italic; }
[data-cms-editing] { outline: 2px solid ${GOLD} !important; outline-offset: 4px; cursor: text !important; opacity: 1 !important; font-style: inherit; }
[data-cms-editing]:focus { outline: 2px solid ${GOLD} !important; }

[data-cms-canvas-empty], [data-cms-empty-col], [data-cms-empty-doc] {
  display: flex; align-items: center; justify-content: center; text-align: center;
  min-height: 96px; padding: 16px; border: 2px dashed rgba(46,58,36,.25); border-radius: 12px;
  font: 500 13px/1.4 Inter, system-ui, sans-serif; color: rgba(46,58,36,.6); background: rgba(255,253,248,.6);
}
[data-cms-empty-col] { cursor: pointer; min-height: 120px; }
[data-cms-empty-col]:hover { border-color: ${GOLD}; color: ${GOLD}; }
[data-cms-empty-col][data-drop-active] { border-color: ${BLUE}; color: ${BLUE}; background: rgba(59,130,246,.06); }
[data-cms-empty-doc] { min-height: 260px; margin: 48px 24px; cursor: pointer; font-size: 15px; }
[data-cms-empty-doc]:hover { border-color: ${GOLD}; color: ${GOLD}; }

/* hidden on the device the canvas is showing: faded + tagged instead of gone */
@media (min-width: 1024px) {
  [data-hide~="desktop"] > * { opacity: .35; }
  [data-hide~="desktop"]::after { content: "Hidden on desktop"; }
}
@media (min-width: 768px) and (max-width: 1023.98px) {
  [data-hide~="tablet"] > * { opacity: .35; }
  [data-hide~="tablet"]::after { content: "Hidden on tablet"; }
}
@media (max-width: 767.98px) {
  [data-hide~="mobile"] > * { opacity: .35; }
  [data-hide~="mobile"]::after { content: "Hidden on mobile"; }
}
[data-hide]::after {
  position: absolute; top: 6px; right: 6px; z-index: 5; pointer-events: none;
  padding: 2px 8px; border-radius: 999px; background: ${OLIVE_DARK}; color: #fffdf8;
  font: 600 10px/16px Inter, system-ui, sans-serif; letter-spacing: .04em; text-transform: uppercase; font-style: normal;
}

/* overlay layer */
.cmsc-layer { position: absolute; left: 0; top: 0; width: 0; height: 0; z-index: 2147483000; pointer-events: none; }
.cmsc-box { position: absolute; pointer-events: none; box-sizing: border-box; }
.cmsc-hover { outline: 1px dashed ${BLUE}; outline-offset: 0; }
.cmsc-hover.cmsc-section { outline: 1px dashed rgba(59,130,246,.7); outline-offset: -1px; }
.cmsc-selected { outline: 2px solid ${BLUE}; outline-offset: 0; }
.cmsc-selected.cmsc-section { outline-offset: -2px; }
.cmsc-label {
  position: absolute; pointer-events: none; white-space: nowrap; padding: 0 7px; height: 18px;
  font: 600 10px/18px Inter, system-ui, sans-serif; letter-spacing: .04em; text-transform: uppercase;
  color: #fff; background: ${BLUE}; border-radius: 4px 4px 0 0;
}
.cmsc-toolbar {
  position: absolute; pointer-events: auto; display: flex; gap: 1px; height: 24px; padding: 0; overflow: hidden;
  background: ${BLUE}; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,.18);
}
.cmsc-toolbar.cmsc-section { background: ${OLIVE_DARK}; }
.cmsc-toolbar button, .cmsc-toolbar [draggable] {
  all: unset; box-sizing: border-box; display: flex; align-items: center; justify-content: center;
  width: 26px; height: 24px; color: #fff; cursor: pointer; font-size: 13px;
}
.cmsc-toolbar [draggable] { cursor: grab; }
.cmsc-toolbar button:hover, .cmsc-toolbar [draggable]:hover { background: rgba(255,255,255,.18); }
.cmsc-toolbar button:focus-visible { outline: 2px solid #fff; outline-offset: -2px; }
.cmsc-toolbar button[disabled] { opacity: .35; cursor: default; background: none; }
.cmsc-toolbar svg { width: 14px; height: 14px; }

.cmsc-gap { position: absolute; left: 0; right: 0; height: 18px; pointer-events: auto; display: flex; align-items: center; justify-content: center; }
.cmsc-gap::before { content: ""; position: absolute; left: 0; right: 0; top: 8px; height: 2px; background: ${GOLD}; opacity: 0; }
.cmsc-gap button {
  all: unset; position: relative; display: flex; align-items: center; gap: 6px; height: 22px; padding: 0 10px; border-radius: 999px;
  background: ${GOLD}; color: #fff; font: 600 11px/22px Inter, system-ui, sans-serif; cursor: pointer; opacity: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,.18);
}
.cmsc-gap:hover::before, .cmsc-gap:hover button, .cmsc-gap button:focus-visible { opacity: 1; }
.cmsc-gap button:focus-visible { outline: 2px solid ${OLIVE_DARK}; outline-offset: 2px; }
.cmsc-gap svg { width: 12px; height: 12px; }

.cmsc-drop { position: absolute; height: 4px; margin-top: -2px; background: ${BLUE}; border-radius: 2px; pointer-events: none; box-shadow: 0 0 0 2px rgba(255,255,255,.8); }
.cmsc-drop::before, .cmsc-drop::after { content: ""; position: absolute; top: -3px; width: 10px; height: 10px; border-radius: 50%; background: ${BLUE}; }
.cmsc-drop::before { left: -5px; } .cmsc-drop::after { right: -5px; }
.cmsc-drop.cmsc-section { background: ${GOLD}; height: 6px; margin-top: -3px; }
.cmsc-drop.cmsc-section::before, .cmsc-drop.cmsc-section::after { background: ${GOLD}; top: -2px; }

.cmsc-rte {
  position: absolute; pointer-events: auto; display: flex; gap: 2px; padding: 3px; border-radius: 8px;
  background: ${OLIVE_DARK}; box-shadow: 0 6px 18px rgba(0,0,0,.25);
}
.cmsc-rte button {
  all: unset; box-sizing: border-box; min-width: 28px; height: 26px; padding: 0 6px; border-radius: 5px; display: flex; align-items: center; justify-content: center;
  color: #fffdf8; font: 600 12px/26px Inter, system-ui, sans-serif; cursor: pointer;
}
.cmsc-rte button:hover, .cmsc-rte button[aria-pressed="true"] { background: rgba(255,255,255,.16); color: ${GOLD}; }
.cmsc-rte button:focus-visible { outline: 2px solid ${GOLD}; outline-offset: -2px; }
.cmsc-rte svg { width: 14px; height: 14px; }
`;
