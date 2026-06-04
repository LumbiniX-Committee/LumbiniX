import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  hover?: boolean;
}

export default function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
  amount = 0.2,
  hover = true,
}: ScaleInProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      whileHover={hover ? { scale: 1.02, transition: { duration: 0.2 } } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
