function initAnimations(): void {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (motionQuery.matches) {
    document.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  document.querySelectorAll<HTMLElement>('[data-stagger-group]').forEach((container) => {
    const items = container.querySelectorAll<HTMLElement>('[data-stagger-item]');
    if (items.length === 0) return;

    const baseDelay = parseInt(container.dataset.staggerBaseDelay || '0', 10);
    const staggerDelay = parseInt(container.dataset.staggerDelay || '100', 10);
    const threshold = parseFloat(container.dataset.staggerThreshold || '0.1');
    const variant = container.dataset.staggerVariant || 'up';

    items.forEach((el, i) => {
      const delay = baseDelay + staggerDelay * i;
      el.dataset.delay = String(delay);
      el.dataset.animate = '';
      el.classList.add('opacity-0', `fade-${variant}`);
      el.style.setProperty('--fade-duration', '500ms');
    });

    const groupObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((el) => {
            const delay = parseInt(el.dataset.delay || '0', 10);
            setTimeout(() => el.classList.add('revealed'), delay);
          });
          groupObserver.unobserve(container);
        }
      },
      { threshold }
    );

    groupObserver.observe(container);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.delay || '0', 10);
          const duration = parseInt(el.style.getPropertyValue('--fade-duration') || '500', 10);
          setTimeout(() => el.classList.add('revealed'), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll<HTMLElement>('[data-animate]:not([data-stagger-item])').forEach((el) =>
    observer.observe(el)
  );
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
}
