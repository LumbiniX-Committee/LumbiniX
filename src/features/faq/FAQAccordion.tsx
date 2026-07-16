import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeInfo, CalendarDays, ClipboardList, Ellipsis } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FAQItem {
  question: string;
  answer: string;
  category: 'about' | 'logistics' | 'guidelines' | 'other';
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

const categories = [
  { key: 'about', label: 'About the Event', icon: BadgeInfo },
  { key: 'logistics', label: 'Event Logistics', icon: CalendarDays },
  { key: 'guidelines', label: 'Participation Guidelines', icon: ClipboardList },
  { key: 'other', label: 'Others', icon: Ellipsis },
] as const;

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]['key']>('about');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const activeFaqs = useMemo(
    () => faqs.filter((faq) => faq.category === activeCategory),
    [activeCategory, faqs]
  );

  const activeCategoryMeta = categories.find((category) => category.key === activeCategory) ?? categories[0];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] xl:gap-12">
        <div className="space-y-5">
          <div className="rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-accent/10 to-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = category.key === activeCategory;

              return (
                <motion.button
                  key={category.key}
                  type="button"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.35 }}
                  onClick={() => {
                    setActiveCategory(category.key);
                    setOpenIndex(null);
                  }}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-300',
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 ring-1 ring-primary/25'
                      : 'text-slate-700 hover:bg-white/70 hover:text-primary dark:text-white/95 dark:hover:bg-white/5 dark:hover:text-white'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition-colors',
                      isActive
                        ? 'border-white/30 bg-white text-primary'
                        : 'border-primary/20 bg-white text-primary dark:border-white/15 dark:bg-white/95 dark:text-[#130b2a]'
                    )}
                  >
                    <Icon size={20} strokeWidth={2.2} />
                  </span>
                  <span className="text-lg font-semibold leading-tight sm:text-xl">
                    {category.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-primary/30 bg-gradient-to-br from-primary via-primary-dark to-[#4f2f67] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="mb-8 text-center lg:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-accent-light/90">
              {activeCategoryMeta.label}
            </p>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-0">
            {activeFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.35 }}
                  className="border-b border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                  >
                    <span className="text-lg font-semibold leading-tight text-white sm:text-[1.45rem]">
                      {faq.question}
                    </span>
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center text-3xl font-light leading-none text-accent-light/90">
                      {isOpen ? '−' : '+'}
                    </span>
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
                        <div className="pb-5 pt-0 text-sm leading-relaxed text-white/85 sm:text-base">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
