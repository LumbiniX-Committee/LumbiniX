import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string;
}

interface FlipCardProps {
  value: number;
  label: string;
  index: number;
}

function FlipCard({ value, label, index }: FlipCardProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsFlipping(false);
      }, 150);
      prevValue.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      className="relative"
    >
      <div className="glass-card p-3 sm:p-4 md:p-6 flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/20 overflow-hidden group hover:shadow-xl hover:bg-white/15 transition-all duration-300 min-w-0">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300" />

        <div className="relative perspective-1000">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={displayValue}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white drop-shadow-lg block"
            >
              {String(displayValue).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </div>

        <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wide sm:tracking-widest text-white/70 font-bold mt-1 sm:mt-2 relative z-10 text-center">
          {label}
        </span>

        {/* Pulse indicator for seconds */}
        {label === 'Seconds' && (
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 w-full max-w-2xl mx-auto px-2 sm:px-0">
      {items.map((item, index) => (
        <FlipCard key={item.label} value={item.value} label={item.label} index={index} />
      ))}
    </div>
  );
}
