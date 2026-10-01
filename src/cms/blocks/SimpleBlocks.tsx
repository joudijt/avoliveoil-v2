import type { DividerWidget, SpacerWidget, VideoWidget } from '../contracts';
import { parseVideoUrl } from '../video';
import { ALIGN_FLEX, DIVIDER, SPACER, VIDEO, cx } from './classes';
import { useBlockEnv } from './context';
import { CanvasEmpty } from './CanvasEmpty';
import { ui } from './strings';
import { LeafSolidIcon } from './icons';

export function SpacerBlock({ w }: { w: SpacerWidget }) {
  return <div className={SPACER[w.settings.size] ?? SPACER.m} aria-hidden="true" />;
}

export function DividerBlock({ w }: { w: DividerWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  if (s.style === 'leaf') {
    return (
      <div className={ALIGN_FLEX[env.align]}>
        <div className={cx(DIVIDER.leaf, DIVIDER.leafWidth[s.width] ?? DIVIDER.leafWidth.s)} role="separator">
          <span className={DIVIDER.leafLine} />
          <LeafSolidIcon className={DIVIDER.leafIcon} />
          <span className={DIVIDER.leafLine} />
        </div>
      </div>
    );
  }
  return (
    <div className={ALIGN_FLEX[env.align]}>
      <hr className={cx(s.style === 'gold' ? DIVIDER.gold : DIVIDER.line[env.tone], DIVIDER.width[s.width] ?? DIVIDER.width.s)} />
    </div>
  );
}

export function VideoBlock({ w }: { w: VideoWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const video = parseVideoUrl(s.url);
  if (!video) return env.mode === 'canvas' ? <CanvasEmpty label="Video — paste a YouTube, Vimeo or .mp4 link in the settings panel" /> : null;
  const title = s.title?.[env.lang]?.trim() || ui(env.lang, 'video');
  return (
    <div className={cx(VIDEO.frame, VIDEO.ratio[s.ratio] ?? VIDEO.ratio['16/9'])}>
      {video.kind === 'mp4' ? (
        <video className={VIDEO.video} src={video.src} controls preload="metadata" playsInline title={title} />
      ) : (
        <iframe
          className={VIDEO.iframe}
          src={video.embed}
          title={title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
}
