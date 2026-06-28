import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: NavItem[];
}

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <div className="md:hidden">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
        aria-label="Toggle menu"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 top-16 sm:top-20 z-50 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-lg"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 p-6 sm:p-8">
              {items.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-xl sm:text-2xl font-display font-bold text-slate-800 dark:text-slate-100 hover:text-primary dark:hover:text-primary-light transition-colors"
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.span
                className="btn-primary w-full max-w-xs text-center text-sm sm:text-base cursor-not-allowed pointer-events-none"
                custom={items.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                aria-disabled="true"
              >
                Registration Opening Soon
              </motion.span>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
