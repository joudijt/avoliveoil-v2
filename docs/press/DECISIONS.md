# PRESS decisions — avoliveoil.com

Numbered, with who decided. A decision the user made carries their words. A decision PRESS made
under delegation is marked **assumed**, never *approved*.

| # | Decision | Source |
|---|---|---|
| D1 | Codeword for this flow is **PRESS** | User, 2026-08-20: "1a" |
| D2 | Articles are **800–1,000 words** | User: "2a" |
| D3 | Slugs use native script per language | User: "7a" |
| D4 | Images must be **free**, zero cost | User: "6a" |
| D5 | The legal-ceiling step is **generic per project**, not hardcoded to Malaysia | User: "not nessercy about health bcz i might choose another project… this flow must be general for any project" |
| D6 | Language mix comes from demand data, not the site's language list | User: "5b" — 2 Arabic, the other 3 moved to Malay |
| D7 | Batch size is decided per project at run time, not fixed in the flow | User: "8 as i said no need to specify this in the flow" |
| D8 | The live health-benefits article stays as it is | User: "4a" |

## Round 1 decisions taken by PRESS

| # | Decision | Basis |
|---|---|---|
| D9 **assumed** | **Arabic slugs are ASCII transliteration, not Arabic script** — a degradation of D3 | `public/.htaccess` L32–33 routes articles with `([a-z0-9-]+)`. Arabic characters never match, so the prerendered file is skipped and a crawler receives the SPA shell with no meta and no JSON-LD. Malay slugs are native Malay words and meet D3 in full. Reversible only via 301s, so it is recorded rather than left implicit |
| D10 **assumed** | Four shortlisted keywords dropped for cannibalisation and replaced | Existing articles already own `olive oil Malaysia`, `authentic extra virgin olive oil Malaysia`, `minyak zaitun dara asli`, `زيت الزيتون في ماليزيا`. Two pages chasing one term costs both |
| D11 **assumed** | The `khasiat` / `kebaikkan` / `untuk minum` cluster (≈6,000/mo, the largest in this market) is **not targeted** | Every query in it wants a health claim. Reg. 18(6), and `storeFacts.json` → `compliance` already states the ceiling in three languages. Reversing this needs a compliance opinion, not a content decision |
| D12 **assumed** | Round payload ceiling of **6 MB** | The build already ships 26 MB, almost all unoptimised PNG. An unbounded image round would make every article slower than the page it is trying to outrank |
| D13 **assumed** | Articles are **single-language, not translated sets** | PRESS non-negotiable 4 and the `llms.txt` seven-rule standard. Each `id` therefore appears in one language module and one `slugs.json` entry |
| D14 | Search Console data is **absent** from this round | The property is not connected. Volumes only. Recorded so the plan is not read as being informed by live ranking data |
