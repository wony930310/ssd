import { Plus, Info } from 'lucide-react';
import { BreadItem } from '../types.ts';

interface ProductCardProps {
  key?: string;
  bread: BreadItem;
  onSelect: (bread: BreadItem) => void;
  onAddToCart: (bread: BreadItem) => void;
}

export default function ProductCard({ bread, onSelect, onAddToCart }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(61,43,31,0.04)] border border-secondary/10 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(61,43,31,0.1)] flex flex-col justify-between">
      {/* Badge Banner */}
      {bread.badge && (
        <span className="absolute top-4 left-4 z-10 font-sans text-[10px] font-bold text-[#8c5001] bg-yeast-gold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[0_2px_10px_rgba(233,196,106,0.2)]">
          {bread.badge}
        </span>
      )}

      {/* Image Block with Zoom on Hover */}
      <div className="relative overflow-hidden aspect-[4/3] bg-flour-cream cursor-pointer" onClick={() => onSelect(bread)}>
        <img
          src={bread.imageUrl}
          alt={bread.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info Block */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title Row */}
          <div className="flex items-baseline justify-between mb-2">
            <h3
              className="font-serif text-xl sm:text-2xl font-bold text-burnt-espresso hover:text-primary transition-colors cursor-pointer"
              onClick={() => onSelect(bread)}
            >
              {bread.name}
            </h3>
            <span className="font-serif text-sm font-extrabold text-burnt-espresso">
              ₩{bread.price.toLocaleString()}
            </span>
          </div>

          {/* Subtitle / English */}
          <span className="font-sans text-[11px] font-semibold text-secondary/60 uppercase tracking-widest block mb-3">
            {bread.englishName}
          </span>

          {/* Description */}
          <p className="font-sans text-xs sm:text-sm text-burnt-espresso/70 leading-relaxed line-clamp-2">
            {bread.description}
          </p>
        </div>

        {/* Card actions */}
        <div className="mt-6 pt-4 border-t border-secondary/5 flex items-center justify-between space-x-3">
          <button
            onClick={() => onSelect(bread)}
            className="flex items-center space-x-1.5 font-sans text-xs font-semibold text-burnt-espresso/80 hover:text-primary transition-colors focus:outline-none"
            id={`btn-detail-${bread.id}`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>상세 스토리</span>
          </button>

          <button
            onClick={() => onAddToCart(bread)}
            className="flex items-center space-x-1.5 bg-crust-amber hover:bg-primary text-white font-sans text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-300 hover:shadow-[0_4px_12px_rgba(212,139,63,0.25)] focus:outline-none cursor-pointer"
            id={`btn-add-cart-${bread.id}`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>담기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
