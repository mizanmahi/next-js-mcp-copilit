import type { CursorMode } from './types';

type MagneticCursorProps = {
  mode: CursorMode;
  dotRef: React.RefObject<HTMLDivElement | null>;
  ringRef: React.RefObject<HTMLDivElement | null>;
};

export default function MagneticCursor({ mode, dotRef, ringRef }: MagneticCursorProps) {
  const ringClasses =
    mode === 'active'
      ? 'h-[68px] w-[68px] -ml-[34px] -mt-[34px] border-violet-500/95'
      : mode === 'eye'
        ? 'h-14 w-14 -ml-7 -mt-7 bg-cyan-300/15'
        : 'h-[42px] w-[42px] -ml-[21px] -mt-[21px]';

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] max-md:hidden">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 -ml-1 -mt-1 rounded-full bg-white"
        style={{ transform: 'translate3d(-100px,-100px,0)', willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className={[
          'absolute left-0 top-0 grid place-items-center rounded-full border border-cyan-300/90 shadow-[0_0_22px_rgba(0,245,212,0.4)]',
          'transition-[width,height,margin,border-color,background] duration-200',
          ringClasses,
        ].join(' ')}
        style={{ transform: 'translate3d(-100px,-100px,0)', willChange: 'transform' }}
      >
        {mode === 'eye' ? <span>◉</span> : null}
      </div>
    </div>
  );
}
