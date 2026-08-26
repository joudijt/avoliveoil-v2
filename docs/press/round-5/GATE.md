# PRESS round 5 — gate report

## Mechanical gate

`bin/press_gate.py` over the rendered `dist/` HTML, 18 articles, `--max-words 1060`.

**ALL GATES PASSED, 0 failures, first run.** Round 4 spent four rebuild cycles trimming one article
that passed the draft check and failed the rendered gate; this round's brief carried an 800–980
band with an explicit "aim 900–960" instead of the validator's 800–1000, and not one article
needed a trim. That change is worth keeping.

Repo gates: `tsc -b` 0 · `check:llms` 0 · `check:ai` 0 · sitemap 105 → **123 URLs** · payload
**4.4 MB** against the 6 MB ceiling.

Cannibalisation: 18 focus keywords, all unique inside the round and against the **69** live
article instances; no slug or id collisions.

## Adversarial review — three reviewers, one per language

**Seventeen blockers.** As in rounds 3 and 4, almost none were bad writing.

### Fixed before shipping

| # | Lang | Defect | Fix |
|---|---|---|---|
| B | en | **The balsamic article's ratio table was the live salad-dressing table with the middle column relabelled**, and its first row inverted the article's own rule ("sharper bottle, more oil"). Four statements pointed in three directions on the one fact the page exists for | Table rebuilt on the axis that belongs to it — the vinegar's sweetness, not the leaf |
| B | en | The same article headlined **3:1** while the live salad-dressing article publishes **4:1 for balsamic specifically** | Default moved to 4:1, and it now says so is what the blog already publishes |
| B | en | It repeated the live bread article's dipping-saucer passage, including the phrase "the vinegar sits under the oil in beads" **verbatim** — which the brief had explicitly said to link, not repeat | Rewritten as a pointer |
| B | en | The avocado comparison sent **plain cake batter to avocado oil**, against two live articles that answer that exact case with a milder *olive* oil | Row narrowed to raw emulsions |
| B | en | `olive-oil-for-hummus` is built on "hummus takes oil twice" and its table listed **three** pours; the third then vanished from the batch table, the conclusion and both FAQs | Orphan row removed |
| B | ms | **`minyak-zaitun-untuk-air-fryer` said "the advice on this site is never to reuse frying oil" — and this site's live article allows two or three times with filtering.** The brief I wrote carried the error; the draft attributed it to the site | Rewritten to be about drawer residue, which genuinely is not reusable, with the false attribution dropped |
| B | ms | `minyak-zaitun-untuk-pasta` published a second recipe for the same dish and the same two servings as the live one — 180 g/5 tbsp against the live 200 g/4 tbsp, and the live figure sits inside a table that sums across four recipes | Aligned to the published recipe |
| B | ms | **`minyak-zaitun-keruh` redefined `ditapis`.** Across the whole published Malay corpus that word is the *refined* grade, a rung below dara; the draft used it for "filtered" and told the reader a `ditapis` bottle can be excellent virgin oil — one click from the article that lists "minyak ditapis dijual sebagai dara" as fraud | Switched to `disaring` |
| B | ms | `minyak-zaitun-untuk-roti` told readers to keep za'atar out of the oil in its key takeaway and step 3, and to stir it in in its pairing list and its FAQ | Resolved in favour of the dish: za'atar in, dukkah dry |
| B | ar | `zayt-alzaytun-fi-ramadan` gave fattoush **3:1 and two spoons**; the live salad article publishes **2:1 and says fattoush needs a third spoon** because the toasted bread drinks the dressing | Aligned |
| B | ar | A `zayt-alzaytun-walzaatar` FAQ answer, quoted alone, told readers to put **fresh green thyme in oil** with no refrigeration caveat — on a site that publishes a whole English article on that hazard | Caveat added inline |
| B | ar | **All three machine briefs flatly forbade the fridge** ("Do not refrigerate" / "Jangan simpan dalam peti sejuk" / "لا تضعه في الثلاجة") while every live storage article says it is merely *unnecessary* and that cold cloudiness is normal | The three templates now match the articles |
| B | ar | `anwae-alzaytun` reproduced a sentence from the live origin article **word for word**, and re-rated the same seven cultivars its table already carries | Sentence rewritten, the country mapping handed back to that article |
| B | ar | The round published **two different manaqish oil-to-za'atar ratios** on the same day | Harmonised at 1:1 |
| B | ar | `zayt-alzaytun-lilmuajanat` published "between a tenth and a quarter of the flour's weight" for 2–3 tbsp against 120 g — which is a fifth to a third. The article supplies the numbers to check itself with | Corrected |
| S | ar | The Ramadan article gave **three different answers** to "how many bottles does a hosting household buy" — table, FAQ and shopping list | Aligned |
| S | ar | The za'atar storage table had its last row's columns swapped: an article link under "where to keep it", a place under "how long" | Corrected |
| S | en | "this site publishes 190–210 °C", three times, in passages designed to be quoted alone where "this site" has no referent — and it reframed a general published range as a house number | "Published figures put…" |
| S | en | The aglio e olio method pulled the pasta **two minutes** early and finished it for 90 seconds; hard-coded the for-two quantities with no cue to double; lifted with tongs while the section and FAQ said keep water back; and left the garlic in hot oil for three to five minutes | All four corrected |
| S | en/ar | An unsourced 6% acidity figure for balsamic, a herb-keeping time that merged two published rows, a 20-minute figure applied to the bottle where the site publishes an hour, a chickpea tin conversion 25% out, and a one-off category label | All corrected |

### Verified clean — do not "fix" these later

- **`minyak-zaitun-vs-minyak-sawit` handled the politics well.** It never calls palm oil unhealthy,
  inferior or an environmental problem, never suggests dropping it, concedes twice and unprompted
  that palm's smoke point is the higher one, and closes on "the household that finds olive oil
  easiest is not the one that threw the palm oil out".
- **Reg. 18(6): clean in all eighteen**, prose, table cells and FAQ answers. The two health hits in
  the avocado article are both refusals pointing at a dietitian.
- **No acidity figure attached to this product** anywhere. No invented award, rating, count,
  tonnage, lab result or certification.
- **Every internal link resolves** — all `related` paths and all in-body links, three languages,
  checked against `slugs.json` and the router.
- `cloudy-olive-oil` and `minyak-zaitun-keruh` both hold the fridge line correctly and both agree
  with the live Malay article that the fridge test is a myth in either direction.
- `zayt-alzaytun-walzaatar` carries **no** health framing — notable, because essentially all Arabic
  writing on that phrase is benefits content. `zayt-alzaytun-fi-ramadan` carries no religious
  framing and no claim about fasting and the body.
- All six Arabic h1s are orthographically sound; round 4's stripped-hamza defect did not recur.

### Left open — recorded as D40–D42

1. **The Malay pasta recipe now agrees with the live one, but the live one's own arithmetic table
   should be re-checked** if either changes again.
2. **`journey-08-final` is already live as a hero on three articles from rounds 2–4** and shows the
   product label at hero size. Round 5 barred it going forward; the three live pages were not re-cut.
3. **The round is visibly templated** — 18 articles the same day, six sections each, a 22-word
   spread in English. Worth varying deliberately next round.
