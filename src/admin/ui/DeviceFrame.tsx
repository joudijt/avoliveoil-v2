import { forwardRef, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { LuMonitor, LuSmartphone, LuTablet } from 'react-icons/lu';
import { Segmented } from './ui';

import { DEVICE_WIDTH, type Device } from '../lib/device';

export function DeviceSwitch({ value, onChange }: { value: Device; onChange: (d: Device) => void }) {
  return (
    <Segmented
      size="sm"
      value={value}
      onChange={onChange}
      ariaLabel="Preview size"
      options={[
        { value: 'desktop', label: <LuMonitor />, title: 'Computer (1280 px)' },
        { value: 'tablet', label: <LuTablet />, title: 'Tablet (820 px)' },
        { value: 'mobile', label: <LuSmartphone />, title: 'Phone (390 px)' },
      ]}
    />
  );
}

/**
 * An iframe rendered at the real device width and scaled down to fit the stage, so the
 * page uses its true breakpoints (a 1280 px desktop layout on a 1100 px wide stage).
 */
export const DeviceFrame = forwardRef<HTMLIFrameElement, { device: Device; src: string; title: string; onLoad?: () => void; children?: ReactNode }>(function DeviceFrame(
  { device, src, title, onLoad, children },
  ref
) {
  const stage = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1000, h: 700 });
  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const w = DEVICE_WIDTH[device];
  const scale = Math.min(1, (size.w - 48) / w);
  return (
    <div ref={stage} className="relative h-full w-full overflow-hidden">
      <div className="absolute left-1/2 top-5 -translate-x-1/2" style={{ width: w * scale, height: size.h - 40 }}>
        <iframe
          ref={ref}
          src={src}
          title={title}
          onLoad={onLoad}
          className="origin-top-left rounded-lg bg-white shadow-[0_8px_30px_-6px_rgb(38_48_30/0.25)]"
          style={{ width: w, height: (size.h - 40) / scale, transform: `scale(${scale})`, border: 0 }}
        />
        {children}
      </div>
    </div>
  );
});
