# Article images — the standing policy

**Owner ruling, 2026-08-26: article pictures come from this website's own photo library, and only
from it. Nothing is generated.**

`scripts/recut-article-images.py` is the single source of truth for which photo each article
carries. It cuts every hero, inline and OG card from `src/assets/images/`, and
`scripts/sync-article-alt.py` then rewrites each article's alt text to describe the frame it
actually got. Run them in that order after any round.

## What the plan guarantees

* every article image is a crop of a real photograph in this repo
* **no reader browsing one language ever meets the same picture twice** — crop uniqueness is
  scoped per language and frames rotate so neighbours on the blog index always differ
* heroes are never upscaled: a hero crop is at least 1280 px wide at source
* the product label is never enlarged — the two frames where the bottle fills the shot are
  barred from heroes in code, and three more are barred entirely

## The arithmetic, stated plainly

The library holds **16 usable photographs**. The site has **87 articles**, each needing a hero and
an inline. That is 174 slots from 16 frames.

Within one language the plan produces a distinct crop for every article. Across the site, a scene
necessarily recurs — the mill, the bottling line, the tasting bench, the grove at sunset and the
pipe into the vat are what the library contains, so those are what the blog shows. **No cropping
strategy fixes that; only more photographs do.**

Two things would change it, and both are the owner's call:

1. **A photo shoot.** Twenty to thirty new frames — the product in a Malaysian kitchen, the
   branches, a table, a shelf — would cover the whole site comfortably and are the only thing that
   makes the pictures genuinely varied.
2. **Allowing generation again** for the slots the library cannot cover. Ruled out on 2026-08-26.

Until then the honest position is the one shipped here: real photographs, no repeats a single
reader will notice, and the recurrence recorded rather than hidden.
