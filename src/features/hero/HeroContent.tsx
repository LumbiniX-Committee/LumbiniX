import { motion } from 'framer-motion';
import type { EventMeta } from '../../types';
import CountdownTimer from './CountdownTimer';

interface HeroContentProps {
  event: EventMeta;
}

export default function HeroContent({ event }: HeroContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container-custom text-center relative z-10"
    >
      {/* Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 text-primary dark:text-primary-light font-semibold text-sm mb-8 shadow-sm"
      >
        <motion.span
          className="w-2 h-2 bg-primary rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {event.date}
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Build the Future
        </motion.span>
        <br />
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gradient"
        >
          in Lumbini
        </motion.span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 font-medium"
      >
        {event.description}
      </motion.p>

      {/* Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <motion.a
          href={event.registrationUrl}
          className="btn-primary btn-glow w-full sm:w-auto relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Register Now</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary"
            initial={{ x: '100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
        <motion.a
          href="/schedule"
          className="btn-secondary w-full sm:w-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Schedule
        </motion.a>
      </motion.div>

      {/* Countdown */}
      <motion.div variants={itemVariants}>
        <CountdownTimer targetDate={event.countdownDate} />
      </motion.div>
    </motion.div>
  );
}
