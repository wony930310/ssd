import { X, Heart, Milk, Coffee, AlertCircle, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { BreadItem } from '../types.ts';

interface ProductModalProps {
  bread: BreadItem;
  onClose: () => void;
  onAddToCart: (bread: BreadItem) => void;
}

export default function ProductModal({ bread, onClose, onAddToCart }: ProductModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black"
      />

      {/* Modal Drawer Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-secondary/15 z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md text-burnt-espresso hover:text-primary rounded-full p-2 transition-colors border border-secondary/10 shadow-sm focus:outline-none"
          id="btn-close-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="w-full md:w-1/2 relative bg-flour-cream h-56 md:h-auto min-h-[220px]">
          <img
            src={bread.imageUrl}
            alt={bread.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent" />
          
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {bread.tag && (
              <span className="font-sans text-[10px] font-bold text-white bg-primary px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                {bread.tag}
              </span>
            )}
            <span className="font-sans text-[10px] font-bold text-white bg-burnt-espresso/70 px-3 py-1 rounded-full backdrop-blur-md flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {bread.caloriesIndex || '290 kcal'}
            </span>
          </div>
        </div>

        {/* Right: Detailed text & stats */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-burnt-espresso">
                {bread.name}
              </h3>
              <span className="font-serif text-lg md:text-xl font-extrabold text-primary">
                ₩{bread.price.toLocaleString()}
              </span>
            </div>

            <span className="font-sans text-[11px] font-bold text-secondary/60 uppercase tracking-widest block mb-4">
              {bread.englishName}
            </span>

            <p className="font-sans text-sm text-burnt-espresso/80 leading-relaxed mb-6">
              {bread.longDescription}
            </p>

            {/* Food pairer, allergens info badges */}
            <div className="space-y-4 border-t border-secondary/10 pt-4">
              {bread.pairing && (
                <div className="flex items-start space-x-3">
                  <div className="bg-flour-cream p-1.5 rounded-lg border border-secondary/5 mt-0.5">
                    <Coffee className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-sans text-[11px] font-bold text-secondary/70 uppercase block">
                      추천 페어링 테이블
                    </span>
                    <span className="font-sans text-xs font-semibold text-burnt-espresso leading-normal">
                      {bread.pairing}
                    </span>
                  </div>
                </div>
              )}

              {bread.allergens && bread.allergens.length > 0 && (
                <div className="flex items-start space-x-3">
                  <div className="bg-flour-cream p-1.5 rounded-lg border border-secondary/5 mt-0.5">
                    <Milk className="w-4 h-4 text-crust-amber" />
                  </div>
                  <div>
                    <span className="font-sans text-[11px] font-bold text-secondary/70 uppercase block">
                      알레르기 유발 유발 물질
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {bread.allergens.map((allergen, i) => (
                        <span
                          key={i}
                          className="font-sans text-[10px] font-bold text-secondary bg-flour-cream px-2 py-0.5 rounded border border-secondary/10"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-secondary/5 flex space-x-3">
            <button
              onClick={() => {
                onAddToCart(bread);
                onClose();
              }}
              className="flex-1 bg-crust-amber hover:bg-primary text-white font-sans text-sm font-bold py-3 px-5 rounded-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-2 shadow-[0_5px_15px_rgba(212,139,63,0.2)]"
              id="btn-modal-add-to-cart"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>장바구니 담기</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
