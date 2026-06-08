import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Prize } from '../../types';

interface PrizeCardAnimatedProps {
  prize: Prize;
  index: number;
}

export default function PrizeCardAnimated({ prize, index }: PrizeCardAnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const isFirst = index === 0;
  const prizeBadges = [
    { label: 'First Prize', emoji: '🏆' },
    { label: 'Second Prize', emoji: '🥈' },
    { label: 'Third Prize', emoji: '🥉' },
  ] as const;
  const currentBadge = prizeBadges[index] ?? { label: `Prize ${index + 1}`, emoji: '🏆' };

  const prizeStyles = {
    0: {
      bg: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-amber-900/40',
      border: 'border-2 border-amber-400/60 dark:border-amber-500/50',
      glow: 'shadow-amber-200/50 dark:shadow-amber-500/20',
      badge: 'border-amber-500 bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-950',
      amount: 'text-amber-700 dark:text-amber-300',
    },
    1: {
      bg: 'bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 dark:from-slate-800/60 dark:via-gray-800/50 dark:to-slate-700/60',
      border: 'border-2 border-slate-300 dark:border-slate-500/50',
      glow: 'shadow-slate-300/50 dark:shadow-slate-500/20',
      badge: 'border-slate-400 bg-gradient-to-br from-slate-300 to-gray-400 text-slate-800',
      amount: 'text-slate-700 dark:text-slate-200',
    },
    2: {
      bg: 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-orange-950/40 dark:via-amber-950/30 dark:to-orange-900/40',
      border: 'border-2 border-orange-400/60 dark:border-orange-500/50',
      glow: 'shadow-orange-200/50 dark:shadow-orange-500/20',
      badge: 'border-orange-600 bg-gradient-to-br from-orange-500 to-amber-600 text-orange-950',
      amount: 'text-orange-700 dark:text-orange-300',
    },
  } as const;

  const currentStyle = prizeStyles[index as keyof typeof prizeStyles] || prizeStyles[2];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative perspective-1000"
    >
      <article
        className={`
          relative rounded-2xl px-8 pb-10 pt-8 text-center shadow-lg transition-all duration-300
          ${currentStyle.bg} ${currentStyle.border}
          ${isFirst ? 'z-10 scale-105 ring-2 ring-amber-400/30 dark:ring-amber-500/20' : ''}
          ${isHovered ? `shadow-xl ${currentStyle.glow}` : ''}
        `}
        style={{ transform: 'translateZ(20px)' }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Prize badge */}
        <motion.div
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-display text-sm font-bold shadow-md mb-6
            ${currentStyle.badge}
          `}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <span className="text-lg">{currentBadge.emoji}</span>
          <span>{currentBadge.label}</span>
        </motion.div>

        {/* Amount */}
        <motion.p
          className={`font-display text-4xl font-bold tracking-tight md:text-[2.75rem] relative z-10 ${currentStyle.amount}`}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {prize.amount}
        </motion.p>

        <p className="mx-auto mt-5 max-w-[14rem] text-sm leading-relaxed text-slate-400 dark:text-slate-500 relative z-10">
          {prize.description}
        </p>

        {/* Shine effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              animate={{ x: ['0%', '200%'] }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </article>
    </motion.div>
  );
}
