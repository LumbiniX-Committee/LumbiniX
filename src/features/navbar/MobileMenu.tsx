import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: NavItem[];
}

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 hover:text-primary transition-colors relative z-50"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={cn(
          "fixed inset-0 top-[72px] z-40 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {items.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-display font-bold text-slate-800 hover:text-primary transition-colors"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
                transition: `all 300ms cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? `${i * 60}ms` : '0ms'}`,
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#"
            className="btn-primary w-full text-center"
            onClick={() => setIsOpen(false)}
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: `all 300ms cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? `${items.length * 60}ms` : '0ms'}`,
            }}
          >
            Register Now
          </a>
        </nav>
      </div>
    </div>
  );
}
