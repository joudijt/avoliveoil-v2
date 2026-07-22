import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '../../assets/logo/logo_theme.svg';
import bottleImg from '../../assets/images/bottle-cutout.png';

interface LoadingProps {
  onDone: () => void;
}

export function Loading({ onDone }: LoadingProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bottleWrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete: onDone,
        });
      },
    });

    const fillProxy = { v: 0 };
    tl.fromTo(bottleWrapRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
      .to(
        fillProxy,
        {
          v: 0.82,
          duration: 1.8,
          ease: 'power1.inOut',
          onUpdate: () => setFill(fillProxy.v),
        },
        '-=0.4',
      )
      .fromTo(logoRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.9')
      .to(barRef.current, { scaleX: 1, duration: 1.9, ease: 'power1.inOut' }, '<')
      .to({}, { duration: 0.5 });

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg"
    >
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gold/40"
            style={{
              width: `${4 + (i % 5) * 2}px`,
              height: `${4 + (i % 5) * 2}px`,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animation: `float-particle ${6 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      <div ref={bottleWrapRef} className="relative h-[48vh] max-h-[420px]">
        <img
          src={bottleImg}
          alt=""
          aria-hidden
          className="h-full w-auto object-contain opacity-30 grayscale"
        />
        <img
          src={bottleImg}
          alt="Arabian Village"
          className="absolute inset-0 h-full w-auto object-contain"
          style={{ clipPath: `inset(${(1 - fill) * 100}% 0 0 0)` }}
        />
      </div>

      <img ref={logoRef} src={logo} alt="Arabian Village" className="mt-4 h-12 opacity-0" />

      <div className="mt-6 h-px w-48 overflow-hidden bg-olive/15">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-gold" />
      </div>

      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-24px) translateX(10px); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
