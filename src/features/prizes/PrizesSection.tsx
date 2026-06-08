import { motion } from 'framer-motion';
import PrizeCardAnimated from './PrizeCardAnimated';
import AnimatedCounter from '../../components/motion/AnimatedCounter';
import type { Prize, TrackAward } from '../../types';

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
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-primary-dark/95 to-purple-900/95 dark:from-purple-950 dark:via-primary-dark dark:to-purple-950" />

          {/* Subtle animated glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative px-8 py-10 text-center">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-purple-100">
              Total Prize Pool: NPR <AnimatedCounter value={totalPrizePool} duration={2} formatOptions={{ maximumFractionDigits: 0 }} />+
            </h3>
            <p className="mt-3 text-purple-200/80 text-lg">
              Compete for amazing prizes and recognition in the tech community
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Prizes */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 items-end">
        {mainPrizes.map((prize, index) => (
          <PrizeCardAnimated key={prize.tier} prize={prize} index={index} />
        ))}
      </div>

      {/* Track Awards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-20 max-w-5xl"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl font-display font-bold text-slate-900 dark:text-white md:text-3xl"
        >
          Special category w<span className="text-gradient">i</span>nners
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-slate-600 dark:text-slate-300"
        >
          Track awards for social impact, Solana / blockchain depth, and standout AI & tech, featuring cash,
          medal, and certificate. Full eligibility rules{' '}
          <strong className="text-slate-800 dark:text-slate-200">to be announced soon</strong>.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8"
        >
          {trackAwards.map((award) => (
              <motion.div
                key={award.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                className="relative overflow-hidden rounded-2xl border-2 border-primary/20 dark:border-primary/30 hover:border-primary/40 dark:hover:border-primary/50 bg-white dark:bg-dark-card p-8 text-center group cursor-default transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10 opacity-60" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 dark:bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative">
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-xl mb-3">
                    {award.title}
                  </h4>
                  <p className="text-3xl font-bold text-primary dark:text-primary-light mb-3">{award.amount}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{award.perks}</p>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>

      {/* Top 10 Teams - Claude Pro & Canva Pro */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mx-auto mt-16 max-w-4xl"
      >
        <div className="relative overflow-hidden rounded-3xl border-2 border-primary/30 dark:border-primary/40 bg-gradient-to-br from-primary/5 via-white to-accent/5 dark:from-primary/10 dark:via-dark-card dark:to-accent/10 p-8 md:p-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-semibold mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-lg">🎁</span>
              <span>Exclusive for Top 10 Teams</span>
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
              Premium Subscriptions for Winners
            </h3>

            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              All top 10 teams will receive premium subscriptions to power their future projects
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
              <motion.div
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white dark:bg-dark-surface shadow-lg border border-slate-200 dark:border-dark-border"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 flex items-center justify-center p-2">
                  <img src="/claude-logo.svg" alt="Claude" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900 dark:text-white text-lg">Claude Pro</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">AI Assistant by Anthropic</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white dark:bg-dark-surface shadow-lg border border-slate-200 dark:border-dark-border"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 flex items-center justify-center p-2">
                  <img src="/canva.png" alt="Canva" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900 dark:text-white text-lg">Canva Pro</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Design Platform</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          All winners will receive certificates and exclusive LumbiniX merchandise.
        </p>
      </motion.div>
    </div>
  );
}
