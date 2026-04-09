import Image from 'next/image';
import type { NavItem } from './types';

type LandingSidebarProps = {
  activeSection: string;
  navItems: NavItem[];
  navWrapperRef: React.RefObject<HTMLDivElement | null>;
  navItemRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
  navIndicator: { y: number; h: number };
  statusTooltip: boolean;
  setStatusTooltip: React.Dispatch<React.SetStateAction<boolean>>;
  soundOn: boolean;
  setSoundOn: React.Dispatch<React.SetStateAction<boolean>>;
  onJumpTo: (id: string) => void;
};

export default function LandingSidebar({
  activeSection,
  navItems,
  navWrapperRef,
  navItemRefs,
  navIndicator,
  statusTooltip,
  setStatusTooltip,
  soundOn,
  setSoundOn,
  onJumpTo,
}: LandingSidebarProps) {
  return (
    <aside className="sidebar glass" aria-label="Portfolio navigation">
      <div className="sidebar-head">
        <div className="profile-halo" data-cursor="eye">
          <Image src="/iomage/mizan_profile_img.jpg" alt="Mizanur Rahman" width={400} height={400} priority />
        </div>
        <h1>Mizanur Rahman</h1>
        <p>Full-Stack Web Developer</p>
      </div>

      <button
        type="button"
        className="status-pill"
        onClick={() => setStatusTooltip((current) => !current)}
        data-cursor="active"
      >
        <span className="status-dot" />
        Available for freelance
      </button>
      {statusTooltip ? (
        <div className="status-tooltip">Open to consulting and full-stack projects.</div>
      ) : null}

      <div ref={navWrapperRef} className="nav-wrap">
        <div
          className="nav-indicator"
          style={{ transform: `translateY(${navIndicator.y}px)`, height: `${navIndicator.h}px` }}
        />
        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              ref={(node) => {
                navItemRefs.current[item.id] = node;
              }}
              type="button"
              className={item.id === activeSection ? 'active' : ''}
              onClick={() => onJumpTo(item.id)}
              data-cursor="active"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <button
        type="button"
        className="sound-toggle"
        onClick={() => setSoundOn((current) => !current)}
        data-cursor="active"
      >
        {soundOn ? '🔊 Ambient On' : '🔇 Ambient Off'}
      </button>
    </aside>
  );
}
