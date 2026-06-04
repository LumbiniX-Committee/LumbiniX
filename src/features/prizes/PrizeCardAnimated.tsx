import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Gift, Trophy, Medal, Award } from 'lucide-react';
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
  const rank = index + 1;
  const placeLabels = ['First prize', 'Second prize', 'Third prize'] as const;
  const placeLabel = placeLabels[index] ?? `Place ${rank}`;

  const icons = [Trophy, Medal, Award];
  const Icon = icons[index] || Gift;

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
          relative rounded-2xl bg-white dark:bg-dark-card px-8 pb-10 pt-14 text-center shadow-md transition-all duration-300
          ${isFirst
            ? 'border-2 border-primary shadow-primary/10 dark:shadow-primary/20 ring-1 ring-primary/10 z-10 scale-105'
            : 'border border-slate-200/90 dark:border-dark-border hover:border-primary/30'
          }
          ${isHovered ? 'shadow-xl shadow-primary/15 dark:shadow-primary/30' : ''}
        `}
        style={{ transform: 'translateZ(20px)' }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Rank badge */}
        <motion.span
          className={`
            absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border-2 font-display text-lg font-bold
            ${isFirst
              ? 'border-primary bg-primary/10 dark:bg-primary/20 text-primary'
              : 'border-primary/50 bg-white dark:bg-dark-surface text-primary'
            }
          `}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          aria-label={`Rank ${rank}`}
        >
          {rank}
        </motion.span>

        {/* Icon */}
        <div className="mb-8 flex justify-center relative z-10">
          <motion.div
            className={`
              inline-flex rounded-full border-2 p-4 text-primary
              ${isFirst ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-primary/35 bg-primary/[0.04]'}
            `}
            animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon size={40} strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Amount */}
        <motion.p
          className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-[2.75rem] relative z-10"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {prize.amount}
        </motion.p>

        <p className="mt-2 text-base font-medium text-slate-500 dark:text-slate-400 relative z-10">
          {placeLabel}
        </p>

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
