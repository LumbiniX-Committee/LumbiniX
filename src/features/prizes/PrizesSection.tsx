import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PrizeCardAnimated from './PrizeCardAnimated';
import AnimatedCounter from '../../components/motion/AnimatedCounter';
import type { Prize, TrackAward } from '../../types';

type PrizeTab = 'main' | 'tracks';

const prizeTabs: { id: PrizeTab; label: string }[] = [
  { id: 'main', label: 'Main Prizes' },
  { id: 'tracks', label: 'Special Awards' },
];

interface PrizesSectionProps {
  mainPrizes: Prize[];
  trackAwards: TrackAward[];
  totalPrizePool: number;
  top10TeamsTeaser: string;
  prizeCeremonyNote: string;
}

export default function PrizesSection({
  mainPrizes,
  trackAwards,
  totalPrizePool,
  top10TeamsTeaser,
  prizeCeremonyNote,
}: PrizesSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const [activeTab, setActiveTab] = useState<PrizeTab>('main');

  return (
    <div className="container-custom">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="text-4xl font-display font-bold tracking-tight text-primary dark:text-primary-light md:text-5xl">
          Prizes & Awards
        </h2>
      </motion.div>

      {/* Total Prize Pool Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-14 mx-auto max-w-3xl"
      >
        <div className="relative rounded-2xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-amber-800/90 to-amber-900/90 dark:from-amber-900 dark:via-amber-800 dark:to-amber-900" />

          {/* Subtle animated glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative px-8 py-10 text-center">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-amber-100/90">
              Total Prize Pool: NPR <AnimatedCounter value={totalPrizePool} duration={2} formatOptions={{ maximumFractionDigits: 0 }} />+
            </h3>
            <p className="mt-3 text-amber-200/80 text-lg">
              Compete for amazing prizes and recognition in the tech community
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tab switcher */}
      <div className="mb-12 flex justify-center">
        <div
          role="tablist"
          aria-label="Prize categories"
          className="relative inline-flex rounded-full border border-slate-200 bg-white/70 p-1.5 backdrop-blur dark:border-dark-border dark:bg-dark-card/70"
        >
          {prizeTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 sm:px-7 sm:text-base ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="prize-tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary shadow-lg shadow-primary/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'main' ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            role="tabpanel"
          >
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 items-end">
              {mainPrizes.map((prize, index) => (
                <PrizeCardAnimated key={prize.tier} prize={prize} index={index} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tracks"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            role="tabpanel"
            className="mx-auto max-w-5xl"
          >
            <h3 className="text-center text-2xl font-display font-bold text-slate-900 dark:text-white md:text-3xl">
              Special category w<span className="text-gradient">i</span>nners
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Track awards for social impact, Solana / blockchain depth, and standout AI & tech, featuring cash,
              medal, and certificate. Full eligibility rules{' '}
              <strong className="text-slate-800 dark:text-slate-200">to be announced soon</strong>.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8"
            >
              {trackAwards.map((award) => (
                <motion.div
                  key={award.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card p-6 text-center group cursor-default"
                >
                  <motion.div
                    className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-xl">🏆</span>
                  </motion.div>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-lg mb-2">
                    {award.title}
                  </h4>
                  <p className="text-2xl font-bold text-primary dark:text-primary-light mb-2">{award.amount}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{award.perks}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 text-center"
      >
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          All winners will receive certificates and exclusive LumbiniX merchandise.
        </p>
        <motion.p
          className="mt-3 text-base font-semibold text-primary dark:text-primary-light"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {top10TeamsTeaser}
        </motion.p>
      </motion.div>
    </div>
  );
}
