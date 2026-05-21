import { useState, useEffect } from 'react';
import { ShoppingBasket, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types.ts';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ cart, onOpenCart, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Signature Bread', id: 'signature' },
    { label: 'Croissant Explorer', id: 'explorer' },
    { label: 'Locations', id: 'locations' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-neutral/90 backdrop-blur-md border-b border-secondary/10 py-3 shadow-[0_5px_30px_rgba(61,43,31,0.03)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="group flex items-center space-x-2 text-left focus:outline-none"
            id="btn-header-logo"
          >
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-burnt-espresso flex items-baseline">
              Sungsimdang
              <Heart className="w-3 h-3 text-crust-amber ml-1 fill-crust-amber transition-transform duration-300 group-hover:scale-125" />
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="font-sans text-sm font-medium text-burnt-espresso/80 hover:text-primary transition-all duration-300 relative py-1 focus:outline-none group"
                id={`nav-link-${link.id}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-burnt-espresso hover:bg-secondary/10 transition-colors duration-300 focus:outline-none"
              aria-label="Toggle Shopping Cart"
              id="btn-header-cart"
            >
              <ShoppingBasket className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-crust-amber text-white font-sans text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={onOpenCart}
              className="hidden sm:flex items-center space-x-2 bg-crust-amber hover:bg-primary text-white font-sans text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full transition-transform duration-300 active:scale-95 shadow-[0_4px_15px_rgba(212,139,63,0.15)] hover:shadow-[0_4px_20px_rgba(212,139,63,0.3)] focus:outline-none"
              id="btn-header-order"
            >
              <span>Order Online</span>
            </button>

            {/* Mobile Menu Open */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 md:hidden text-burnt-espresso rounded-full hover:bg-secondary/10 transition-colors"
              aria-label="Open Navigation menu"
              id="btn-header-mobile-open"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="fixed right-0 top-0 bottom-0 w-4/5 max-w-xs bg-neutral z-50 px-8 py-10 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-12">
                  <span className="font-serif text-xl font-bold text-burnt-espresso">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-burnt-espresso rounded-full hover:bg-secondary/10"
                    id="btn-header-mobile-close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className="font-sans text-lg font-medium text-left text-burnt-espresso hover:text-primary transition-colors py-2 focus:outline-none"
                      id={`nav-mobile-${link.id}`}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div>
                <button
                  onClick={() => {
                    onOpenCart();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-center flex items-center space-x-2 bg-crust-amber text-white font-sans font-semibold py-3 rounded-xl shadow-md"
                  id="btn-mobile-sidebar-order"
                >
                  <ShoppingBasket className="w-5 h-5" />
                  <span>Order Online Now</span>
                </button>
                <div className="mt-6 text-center text-[10px] font-mono text-burnt-espresso/50">
                  © 1956 Sungsimdang Bakery
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
