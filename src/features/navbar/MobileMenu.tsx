import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: NavItem[];
}

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 hover:text-primary transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[72px] z-50 bg-white backdrop-blur-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col items-center justify-center h-full gap-8 p-8">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-display font-bold text-slate-800 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className="btn-primary w-full text-center"
              onClick={() => setIsOpen(false)}
            >
              Register Now
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
