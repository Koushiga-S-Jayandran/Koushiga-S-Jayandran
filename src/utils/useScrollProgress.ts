import { useState, useEffect, RefObject } from 'react';

/**
 * Clean native scroll progress calculator (0 to 1) for an element.
 * Immune to React 19 / bundler dual-instance hook issues.
 */
export function useElementScrollProgress(
  ref: RefObject<HTMLElement | null>,
  startOffset: number = 0,
  endOffset: number = 1
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Relative element top and total trackable scroll height
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const totalScrollable = elementHeight + windowHeight;
      const scrolled = windowHeight - elementTop;

      const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      // Remap between startOffset and endOffset
      const remapped =
        (rawProgress - startOffset) / (endOffset - startOffset || 1);
      const clamped = Math.max(0, Math.min(1, remapped));

      setProgress(clamped);
    };

    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [ref, startOffset, endOffset]);

  return progress;
}
