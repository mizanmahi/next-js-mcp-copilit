'use client';

import { Menu, Volume2, VolumeX, X } from 'lucide-react';
import { FormEvent, useEffect, useState, useRef } from 'react';
import BootScreen from '@/components/landingPage/BootScreen';
import CyberGrid from '@/components/landingPage/CyberGrid';
import MagneticCursor from '@/components/landingPage/MagneticCursor';
import OrbitalCommandRing from '@/components/landingPage/OrbitalCommandRing';
import ProgressArc from '@/components/landingPage/ProgressArc';
import { BOOT_LINES, NAV_ITEMS, SWITCH_WORDS } from '@/components/landingPage/constants';
import type { ContactResponse } from '@/components/landingPage/types';
import HeroSection from '@/components/landingPage/sections/HeroSection';
import AboutSection from '@/components/landingPage/sections/AboutSection';
import SkillsSection from '@/components/landingPage/sections/SkillsSection';
import ServicesSection from '@/components/landingPage/sections/ServicesSection';
import PortfolioSection from '@/components/landingPage/sections/PortfolioSection';
import ExperienceSection from '@/components/landingPage/sections/ExperienceSection';
import ContactSection from '@/components/landingPage/sections/ContactSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [navOpen, setNavOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [bootVisible, setBootVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [bootText, setBootText] = useState('');
  const [cursorMode, setCursorMode] = useState<'default' | 'active' | 'eye'>('default');
  const [soundOn, setSoundOn] = useState(false);
  const [contactMode, setContactMode] = useState<'chat' | 'classic'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [chatSuggestion, setChatSuggestion] = useState('');
  const [chatSubject, setChatSubject] = useState('Project inquiry from portfolio visitor');
  const [classicName, setClassicName] = useState('');
  const [classicEmail, setClassicEmail] = useState('');
  const [classicMessage, setClassicMessage] = useState('');
  const [contactStatus, setContactStatus] = useState('');
  const [glitchCard, setGlitchCard] = useState('');
  const [heroPassed, setHeroPassed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const heroRef = useRef<HTMLElement | null>(null);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % SWITCH_WORDS.length);
    }, 2200);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('ambient-sound-enabled');
    if (saved === 'true') {
      setSoundOn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ambient-sound-enabled', soundOn ? 'true' : 'false');
  }, [soundOn]);

  useEffect(() => {
    const fullBootText = `${BOOT_LINES.join('\n')}\n`;
    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setBootText(fullBootText.slice(0, index));

      if (index >= fullBootText.length) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setBootVisible(false);
        }, 700);
      }
    }, 24);

    const skipTimer = window.setTimeout(() => {
      setShowSkip(true);
    }, 1500);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(skipTimer);
    };
  }, []);

  useEffect(() => {
    const sectionElements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean,
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: '-12% 0px -30% 0px',
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const distance = Math.max(1, scrollHeight - clientHeight);
      setScrollProgress(scrollTop / distance);

      if (!heroRef.current) {
        return;
      }

      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      setHeroPassed(heroBottom < 110);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) {
      return;
    }

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };
    const magnetTarget = { x: mouse.x, y: mouse.y };
    let hoveredInteractive: Element | null = null;

    const handleMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;

      const hovered = document.elementFromPoint(event.clientX, event.clientY);
      const eyeTarget = hovered?.closest('[data-cursor="eye"]');
      const interactiveTarget = hovered?.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="active"]',
      );

      if (eyeTarget) {
        setCursorMode('eye');
      } else if (interactiveTarget) {
        setCursorMode('active');
      } else {
        setCursorMode('default');
      }

      hoveredInteractive = interactiveTarget ?? null;

      if (hoveredInteractive) {
        const box = hoveredInteractive.getBoundingClientRect();
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;
        magnetTarget.x = mouse.x + (cx - mouse.x) * 0.24;
        magnetTarget.y = mouse.y + (cy - mouse.y) * 0.24;
      } else {
        magnetTarget.x = mouse.x;
        magnetTarget.y = mouse.y;
      }
    };

    window.addEventListener('pointermove', handleMove);

    let raf = 0;
    const render = () => {
      ringPos.x += (magnetTarget.x - ringPos.x) * 0.18;
      ringPos.y += (magnetTarget.y - ringPos.y) * 0.18;

      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;

      raf = window.requestAnimationFrame(render);
    };

    raf = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!soundOn) {
      if (gainRef.current) {
        gainRef.current.gain.setTargetAtTime(0, gainRef.current.context.currentTime, 0.1);
      }
      return;
    }

    if (!audioContextRef.current) {
      const context = new window.AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = 'triangle';
      oscillator.frequency.value = 62;

      gain.gain.value = 0;
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();

      audioContextRef.current = context;
      gainRef.current = gain;
    }

    if (audioContextRef.current.state === 'suspended') {
      void audioContextRef.current.resume();
    }

    if (gainRef.current) {
      gainRef.current.gain.setTargetAtTime(0.02, gainRef.current.context.currentTime, 0.2);
    }

    return () => {
      if (gainRef.current) {
        gainRef.current.gain.setTargetAtTime(0, gainRef.current.context.currentTime, 0.1);
      }
    };
  }, [soundOn]);

  const jumpTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setNavOpen(false);
  };

  const handleRefine = async () => {
    if (!chatInput.trim()) {
      return;
    }

    setContactStatus('Refining message...');
    try {
      const response = await fetch('/api/ai-refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: chatInput }),
      });

      const data = (await response.json()) as {
        refined?: string;
        suggestion?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to refine the message right now.');
      }

      setChatSuggestion(data.refined ?? chatInput);
      if (data.suggestion) {
        setChatSubject(data.suggestion);
      }
      setContactStatus('Refined with AI copilot.');
    } catch (error) {
      setContactStatus(error instanceof Error ? error.message : 'Refinement failed.');
    }
  };

  const sendContact = async (payload: {
    name?: string;
    email?: string;
    subject: string;
    message: string;
    mode: 'chat' | 'classic';
  }) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as ContactResponse;

    if (!response.ok || !data.ok) {
      throw new Error(data.message || 'Unable to send message');
    }

    return data.message;
  };

  const handleChatSend = async () => {
    const outgoing = chatSuggestion || chatInput;

    if (!outgoing.trim()) {
      return;
    }

    setContactStatus('Sending message...');
    try {
      const message = await sendContact({
        subject: chatSubject,
        message: outgoing,
        mode: 'chat',
      });
      setContactStatus(message);
      setChatInput('');
      setChatSuggestion('');
    } catch (error) {
      setContactStatus(error instanceof Error ? error.message : 'Message failed to send.');
    }
  };

  const handleClassicSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setContactStatus('Sending message...');

    try {
      const message = await sendContact({
        name: classicName,
        email: classicEmail,
        subject: chatSubject,
        message: classicMessage,
        mode: 'classic',
      });
      setContactStatus(message);
      setClassicName('');
      setClassicEmail('');
      setClassicMessage('');
    } catch (error) {
      setContactStatus(error instanceof Error ? error.message : 'Message failed to send.');
    }
  };

  const handleCardHover = (cardId: string) => {
    setGlitchCard(cardId);
    window.setTimeout(() => setGlitchCard(''), 300);
  };

  return (
    <>
      <BootScreen visible={bootVisible} text={bootText} showSkip={showSkip} onSkip={() => setBootVisible(false)} />
      <MagneticCursor mode={cursorMode} dotRef={cursorDotRef} ringRef={cursorRingRef} />
      <CyberGrid />
      <ProgressArc navItems={NAV_ITEMS} activeSection={activeSection} progress={scrollProgress} />
      <OrbitalCommandRing navItems={NAV_ITEMS} activeSection={activeSection} onJumpTo={jumpTo} heroCollapsed={heroPassed} />
      <button
        type="button"
        onClick={() => setSoundOn((current) => !current)}
        className="fixed bottom-5 left-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-cyan-300/50 bg-slate-900/80 text-cyan-100 backdrop-blur-xl transition hover:bg-cyan-300/12"
        aria-label={soundOn ? 'Disable ambient sound' : 'Enable ambient sound'}
        data-cursor="active"
      >
        {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
      </button>

      <button
        type="button"
        className="fixed left-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-slate-900/85 text-white md:hidden"
        aria-label="Toggle navigation"
        onClick={() => setNavOpen((current) => !current)}
      >
        {navOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-5 md:px-8">
        {navOpen ? (
          <div className="fixed inset-0 z-30 bg-slate-950/60 md:hidden" onClick={() => setNavOpen(false)}>
            <div className="absolute bottom-20 left-4 flex flex-col gap-2 rounded-2xl border border-cyan-300/35 bg-slate-900/95 p-3 backdrop-blur-xl">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={[
                      'flex items-center gap-2 rounded-full border px-3 py-2 text-sm',
                      active
                        ? 'border-cyan-300/90 bg-cyan-300/20 text-cyan-100'
                        : 'border-cyan-200/25 bg-slate-900/85 text-cyan-50',
                    ].join(' ')}
                    onClick={() => jumpTo(item.id)}
                    data-cursor="active"
                  >
                    <Icon size={14} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <main className="grid gap-4">
          <div ref={heroRef}>
            <HeroSection word={SWITCH_WORDS[wordIndex]} onJumpTo={jumpTo} heroPassed={heroPassed} />
          </div>
          <AboutSection />
          <SkillsSection />
          <ServicesSection />
          <PortfolioSection glitchCard={glitchCard} onCardHover={handleCardHover} />
          <ExperienceSection />
          <ContactSection
            contactMode={contactMode}
            setContactMode={setContactMode}
            chatInput={chatInput}
            setChatInput={setChatInput}
            chatSuggestion={chatSuggestion}
            chatSubject={chatSubject}
            setChatSubject={setChatSubject}
            classicName={classicName}
            setClassicName={setClassicName}
            classicEmail={classicEmail}
            setClassicEmail={setClassicEmail}
            classicMessage={classicMessage}
            setClassicMessage={setClassicMessage}
            contactStatus={contactStatus}
            onRefine={handleRefine}
            onChatSend={handleChatSend}
            onClassicSubmit={handleClassicSubmit}
          />
        </main>
      </div>
    </>
  );
}
