import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Flame, Leaf, CloudRain, Star } from 'lucide-react';
import { LAMINATION_GUIDE } from '../data.ts';

export default function CroissantExplorer() {
  const [activePartId, setActivePartId] = useState<'top' | 'middle' | 'bottom'>('middle');

  const selectedPart = LAMINATION_GUIDE.find((p) => p.id === activePartId) || LAMINATION_GUIDE[1];

  // Map icons to each part for illustrative flourish
  const getPartIcon = (id: string) => {
    switch (id) {
      case 'top':
        return <Compass className="w-5 h-5 text-yeast-gold" />;
      case 'middle':
        return <CloudRain className="w-5 h-5 text-primary" />;
      case 'bottom':
        return <Flame className="w-5 h-5 text-crust-amber" />;
      default:
        return <Star className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <section id="explorer" className="py-24 bg-surface-container-low relative overflow-hidden">
      {/* Decorative backdrop elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-yeast-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-crust-amber/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8c5001] bg-[#ffdcbf] px-3 py-1 rounded-full">
            Microscopic View
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-burnt-espresso mt-3">
            페이스트리 도파민 익스플로러
          </h2>
          <p className="font-sans text-sm sm:text-base text-burnt-espresso/70 mt-4 leading-relaxed">
            성심당의 특별 조리 공법인 ‘크러스트 밀도 다이내믹스’가 만들어내는 3단계 버터 레이어를 마이크로 밀리미터 단위로 관찰하고 음미해 보세요.
          </p>
        </div>

        {/* Exploration Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: The Three Stack Croissant Stack Graphic - interactive hot spots */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[340px] md:max-w-[380px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(61,43,31,0.06)] p-6 md:p-8 aspect-[2/3] flex flex-col justify-between border border-secondary/5">
              
              {/* Outer Guide Box lines */}
              <div className="absolute inset-4 border border-dashed border-burnt-espresso/10 rounded-2xl pointer-events-none" />

              {/* STACK LAYERS */}
              
              {/* 1. Top Part (Spiral Supreme) */}
              <button
                onClick={() => setActivePartId('top')}
                className={`relative w-full h-[30%] rounded-2xl transition-all duration-300 flex flex-col items-center justify-center group focus:outline-none ${
                  activePartId === 'top'
                    ? 'bg-flour-cream shadow-[0_8px_20px_rgba(212,139,63,0.12)] border border-crust-amber/30 ring-2 ring-crust-amber/20'
                    : 'bg-transparent hover:bg-neutral-variant/30 border border-transparent'
                }`}
                id="btn-explore-top"
              >
                {/* Hotspot indicator */}
                <span className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                  activePartId === 'top' ? 'bg-crust-amber animate-ping' : 'bg-burnt-espresso/20'
                }`} />
                
                {/* Simulated baked spiral circle */}
                <div className="w-24 h-24 rounded-full border-4 border-dashed border-crust-amber/40 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 relative overflow-hidden bg-gradient-to-br from-yeast-gold/20 to-secondary/10">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-crust-amber/30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border border-dashed border-crust-amber/20 bg-crust-amber/10" />
                  </div>
                </div>

                <span className="font-serif text-xs font-semibold text-burnt-espresso mt-2">
                  Concentric Spiral (상단 나선)
                </span>
              </button>

              {/* Connecting Dotted Line */}
              <div className="w-1 h-6 border-l border-dashed border-burnt-espresso/25 mx-auto" />

              {/* 2. Middle Part (Porous Crumb) */}
              <button
                onClick={() => setActivePartId('middle')}
                className={`relative w-full h-[30%] rounded-2xl transition-all duration-300 flex flex-col items-center justify-center group focus:outline-none ${
                  activePartId === 'middle'
                    ? 'bg-flour-cream shadow-[0_8px_20px_rgba(212,139,63,0.12)] border border-crust-amber/30 ring-2 ring-crust-amber/20'
                    : 'bg-transparent hover:bg-neutral-variant/30 border border-transparent'
                }`}
                id="btn-explore-middle"
              >
                {/* Hotspot indicator */}
                <span className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                  activePartId === 'middle' ? 'bg-primary animate-ping' : 'bg-burnt-espresso/20'
                }`} />

                {/* Sliced Crumb Cross-Section Graphic */}
                <div className="w-28 h-18 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 flex flex-wrap gap-1 p-2 items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-dashed border-secondary/30 bg-white/80 flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                    </div>
                  ))}
                </div>

                <span className="font-serif text-xs font-semibold text-burnt-espresso mt-2">
                  Honeycomb Crumb (중단 슬라이스 단면)
                </span>
              </button>

              {/* Connecting Dotted Line */}
              <div className="w-1 h-6 border-l border-dashed border-burnt-espresso/25 mx-auto" />

              {/* 3. Bottom Part (Crown Base) */}
              <button
                onClick={() => setActivePartId('bottom')}
                className={`relative w-full h-[30%] rounded-2xl transition-all duration-300 flex flex-col items-center justify-center group focus:outline-none ${
                  activePartId === 'bottom'
                    ? 'bg-flour-cream shadow-[0_8px_20px_rgba(212,139,63,0.12)] border border-crust-amber/30 ring-2 ring-crust-amber/20'
                    : 'bg-transparent hover:bg-neutral-variant/30 border border-transparent'
                }`}
                id="btn-explore-bottom"
              >
                {/* Hotspot indicator */}
                <span className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                  activePartId === 'bottom' ? 'bg-burnt-espresso animate-ping' : 'bg-burnt-espresso/20'
                }`} />

                {/* Cupcake style flaky base graphic */}
                <div className="w-24 h-16 bg-gradient-to-t from-secondary/20 to-yeast-gold/15 rounded-b-2xl border-x-2 border-b-2 border-dashed border-secondary/40 relative flex items-end justify-center py-2 transition-transform duration-500 group-hover:translate-y-0.5">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-dashed border-t border-dashed border-secondary/30" />
                  <div className="flex space-x-1">
                    <span className="w-2 h-4 rounded-full bg-secondary/20" />
                    <span className="w-2 h-6 rounded-full bg-secondary/30" />
                    <span className="w-2 h-4 rounded-full bg-secondary/20" />
                  </div>
                </div>

                <span className="font-serif text-xs font-semibold text-burnt-espresso mt-2">
                  Flaky Crown Base (하단 머핀 크라운)
                </span>
              </button>

              {/* Floating Instruction overlay */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-burnt-espresso text-white text-[11px] font-sans font-medium px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                각 파트의 박스를 탭하여 결을 탐험해 보세요
              </div>
            </div>
          </div>

          {/* Right: Technical Metadata detail */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPart.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-secondary/10 shadow-[0_15px_40px_rgba(61,43,31,0.03)]"
              >
                {/* Upper row: Tag and Icon */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-flour-cream border border-secondary/10 shadow-sm">
                    {getPartIcon(selectedPart.id)}
                  </div>
                  <span className="font-sans text-xs font-bold text-primary uppercase tracking-widest bg-flour-cream px-3 py-1.5 rounded-lg border border-secondary/5">
                    Lamination Science
                  </span>
                </div>

                {/* Header */}
                <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-burnt-espresso">
                  {selectedPart.title}
                </h3>
                <h4 className="font-sans text-sm md:text-base text-primary/90 font-medium mt-2 leading-relaxed">
                  {selectedPart.subtitle}
                </h4>

                <div className="w-12 h-1 bg-gradient-to-r from-crust-amber to-yeast-gold my-6 rounded" />

                {/* Large Description block */}
                <p className="font-sans text-sm md:text-base text-burnt-espresso/80 leading-relaxed">
                  {selectedPart.description}
                </p>

                {/* Tech Dashboard */}
                <div className="mt-8 border-t border-secondary/15 pt-8">
                  <h5 className="font-serif text-sm font-bold text-burnt-espresso/95 mb-4 tracking-tight flex items-center">
                    <span className="w-1.5 h-1.5 bg-crust-amber rounded-full mr-2" />
                    Bake Lamination Telemetry (도우 역학 수치)
                  </h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedPart.techStats.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-flour-cream rounded-2xl p-4 border border-secondary/5 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                      >
                        <span className="font-sans text-[11px] font-semibold text-secondary/70 uppercase tracking-wider block">
                          {stat.label}
                        </span>
                        <span className="font-serif text-lg font-extrabold text-burnt-espresso block mt-1">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
