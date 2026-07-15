import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { eventMeta } from "../data/event";

const DISCORD_URL = "https://discord.gg/WRwdEq2g2n";
const STORAGE_KEY = "lumbinix-welcome-dismissed";

function DiscordIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.368-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const closeModal = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
  }, []);

  useEffect(() => {
    setMounted(true);
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-modal-title"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            aria-label="Close welcome modal"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl dark:border-primary/20 dark:bg-dark-card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(126,74,158,0.18),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(126,74,158,0.35),_transparent_55%)]" />
            <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative px-6 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-500 transition hover:border-primary/30 hover:text-primary dark:border-dark-border dark:bg-dark-surface dark:text-slate-300 dark:hover:text-primary-light"
                aria-label="Close"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-6 flex flex-col items-center text-center">
                <img
                  src="/finallogo.png"
                  alt="LumbiniX"
                  className="mb-5 h-20 w-20 rounded-2xl object-contain shadow-lg shadow-primary/25 sm:h-24 sm:w-24"
                />

                <span className="mb-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">
                  LumbiniX 2026
                </span>

                <h2 id="welcome-modal-title" className="text-2xl font-display font-bold text-slate-900 dark:text-white sm:text-3xl">
                  Registrations are <span className="text-gradient">Open</span>
                </h2>

                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                  Join 500+ innovators for Nepal&apos;s premier hackathon. Secure your spot and connect with the community on Discord.
                </p>

                <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
                  {eventMeta.date}
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={eventMeta.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark hover:shadow-primary/40 sm:text-base"
                >
                  Register Now
                  <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>

                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center gap-4 rounded-2xl border border-[#5865F2]/30 bg-[#5865F2]/10 px-4 py-4 transition hover:border-[#5865F2]/60 hover:bg-[#5865F2]/15"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/30 transition group-hover:scale-105">
                    <DiscordIcon />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-sm font-bold text-slate-900 dark:text-white sm:text-base">Join our Discord</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                      Get updates, ask questions, and connect with other participants.
                    </p>
                  </div>
                  <svg className="ml-auto h-4 w-4 shrink-0 text-[#5865F2] transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="mt-5 w-full rounded-full py-3 text-sm font-semibold text-slate-500 transition hover:text-primary dark:text-slate-400 dark:hover:text-primary-light"
              >
                Continue to website
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
