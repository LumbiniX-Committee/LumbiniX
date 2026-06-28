import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={cn(
              'glass-card transition-all duration-300',
              isOpen
                ? 'border-primary/30 dark:border-primary/40 ring-1 ring-primary/10'
                : 'hover:border-slate-300 dark:hover:border-dark-border'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-start sm:items-center justify-between gap-3 p-4 sm:p-6 text-left group"
            >
              <span className="text-base sm:text-lg font-medium text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors leading-snug">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex-shrink-0 mt-0.5 sm:mt-0"
              >
                <ChevronDown
                  size={20}
                  className={cn(
                    'transition-colors duration-300',
                    isOpen ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
                  )}
                />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-dark-border">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
