# PRESS round 8 — keyword → article map

**Round size:** 15 articles — 9 English, 6 Malay, **0 Arabic** (user ruling).
**Branch:** `press-round-gsc` off `main` @ `dc2df07`.
**Volumes:** Google Ads Keyword Planner, geo **2458** (Malaysia), pulled **2026-09-10**,
language 1000 (EN) / 1102 (MS), via account `9254118864`.
**Search Console:** the five head terms were supplied to this round from a live GSC + Keyword
Planner read done earlier in the session. This round did **not** re-derive them and could **not**
independently re-verify the GSC half — the Cogny GSC connector returned *"Out of free calls (used
all 15 this period)"*. Recorded as an unrun check, not a passed one (gates.md reporting rule).

---

## 1. The five assigned head terms, and what the corpus already does with them

| # | Head term | Vol/mo | Comp | Lang | Already owned by a live article? |
|---|---|---|---|---|---|
| K1 | `kelebihan olive oil` | 480 | MEDIUM | MS | **No.** Nearest live: `manfaat minyak zaitun dara` |
| K2 | `olive oil is it healthy` | 210 | LOW | EN | **No.** |
| K3 | `extra virgin olive oil health benefits` | 170 | LOW | EN | ⛔ **YES — verbatim.** `extra-virgin-olive-oil-health-benefits-for-malaysian-families` |
| K4 | `olive oil malaysia` | 880 | HIGH | EN | ⛔ **YES — verbatim.** `why-olive-oil-is-becoming-popular-in-malaysia` (focus `olive oil Malaysia`) |
| K5 | `minyak zaitun` | 8,100 | HIGH | MS | **No.** 44 live Malay articles all take `minyak zaitun <qualifier>`; the bare head is unclaimed |

### The structural decision this forces

PRESS non-negotiable 8 and gate 26a forbid two articles sharing one focus keyword, and
non-negotiable 6 / gate 32 forbid taking a term a live page already owns. A round of "3 articles
per keyword" can therefore only mean **3 articles per keyword *cluster*, each on its own distinct
focus term inside it**.

Where the head is already owned (**K3**, **K4**), **no article in this round takes it.** The three
articles in those clusters take uncontested adjacent terms and **link into the incumbent** rather
than competing with it. D8 ("the live health-benefits article stays as it is") is honoured.

---

## 2. The 15 articles

All 15 focus keywords are distinct from each other (gate 26a ✅) and from all 123 live focus
keywords (gate 32 ✅). All 15 slugs and ids are free in `slugs.json` (✅, verified).

### Cluster A — `kelebihan olive oil` (K1) · Malay · 3 articles

| id / slug | Focus keyword | Vol | Comp | Angle |
|---|---|---|---|---|
| `kelebihan-olive-oil-untuk-dapur-harian` | **kelebihan olive oil** | 480 | MEDIUM | What "advantage" means once the bottle is in a Malaysian kitchen: grade, freshness, flavour, cost per use. Defers the health question to the live `manfaat-kesihatan-…` article by link |
| `kelebihan-extra-virgin-olive-oil-berbanding-gred-lain` | **kelebihan extra virgin olive oil** | 90 | MEDIUM | The advantage *is the grade*: what the top grade gives that pure / pomace / refined do not, and where that advantage is destroyed by heat |
| `cara-makan-minyak-zaitun-setiap-hari` | **cara makan minyak zaitun** | 110 | MEDIUM | How people actually eat it day to day — bread, salad, drizzle, rice, a finishing spoon. Usage, not dosage |

### Cluster B — `olive oil is it healthy` (K2) · English · 3 articles

| id / slug | Focus keyword | Vol | Comp | Angle |
|---|---|---|---|---|
| `olive-oil-is-it-healthy` | **olive oil is it healthy** | 210 | LOW | Answers a health query with **label literacy**: this is a food, Malaysian law bars a seller from making disease claims, and here is what a label *can* honestly tell you — grade, harvest, origin, the 0.8% extra-virgin standard — versus what it cannot |
| `is-it-good-to-cook-with-extra-virgin-olive-oil` | **is it good to cook with extra virgin olive oil** | 50 | LOW | The "am I wasting the good oil on a hot pan" decision. Links the live smoke-point figures, does not restate them |
| `vitamins-in-extra-virgin-olive-oil` | **vitamins in extra virgin olive oil** | 10 | LOW | What the oil is *made of*, at category level with an external standard cited — and an explicit statement that this site publishes **no analysis of its own bottle** |

### Cluster C — `extra virgin olive oil health benefits` (K3, ⛔ head owned) · English · 3 articles

| id / slug | Focus keyword | Vol | Comp | Angle |
|---|---|---|---|---|
| `advantages-of-extra-virgin-olive-oil` | **advantages of extra virgin olive oil** | **590** | HIGH | ⭐ Largest term in the whole round. Advantages as an **ingredient and a purchase** — never as health. Distinct canonical group from K3 (590 vs 170) |
| `consuming-extra-virgin-olive-oil-day-to-day` | **consuming extra virgin olive oil** | 140 | HIGH | What "consuming" it actually looks like in a kitchen: raw vs heated, where the flavour goes, realistic quantities per dish |
| `extra-virgin-olive-oil-uses` | **extra virgin olive oil uses** | 20 | LOW | A **hub page**: which use needs which grade and which freshness, linking out to the ~20 live English how-to articles. Architecture, not another how-to |

### Cluster D — `olive oil malaysia` (K4, ⛔ head owned) · English · 3 articles

| id / slug | Focus keyword | Vol | Comp | Angle |
|---|---|---|---|---|
| `extra-virgin-olive-oil-in-malaysia` | **extra virgin olive oil in malaysia** | **210** | HIGH | ⭐ Largest unowned term in the cluster. What is actually on a Malaysian shelf and how to read it — the buyer's orientation page |
| `best-extra-virgin-olive-oil-in-malaysia` | **best extra virgin olive oil in malaysia** | 70 | HIGH | ⚠ **Highest cannibalisation risk in the round.** Converts a superlative query into criteria and honest limits. Must NOT be a ranking and must NOT restate the comparison *method* the live `how-to-compare-olive-oil-brands-in-malaysia` owns |
| `which-olive-oil-to-buy` | **which olive oil to buy** | 10 | LOW | The decision itself: a short question ladder ending in a grade and a size |

### Cluster E — `minyak zaitun` (K5) · Malay · 3 articles

| id / slug | Focus keyword | Vol | Comp | Angle |
|---|---|---|---|---|
| `minyak-zaitun-panduan-lengkap` | **minyak zaitun** | **8,100** | HIGH | ⭐ The Malay head term, unclaimed after 44 Malay articles. A **pillar/hub**: definition, grades, uses, storage, buying — each section a short answer linking to the live article that owns it |
| `minyak-zaitun-original-cara-pastikan` | **minyak zaitun original** | 170 | HIGH | The word "original" as marketplace sellers use it. What can actually be verified — seller, seal, batch, harvest, single legitimate distributor — versus what cannot. **This is where the Palestinian-origin differentiator lands** |
| `maksud-olive-oil-dalam-bahasa-malaysia` | **maksud olive oil dalam bahasa malaysia** | 10 | LOW | The terminology bridge: `olive oil` / `minyak zaitun` / `zaitun` / `zaiton`, and the grade words in Malay. Feeder into the pillar |

---

## 3. Discarded volume, and why (Stage 1 rule 3)

| Term / family | Vol | Discarded because |
|---|---|---|
| `khasiat minyak zaitun` | 2,400 | D11 — every query wants a health claim. Reg. 18(6) |
| `kebaikkan minyak zaitun` | 1,000 | D11 |
| `minyak zaiton untuk minum` | 880 | D11 — drinking-for-health intent |
| `cara minum minyak zaitun` | 390 | D11 |
| `manfaat minum minyak zaitun sebelum tidur` | 210 | D11 |
| `minyak zaitun olive house`, `minyak zaitun naturel`, `minyak zaitun al ard`, `minyak zaitun sihate`, `minsyam`, `olivie`, `Bertolli`, `Colavita`, `Cobram` | 30–590 each | D21 — competitor brand terms, standing brand-neutral rule |
| `extra virgin olive oil and weight loss` | 70 | Body-composition claim. Reg. 18(6) |
| `extra virgin olive oil for inflammation` | 20 | Disease claim. Reg. 18(6) |
| `extra virgin olive oil benefits for skin` / `for hair` / `on face` | 10–20 | Cosmetic use of a **food** product; different regulation, and the site sells food |
| `benefit of drinking extra virgin olive oil` / `on empty stomach` | 10–20 | D11 |
| `olive oil capsules malaysia` | 10 | Not this product |
| `olive oil for cooking malaysia` | 40 | Would cannibalise the live `how-to-cook-with-olive-oil-in-a-malaysian-kitchen` outright |
| `minyak zaitun organik` | 70 | ⛔ Already owned live (`minyak-zaitun-organik-apa-maksudnya`) |
| `best olive oil in malaysia` (170), `olive oil malaysia price` (140), `jenama minyak zaitun terbaik` (110) | — | ⛔ Already owned live |
| `minyak zaitun extra virgin terbaik` | 70 | Would have been a structural mirror of `best-extra-virgin-olive-oil-in-malaysia` across two languages — PRESS non-negotiable 4 |

**The brand's own differentiators have no search demand in Malaysia** and are not targeted by any
article this round: `palestinian olive oil` ~0/mo, `halal olive oil` 30 (and already owned live),
`first cold press olive oil` 10, `olive oil 500ml` 20. Palestinian origin, first cold press and the
single-distributor story are used **inside** articles that target the demand terms above, chiefly
`minyak-zaitun-original-cara-pastikan`, `extra-virgin-olive-oil-in-malaysia` and
`best-extra-virgin-olive-oil-in-malaysia`. Never as an article's own search target.

---

## 4. Cannibalisation risk register — carried into Stage 6

| New article | Rubs against (live) | Required separation |
|---|---|---|
| `best-extra-virgin-olive-oil-in-malaysia` | `how-to-compare-olive-oil-brands-in-malaysia` (`best olive oil in malaysia`, 170) | ⚠ **Highest risk.** Live page owns the *comparison method*. New page answers *what "best" can honestly mean for one grade* and links the method out |
| `extra-virgin-olive-oil-in-malaysia` | `why-olive-oil-is-becoming-popular-in-malaysia`, `how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia` | Live pages own the *trend* and the *authenticity test*. New page is a **shelf survey**: what grades and formats a Malaysian buyer actually meets |
| `is-it-good-to-cook-with-extra-virgin-olive-oil` | `olive-oil-smoke-point-…`, `how-to-cook-with-olive-oil-in-a-malaysian-kitchen` | Live pages own *the temperature* and *the how*. New page owns *the decision*. **No new smoke-point number may be invented; link the live figures** |
| `extra-virgin-olive-oil-uses` | ~20 live English how-to articles | Must be a **hub that links them**, never a re-explanation of any one of them |
| `advantages-of-extra-virgin-olive-oil` | `extra-virgin-olive-oil-uses` (same round) | Advantages = *why choose it at all*. Uses = *which use needs which grade* |
| `olive-oil-is-it-healthy` | `vitamins-in-extra-virgin-olive-oil` (same round) | Healthy = what a **label and a seller** may tell you. Vitamins = what the **oil** is made of |
| `minyak-zaitun-panduan-lengkap` | `mengapa-minyak-zaitun-semakin-popular-di-malaysia` (`minyak zaitun Malaysia`) | Pillar is **definition + navigation**. Live page is a **market trend**. Pillar must link it, not retell it |
| `minyak-zaitun-original-cara-pastikan` | `maksud-minyak-zaitun-tulen`, `cara-kenal-minyak-zaitun-palsu` | "Tulen" is a grade word, "palsu" is counterfeit detection. "Original" is a **marketplace listing word** — the article is about what that word does and does not promise |
| `kelebihan-olive-oil-untuk-dapur-harian`, `kelebihan-extra-virgin-olive-oil-…` | `manfaat-kesihatan-minyak-zaitun-dara-…` (`manfaat minyak zaitun dara`) | `kelebihan` = kitchen and purchase advantage. `manfaat kesihatan` = the live health page. Both new pages link it and neither restates it |
| `cara-makan-minyak-zaitun-setiap-hari` | `minyak-zaitun-untuk-masak-panduan-dapur`, `minyak-zaitun-untuk-roti-dan-cicahan` | Live pages own *cooking* and *dipping*. New page owns *the daily habit across meals* and links both |

---

## 5. Round budget

| Item | Value |
|---|---|
| Words per article | 800–980 (draft count), gate at `--max-words 1060` (rendered) |
| Payload ceiling | **6 MB** for the round (D12), measured after Stage 4 |
| Images | Site's own photography only. **No generation** (D16 / D-images, round 6) |
| Arabic | None this round |
