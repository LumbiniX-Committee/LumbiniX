import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Menu,
  X,
  ChevronRight,
  Handshake,
  CircleHelp,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: NavItem[];
}

const navIcons: Record<string, typeof Handshake> = {
  Sponsors: Handshake,
  FAQ: CircleHelp,
  Conduct: ShieldCheck,
};

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  const menuPanel = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-[90] bg-slate-900/40 sm:top-20 touch-manipulation"
            aria-label="Close menu"
            onClick={closeMenu}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-16 bottom-0 z-[91] flex flex-col overflow-hidden bg-gradient-to-b from-white via-white to-slate-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-surface sm:top-20"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="pointer-events-none absolute -right-16 top-8 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-12 bottom-32 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative flex flex-1 flex-col px-5 pb-6 pt-8 sm:px-6 sm:pt-10">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">
                  Explore
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
                  Lumbini<span className="text-primary">X</span> Menu
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  Jump to sponsors, FAQs, and event guidelines.
                </p>
              </div>

              <nav className="space-y-3">
                {items.map((item, index) => {
                  const Icon = navIcons[item.label] ?? ChevronRight;

                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.06, duration: 0.25 }}
                      className="group flex min-h-[56px] items-center gap-4 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition-all active:scale-[0.98] active:border-primary/30 active:bg-primary/5 dark:border-dark-border dark:bg-dark-card dark:active:bg-primary/10 touch-manipulation"
                    >
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-active:bg-primary group-active:text-white dark:bg-primary/20 dark:text-primary-light">
                        <Icon size={20} strokeWidth={2} />
                      </span>
                      <span className="flex-1 text-left text-base font-semibold text-slate-800 dark:text-slate-100">
                        {item.label}
                      </span>
                      <ChevronRight
                        size={18}
                        className="flex-shrink-0 text-slate-400 transition-transform group-active:translate-x-0.5 group-active:text-primary"
                      />
                    </motion.a>
                  );
                })}
              </nav>

              <div className="mt-auto pt-8">
                <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 via-white to-accent/10 p-4 dark:from-primary/20 dark:via-dark-card dark:to-dark-surface">
                  <div className="mb-3 flex items-center gap-2 text-primary dark:text-primary-light">
                    <Sparkles size={16} />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                      Coming Soon
                    </span>
                  </div>
                  <span
                    className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-primary/25 pointer-events-none"
                    aria-disabled="true"
                  >
                    Registration Opening Soon
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative z-[101] md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all touch-manipulation ${
          isOpen
            ? 'border-primary/20 bg-primary/10 text-primary dark:text-primary-light'
            : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 dark:text-slate-300 dark:hover:border-dark-border dark:hover:bg-dark-card'
        }`}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {mounted && createPortal(menuPanel, document.body)}
    </div>
  );
}
