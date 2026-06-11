'use client';
import { useEffect } from 'react';

export default function ParallaxInit() {
  useEffect(() => {
    const selectors = ['.hero', '.quote-stripe-full', '.parallax-divider'];

    const handleScroll = () => {
      selectors.forEach(selector => {
        const el = document.querySelector(selector) as HTMLElement | null;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (center - viewCenter) * 0.2;
        el.style.backgroundPositionY = `calc(50% + ${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
