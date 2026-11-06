'use client';

import { useEffect } from 'react';
import { animate, inView, stagger } from 'motion';

export default function MotionEffects() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const disposers = [];
    const heroItems = [...document.querySelectorAll(
      '.hero-copy .eyebrow, .hero-copy h1, .hero-copy .hero-intro, .hero-copy .hero-actions, .hero-copy .hero-location, .engineering-panel',
    )];
    if (heroItems.length) {
      const entrance = animate(heroItems, { opacity: [0, 1], y: [22, 0] }, {
        duration: 0.78,
        delay: stagger(0.11),
        ease: [0.22, 1, 0.36, 1],
      });
      disposers.push(() => entrance.stop());
    }

    const selectors = [
      '.section-heading',
      '.system-strip > div',
      '.experience-item',
      '.skill-card',
      '.project-card',
      '.cert-item',
      '.contact-links a',
    ];
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        const stop = inView(element, () => {
          const animation = animate(element, { opacity: [0, 1], y: [28, 0], scale: [0.985, 1] }, {
            duration: 0.68,
            delay: (index % 4) * 0.075,
            ease: [0.22, 1, 0.36, 1],
          });
          return () => animation.stop();
        }, { amount: 0.12 });
        disposers.push(stop);
      });
    });

    return () => disposers.forEach((stop) => stop());
  }, []);

  return null;
}
