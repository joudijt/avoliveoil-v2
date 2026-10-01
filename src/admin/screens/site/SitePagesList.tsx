import { Link } from 'react-router-dom';
import { LuChevronRight, LuHouse, LuInfo, LuLeaf, LuMail, LuPackage, LuPanelTop, LuShoppingBag, LuSparkles } from 'react-icons/lu';
import { api } from '../../api';
import { plural } from '../../lib/format';
import { useLoad } from '../../lib/hooks';
import { Card, Chip, ErrorBlock, LoadingBlock, PageHeader } from '../../ui/ui';
import { humanizeKey } from './siteUtil';

const ORDER = ['home', 'products', 'infused', 'shop', 'why-us', 'contact', 'global'];
const ICON: Record<string, React.ReactNode> = {
  home: <LuHouse />,
  products: <LuPackage />,
  infused: <LuSparkles />,
  shop: <LuShoppingBag />,
  'why-us': <LuLeaf />,
  contact: <LuMail />,
  global: <LuPanelTop />,
};

export function SitePagesList() {
  const structure = useLoad(() => api.siteStructure(), []);
  const pending = useLoad(() => api.sitePending(), []);
  const orphans = useLoad(() => api.siteOrphans(), []);
  const pages = structure.data?.pages ?? {};
  const keys = Object.keys(pages).sort((a, b) => (ORDER.indexOf(a) + 1 || 99) - (ORDER.indexOf(b) + 1 || 99));

  return (
    <>
      <PageHeader title="Site pages" subtitle="Change the words and photos on the website’s built-in pages. The design stays exactly as it is." />
      {structure.loading && !structure.data && <LoadingBlock />}
      {structure.error && <ErrorBlock message={structure.error} onRetry={() => void structure.reload()} />}
      {structure.data && (
        <div className="grid gap-3 md:grid-cols-2">
          {keys.map((k) => {
            const def = pages[k];
            const pageKeys = new Set([...def.groups.flatMap((g) => g.keys), ...def.images]);
            const waiting = (pending.data ?? []).filter((p) => pageKeys.has(p.key)).length;
            const texts = def.groups.reduce((n, g) => n + g.keys.length, 0);
            return (
              <Link key={k} to={`/site/${k}`} className="group">
                <Card className="flex h-full items-center gap-4 transition-shadow group-hover:shadow-[var(--shadow-pop)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-xl text-olive">{ICON[k] ?? <LuPanelTop />}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-ink">{def.label}</span>
                      {waiting > 0 && <Chip tone="warn">{plural(waiting, 'change')} waiting</Chip>}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-muted">
                      {k === 'global' ? 'Menu, footer and texts used on every page' : def.paths ? `${def.paths.length} product pages` : `/en${def.path ? '/' + def.path : ''}`}
                      {' · '}
                      {plural(texts, 'text')}
                      {def.images.length ? ` · ${plural(def.images.length, 'photo')}` : ''}
                    </div>
                  </div>
                  <LuChevronRight className="shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-olive" />
                </Card>
              </Link>
            );
          })}
        </div>
      )}
      {orphans.data && orphans.data.length > 0 && (
        <Card className="mt-6">
          <div className="flex items-start gap-3">
            <LuInfo className="mt-0.5 shrink-0 text-lg text-warn" />
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-ink">{orphans.data.length === 1 ? '1 older edit no longer applies' : `${orphans.data.length} older edits no longer apply`}</h2>
              <p className="mt-0.5 text-[13px] text-muted">
                The website was updated and these texts no longer exist, so your edits to them are ignored. Nothing to do — this is for your information.
              </p>
              <ul className="mt-2 flex flex-col gap-0.5 text-[12.5px] text-muted">
                {orphans.data.slice(0, 8).map((o) => (
                  <li key={o.lang + o.key} className="truncate">
                    {humanizeKey(o.key)} ({o.lang === 'en' ? 'EN' : 'BM'})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
