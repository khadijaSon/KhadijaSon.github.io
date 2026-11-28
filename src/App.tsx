import React, { lazy, Suspense, useEffect, useState } from 'react';
import { ECO_STORAGE_KEYS, readEcoCookie, setEcoCookie, writeSessionPreference } from './clientStorage';
import {
  ArrowUpRight,
  AudioLines,
  ChevronRight,
  Clock3,
  Code2,
  Github,
  House,
  Info,
  ListMusic,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Sun,
  X,
} from 'lucide-react';
import profileAvatar from '../assets/KHADIJASON.png';
import MusicPlayer from './components/MusicPlayer';
import ContributionWeekEmbed from './components/ContributionWeekEmbed';
import PwaInstallButton from './components/PwaInstallButton';
import TimelinePage from './TimelinePage';
import { PUBLIC_PLAYLIST } from './music/playlist';

const ThreeBackground = lazy(() => import('./components/ThreeBackground'));

const PARENT_SITE_URL = 'https://khadijachahmoud.github.io/';
const PARENT_PROFILE_URL = 'https://github.com/KhadijaChahmoud';
const PARENT_REPOSITORY_URL = 'https://github.com/KhadijaChahmoud/KhadijaChahmoud.github.io';
const SITE_TITLE = 'KhadijaSon | Curiosity Lab';

function EcoHeader({
  leftOpen,
  rightOpen,
  onToggleLeft,
  onToggleRight,
  onCloseSidebars,
}: {
  leftOpen: boolean;
  rightOpen: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
  onCloseSidebars: () => void;
}) {
  return (
    <header className="eco-header" onClick={(event) => {
      if (event.target instanceof Element && event.target.closest('button.toggle-button')) return;
      onCloseSidebars();
    }}>
      <div className="header-side">
        <button className="icon-button toggle-button" type="button" onClick={onToggleLeft} aria-label="Toggle navigation" aria-expanded={leftOpen} title="Toggle navigation (Ctrl+B)">
          {leftOpen ? <PanelLeftClose size={19} /> : <PanelLeftOpen size={19} />}
        </button>
        <a className="brand" href="/" aria-label="Curiosity Lab home"><span className="brand-mark">K</span><span className="brand-label">Curiosity Lab</span></a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about.html">About</a>
          <a href="/timeline.html">Project ideas</a>
          <a href="/#ideas">Curiosity lab</a>
          <a href={PUBLIC_PLAYLIST.length ? '/#listen' : '/#listen-section'}>Listen</a>
        </nav>
      </div>
      <div className="header-side header-side-right">
        <a className="header-link github-link" href={PARENT_SITE_URL} target="_blank" rel="noreferrer" aria-label="Visit the family website"><House size={16} /><span>Family site</span></a>
        <a className="icon-button toggle-button" href={PARENT_REPOSITORY_URL} target="_blank" rel="noreferrer" aria-label="Open the parent-managed project repository" title="Family project"><ArrowUpRight size={18} /></a>
        <button className="icon-button toggle-button right-toggle" type="button" onClick={onToggleRight} aria-label="Toggle right sidebar" aria-expanded={rightOpen} title="Toggle right sidebar (Ctrl+M)">
          {rightOpen ? <PanelRightClose size={19} /> : <PanelRightOpen size={19} />}
        </button>
      </div>
    </header>
  );
}

function EcoLeftSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <button className="sidebar-backdrop left-backdrop" type="button" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`left-sidebar ${open ? 'sidebar-open' : ''}`} aria-hidden={!open}>
        <div className="sidebar-content">
          <div className="sidebar-section-label">Navigation</div>
          <nav className="sidebar-nav" aria-label="ECO pages">
            <a href="/" className="sidebar-link"><House size={18} /><span>Home</span><ChevronRight size={15} /></a>
            <a href="/about.html" className="sidebar-link"><Info size={18} /><span>About</span></a>
            <a href="/timeline.html" className="sidebar-link"><Clock3 size={18} /><span>Project ideas</span></a>
            <a href="/#ideas" className="sidebar-link"><Code2 size={18} /><span>Curiosity lab</span></a>
            <a href={PUBLIC_PLAYLIST.length ? '/#listen' : '/#listen-section'} className="sidebar-link"><ListMusic size={18} /><span>Music library</span></a>
            <div className="sidebar-divider" />
            <a href={PARENT_SITE_URL} className="sidebar-link" target="_blank" rel="noreferrer"><House size={18} /><span>Family website</span></a>
            <a href={PARENT_PROFILE_URL} className="sidebar-link" target="_blank" rel="noreferrer"><Github size={18} /><span>Parent GitHub</span></a>
          </nav>
          <p className="sidebar-footnote">A family-supported space. A parent reviews what is shared here.</p>
        </div>
        <button type="button" className="sidebar-close icon-button" aria-label="Close navigation" onClick={onClose}><X size={18} /></button>
      </aside>
    </>
  );
}

function EcoRightSidebar({
  open,
  onClose,
  theme,
  onToggleTheme,
}: {
  open: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}) {
  return (
    <>
      {open && <button className="sidebar-backdrop right-backdrop" type="button" aria-label="Close settings" onClick={onClose} />}
      <aside className={`right-sidebar ${open ? 'sidebar-open' : ''}`} aria-hidden={!open}>
        <div className="sidebar-content settings-content">
          <div className="settings-title-row"><div><span className="sidebar-section-label">PREFERENCES</span><h2>Settings</h2></div><button type="button" className="icon-button" aria-label="Close settings" onClick={onClose}><X size={18} /></button></div>
          <section className="settings-section">
            <h3>Appearance</h3>
            <button type="button" className="setting-action" onClick={onToggleTheme}>
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              <span>{theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</span>
            </button>
          </section>
          <section className="settings-section">
            <h3>Install this app</h3>
            <PwaInstallButton />
          </section>
          <section className="settings-section">
            <h3>Your music</h3>
            <a className="setting-action" href={PUBLIC_PLAYLIST.length ? '/#listen' : '/#listen-section'}><AudioLines size={17} /><span>Open your music library</span><ChevronRight size={15} /></a>
            <p className="settings-note">Private tracks and saved links stay in this browser on this device. They are never uploaded by this site.</p>
          </section>
          <section className="settings-section">
            <h3>Project information</h3>
            <a className="setting-action" href={PARENT_SITE_URL} target="_blank" rel="noreferrer"><House size={17} /><span>Family website</span><ArrowUpRight size={14} /></a>
            <a className="setting-action" href={PARENT_REPOSITORY_URL} target="_blank" rel="noreferrer"><Github size={17} /><span>Parent-managed project</span><ArrowUpRight size={14} /></a>
          </section>
          <a href={PARENT_SITE_URL} target="_blank" rel="noreferrer" className="settings-version">Family-supported site <ArrowUpRight size={13} /></a>
        </div>
      </aside>
    </>
  );
}

function HomePage() {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  useEffect(() => {
    if (!isAvatarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsAvatarOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAvatarOpen]);

  return (
    <main id="main" className="page-main" tabIndex={-1}>
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">CURIOSITY LAB · BUILDING · PUZZLES</p>
          <div className="hero-heading-row">
            <h1>Hi, I’m <span>the creator behind Curiosity Lab.</span><br /><span className="gradient-text">I explore curious ideas.</span></h1>
            <button
              className="hero-avatar-button"
              type="button"
              onClick={() => setIsAvatarOpen(true)}
              aria-label="Enlarge profile portrait"
            >
              <img
                className="hero-avatar"
                src={profileAvatar}
                alt="Profile portrait"
              />
            </button>
          </div>
          <p className="hero-subtitle">An example space for building challenges, puzzles, and little discoveries. The prompts can be personalized with projects that are okay to share.</p>
          <div className="hero-actions">
            <a className="primary-button" href="/about.html">About this page <ArrowUpRight size={16} /></a>
            <a className="secondary-button" href={PARENT_SITE_URL} target="_blank" rel="noreferrer"><House size={16} /> Family website</a>
            <a className="secondary-button" href="#listen"><AudioLines size={16} /> Listen with me</a>
          </div>
          <p className="hero-caption">Ask · explore · make</p>
        </div>
      </section>
      <ContributionWeekEmbed
        site="khadijason"
        repository="khadijaSon/KhadijaSon.github.io"
        branch="main"
      />
      {isAvatarOpen && (
        <div
          className="avatar-lightbox"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsAvatarOpen(false);
          }}
        >
          <div className="avatar-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Profile portrait">
            <button
              className="avatar-lightbox-close"
              type="button"
              onClick={() => setIsAvatarOpen(false)}
              aria-label="Close enlarged photo"
              autoFocus
            >
              <X size={24} />
            </button>
            <img src={profileAvatar} alt="Profile portrait" />
          </div>
        </div>
      )}

      <section className="content-section intro-section" id="ideas">
        <div className="section-heading"><span className="eyebrow">EXAMPLE IDEAS</span><h2>A place to ask, make, and explore.</h2><p>These are starter prompts, not claims about personal interests. Keep only the ideas that feel right to share.</p></div>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-icon">⌂</span><h3>Build challenge</h3><p>Plan a small paper structure and test which shapes help it stand.</p></article>
          <article className="feature-card"><span className="feature-icon">▦</span><h3>Puzzle notes</h3><p>Try a simple puzzle and write down more than one way to solve it.</p></article>
          <article className="feature-card"><span className="feature-icon">?</span><h3>Wonder log</h3><p>Save a question to explore with books, experiments, or a parent.</p></article>
        </div>
      </section>

      <section className="content-section source-section" id="ecosystem-source">
        <div><span className="eyebrow">PROJECT SHELF</span><h2>One small idea can lead to another.</h2><p>Browse a few example prompts, then replace them with family-approved projects whenever they are ready.</p></div>
        <a className="secondary-button" href="/timeline.html">Explore project ideas <ArrowUpRight size={15} /></a>
      </section>

      <section className="content-section listen-section" id="listen-section" aria-labelledby="listen-heading">
        <div className="listen-card">
          <span className="eyebrow">PRIVATE LISTENING CORNER</span>
          <h2 id="listen-heading">Listen on this device.</h2>
          {PUBLIC_PLAYLIST.length ? (
            <>
              <p>Choose an audio file from this device to listen in your private browser library.</p>
              <a className="primary-button" href="#listen">Open music player <AudioLines size={16} /></a>
              <p className="privacy-caption">Private files and saved links stay in this browser on this device.</p>
            </>
          ) : (
            <p>Use the private player in the footer to choose audio from this device. Nothing is published by this example page.</p>
          )}
        </div>
      </section>

      <section className="content-section source-section" id="contact-section">
        <div><span className="eyebrow">A FAMILY-SUPPORTED SPACE</span><h2>Sharing is always a choice.</h2><p>This example site is reviewed with a parent. It does not provide a public contact form or personal social links.</p></div>
        <a className="secondary-button" href={PARENT_SITE_URL} target="_blank" rel="noreferrer"><House size={17} /> Visit the family website <ArrowUpRight size={15} /></a>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main id="main" className="page-main about-page" tabIndex={-1}>
      <section className="about-hero">
        <span className="eyebrow">ABOUT THIS PAGE</span>
        <h1>A small home for <span className="gradient-text">curious ideas.</span></h1>
        <p>This page is a sample curiosity lab for building prompts, puzzles, and discoveries. Its example prompts can be changed to reflect what feels comfortable to share.</p>
        <div className="hero-actions">
          <a className="primary-button" href="/timeline.html">See example ideas <ArrowUpRight size={16} /></a>
          <a className="secondary-button" href={PARENT_SITE_URL} target="_blank" rel="noreferrer"><House size={16} /> Family website</a>
        </div>
      </section>
      <section className="content-section about-details">
        <div className="section-heading"><span className="eyebrow">SAMPLE VALUES</span><h2>Curiosity, patience, and imagination.</h2></div>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-icon">✦</span><h3>Try an idea</h3><p>Start small and see what happens.</p></article>
          <article className="feature-card"><span className="feature-icon">⌕</span><h3>Think it through</h3><p>Take time to test a few different solutions.</p></article>
          <article className="feature-card"><span className="feature-icon">♡</span><h3>Share thoughtfully</h3><p>Choose what feels safe and comfortable to publish.</p></article>
        </div>
      </section>
      <section className="content-section source-section">
        <div><span className="eyebrow">FAMILY SUPPORT</span><h2>A parent helps manage this website.</h2><p>Only example content is shown here. A parent reviews updates and decides what is okay to share publicly.</p></div>
        <a className="secondary-button" href={PARENT_SITE_URL} target="_blank" rel="noreferrer"><House size={17} /> Family website <ArrowUpRight size={15} /></a>
      </section>
    </main>
  );
}

function EcoFooter({ onCloseSidebars }: { onCloseSidebars: () => void }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <footer className="eco-footer" onClick={onCloseSidebars}>
      <span className="footer-license">Family-supported creative space · Parent-led updates</span>
      <MusicPlayer />
      <a className="footer-github-link" href={PARENT_PROFILE_URL} target="_blank" rel="noreferrer" aria-label="Visit the parent GitHub profile">
        <Github size={19} />
      </a>
      <div className="footer-meta">
        <time dateTime={now.toISOString()}>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time>
        <a href={PARENT_SITE_URL} target="_blank" rel="noreferrer">Family site</a>
        <a href={PARENT_REPOSITORY_URL} target="_blank" rel="noreferrer">Project info</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = window.localStorage.getItem(ECO_STORAGE_KEYS.theme)
        ?? readEcoCookie(ECO_STORAGE_KEYS.cookieTheme)
        ?? window.localStorage.getItem('eco-starter:theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const isAbout = pathname.endsWith('/about.html');
  const isTimeline = pathname.endsWith('/timeline.html');
  useEffect(() => {
    const appPaths = new Set(['/', '/index.html', '/about.html', '/timeline.html']);
    const handleNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return;
      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        !appPaths.has(destination.pathname)
      ) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) {
        if (destination.hash !== window.location.hash) return;
        event.preventDefault();
        return;
      }
      event.preventDefault();
      window.history.pushState(null, '', destination.href);
      setPathname(destination.pathname);
    };
    const handleHistoryNavigation = () => setPathname(window.location.pathname);
    document.addEventListener('click', handleNavigation);
    window.addEventListener('popstate', handleHistoryNavigation);
    return () => {
      document.removeEventListener('click', handleNavigation);
      window.removeEventListener('popstate', handleHistoryNavigation);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      window.requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.title = isTimeline
      ? `Project ideas | ${SITE_TITLE}`
      : isAbout
        ? `About | ${SITE_TITLE}`
        : SITE_TITLE;
    try {
      window.localStorage.setItem(ECO_STORAGE_KEYS.theme, theme);
      setEcoCookie(ECO_STORAGE_KEYS.cookieTheme, theme);
      writeSessionPreference('theme', theme);
    } catch {
      // The selected theme remains active for this page even if storage is disabled.
    }
  }, [isAbout, isTimeline, theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        setLeftOpen((open) => !open);
      } else if (event.ctrlKey && event.key.toLowerCase() === 'm') {
        event.preventDefault();
        setRightOpen((open) => !open);
      } else if (event.key === 'Escape') {
        setLeftOpen(false);
        setRightOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const toggleSidebar = (side: 'left' | 'right') => {
    const setter = side === 'left' ? setLeftOpen : setRightOpen;
    (side === 'left' ? setRightOpen : setLeftOpen)(false);
    setter((open) => !open);
  };

  const closeSidebars = () => {
    setLeftOpen(false);
    setRightOpen(false);
  };

  const closeSidebar = (side: 'left' | 'right') => {
    (side === 'left' ? setLeftOpen : setRightOpen)(false);
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Suspense fallback={<div className="three-background canvas-fallback" aria-hidden="true" />}>
        <ThreeBackground theme={theme} />
      </Suspense>
      <div className="eco-public-layout">
        <EcoHeader
          leftOpen={leftOpen}
          rightOpen={rightOpen}
          onToggleLeft={() => toggleSidebar('left')}
          onToggleRight={() => toggleSidebar('right')}
          onCloseSidebars={closeSidebars}
        />
        <div className="main-container">
          <EcoLeftSidebar open={leftOpen} onClose={() => closeSidebar('left')} />
          {isTimeline ? <TimelinePage /> : isAbout ? <AboutPage /> : <HomePage />}
          <EcoRightSidebar
            open={rightOpen}
            onClose={() => closeSidebar('right')}
            theme={theme}
            onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          />
        </div>
        <EcoFooter onCloseSidebars={closeSidebars} />
      </div>
    </>
  );
}
