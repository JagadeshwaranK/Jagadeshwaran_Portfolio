'use client';

import { useEffect } from 'react';

export default function ClientEnhancements() {
  useEffect(() => {
    const header = document.querySelector('.site-header');
    const menuButton = document.querySelector('.menu-toggle');
    const themeButton = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const contactForm = document.querySelector('#contact-form');
    const resumeViews = [...document.querySelectorAll('[data-resume-view]')];
    const resumeDocuments = [...document.querySelectorAll('[data-resume-document]')];
    const resumeStatus = document.querySelector('.resume-status');
    const cleanup = [];

    const year = document.querySelector('#year');
    if (year) year.textContent = new Date().getFullYear();

    function setTheme(theme) {
      const dark = theme === 'dark';
      document.documentElement.classList.toggle('dark', dark);
      themeButton?.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      if (themeIcon) themeIcon.textContent = dark ? '☼' : '◐';
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.content = dark ? '#101714' : '#f3f5f0';
    }

    let storedTheme = null;
    try { storedTheme = localStorage.getItem('portfolio-theme'); } catch { /* Storage can be unavailable. */ }
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    setTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

    if (themeButton) {
      const toggleTheme = () => {
        const theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        setTheme(theme);
        try { localStorage.setItem('portfolio-theme', theme); } catch { /* Theme still works without storage. */ }
      };
      themeButton.addEventListener('click', toggleTheme);
      cleanup.push(() => themeButton.removeEventListener('click', toggleTheme));
    }

    const layerToggles = [...document.querySelectorAll('[data-layer-toggle]')];
    layerToggles.forEach((button) => {
      const toggleLayer = () => {
        const enabled = button.getAttribute('aria-pressed') !== 'true';
        button.setAttribute('aria-pressed', String(enabled));
        const layer = button.dataset.layerToggle;
        document.querySelectorAll(`[data-layer-node="${layer}"], [data-layer-line="${layer}"]`).forEach((item) => {
          item.hidden = !enabled;
        });
      };
      button.addEventListener('click', toggleLayer);
      cleanup.push(() => button.removeEventListener('click', toggleLayer));
    });

    const skillFilters = [...document.querySelectorAll('[data-skill-filter]')];
    const skillCards = [...document.querySelectorAll('[data-skill-layer]')];
    const filterCount = document.querySelector('#filter-count');
    skillFilters.forEach((button) => {
      const filterSkills = () => {
        const layer = button.dataset.skillFilter;
        skillFilters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        let visible = 0;
        skillCards.forEach((card) => {
          const show = layer === 'all' || card.dataset.skillLayer === layer;
          card.hidden = !show;
          if (show) visible += 1;
        });
        if (filterCount) filterCount.textContent = `${String(visible).padStart(2, '0')} ${visible === 1 ? 'LAYER' : 'LAYERS'}`;
      };
      button.addEventListener('click', filterSkills);
      cleanup.push(() => button.removeEventListener('click', filterSkills));
    });

    const closeMenu = () => {
      header?.classList.remove('menu-open');
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.setAttribute('aria-label', 'Open navigation');
    };

    if (header && menuButton) {
      const toggleMenu = () => {
        const open = header.classList.toggle('menu-open');
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      };
      menuButton.addEventListener('click', toggleMenu);
      cleanup.push(() => menuButton.removeEventListener('click', toggleMenu));
    }

    const navLinks = [...document.querySelectorAll('#primary-nav a')];
    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
      cleanup.push(() => link.removeEventListener('click', closeMenu));
    });

    const handleKey = (event) => { if (event.key === 'Escape') closeMenu(); };
    const handleOutsideClick = (event) => {
      if (header?.classList.contains('menu-open') && !header.contains(event.target)) closeMenu();
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('click', handleOutsideClick);
    cleanup.push(() => document.removeEventListener('keydown', handleKey));
    cleanup.push(() => document.removeEventListener('click', handleOutsideClick));

    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-28% 0px -62% 0px' });
      document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
      cleanup.push(() => observer.disconnect());
    }

    document.querySelectorAll('.project-list, .cert-list').forEach((group) => {
      const handleToggle = (event) => {
        const opened = event.target;
        if (!(opened instanceof HTMLDetailsElement) || !opened.open) return;
        group.querySelectorAll('details[open]').forEach((item) => { if (item !== opened) item.open = false; });
      };
      group.addEventListener('toggle', handleToggle, true);
      cleanup.push(() => group.removeEventListener('toggle', handleToggle, true));
    });

    if (contactForm) {
      const submitContact = (event) => {
        event.preventDefault();
        const values = new FormData(contactForm);
        const name = String(values.get('name')).trim();
        const email = String(values.get('email')).trim();
        const message = String(values.get('message')).trim();
        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
        const status = document.querySelector('.form-status');
        if (status) status.textContent = 'Opening your email app…';
        window.location.href = `mailto:jagadesh.k3008@gmail.com?subject=${subject}&body=${body}`;
      };
      contactForm.addEventListener('submit', submitContact);
      cleanup.push(() => contactForm.removeEventListener('submit', submitContact));
    }

    if (resumeViews.length) {
      const selectResume = (view) => {
        resumeViews.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.resumeView === view)));
        resumeDocuments.forEach((document) => { document.hidden = document.dataset.resumeDocument !== view; });
      };
      resumeViews.forEach((button) => {
        const handleClick = () => selectResume(button.dataset.resumeView);
        button.addEventListener('click', handleClick);
        cleanup.push(() => button.removeEventListener('click', handleClick));
      });

      const copyButton = document.querySelector('[data-resume-copy]');
      if (copyButton) {
        const copyResume = async () => {
          const selected = document.querySelector('[data-resume-view][aria-pressed="true"]')?.dataset.resumeView || 'full';
          const markdown = document.querySelector(`[data-resume-markdown="${selected}"]`);
          let copied = false;
          try {
            if (navigator.clipboard?.writeText) {
              await navigator.clipboard.writeText(markdown?.value || '');
              copied = true;
            }
          } catch { /* Fall through to the browser copy command. */ }
          if (!copied && markdown) {
            try {
              markdown.focus();
              markdown.select();
              copied = document.execCommand('copy');
              markdown.blur();
            } catch { /* Report that copying was blocked. */ }
          }
          if (resumeStatus) resumeStatus.textContent = copied
            ? `${selected === 'short' ? 'One-page' : 'Full'} resume copied as Markdown.`
            : 'Could not copy automatically. Select the resume text and copy it manually.';
        };
        copyButton.addEventListener('click', copyResume);
        cleanup.push(() => copyButton.removeEventListener('click', copyResume));
      }

      const printButton = document.querySelector('[data-resume-print]');
      if (printButton) {
        const printResume = () => {
          const finishPrint = () => document.body.classList.remove('printing-resume');
          window.addEventListener('afterprint', finishPrint, { once: true });
          document.body.classList.add('printing-resume');
          window.print();
        };
        printButton.addEventListener('click', printResume);
        cleanup.push(() => printButton.removeEventListener('click', printResume));
      }
    }

    return () => cleanup.forEach((dispose) => dispose());
  }, []);

  return null;
}
