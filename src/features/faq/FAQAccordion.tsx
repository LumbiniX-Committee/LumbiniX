import React, { useState } from 'react';
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
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={cn(
              "glass-card transition-all duration-300",
              isOpen ? "border-primary/30 ring-1 ring-primary/10" : "hover:border-white/20"
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-lg font-medium text-white">{faq.question}</span>
              <ChevronDown 
                size={20} 
                className={cn(
                  "text-slate-400 transition-transform duration-300",
                  isOpen && "rotate-180 text-primary"
                )} 
              />
            </button>
            <div 
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
