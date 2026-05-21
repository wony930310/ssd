import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  ChevronRight,
  Sparkles,
  UtensilsCrossed,
  MapPin,
  Star,
  Quote,
  History,
  Info
} from 'lucide-react';

import { BreadItem, CartItem } from './types.ts';
import { SIGNATURE_BREADS, BRANCH_LOCATIONS, HISTORY_TIMELINE, REVIEWS } from './data.ts';

import Header from './components/Header.tsx';
import CroissantExplorer from './components/CroissantExplorer.tsx';
import ProductCard from './components/ProductCard.tsx';
import ProductModal from './components/ProductModal.tsx';
import CartDrawer from './components/CartDrawer.tsx';
import LocationDetails from './components/LocationDetails.tsx';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBread, setSelectedBread] = useState<BreadItem | null>(null);
  const [activeLocationId, setActiveLocationId] = useState<string>('main');

  // Add Item to reservation cart
  const handleAddToCart = (bread: BreadItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.bread.id === bread.id);
      if (existing) {
        return prevCart.map((item) =>
          item.bread.id === bread.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { bread, quantity: 1 }];
    });
    // Trigger opening cart briefly as immediate tactile confirmation
    setIsCartOpen(true);
  };

  // Adjust cart quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.bread.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove single item from cart drawer
  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.bread.id !== id));
  };

  // Reset cart once checked out
  const handleClearCart = () => {
    setCart([]);
  };

  // Anchor navigation scroll handler
  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen relative font-sans selection:bg-crust-amber selection:text-white">
      {/* Brand Navigation Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 overflow-hidden"
      >
        {/* Full View Banner Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1600"
            alt="Warm hearth bakery background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-black/30" />
        </div>

        {/* Hero content container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 text-center text-white space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-yeast-gold/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-yeast-gold/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-yeast-gold fill-yeast-gold" />
            <span className="font-sans text-[10px] sm:text-xs font-bold tracking-widest text-yeast-gold uppercase">
              SINCE 1956 • DAEJEON
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
          >
            갓 구운 빵 한 조각,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yeast-gold via-crust-amber to-orange-400">
              오늘 하루의 에너지 충전!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            성심당은 1956년 대전역 앞 작은 찐빵 오두막에서 가구처럼 시작하여, 오직 정직한 유기농 재료와 가톨릭 나눔의 정신으로 매일 가슴을 울리는 따뜻한 위로를 오븐에서 구워냅니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <button
              onClick={() => handleNavigate('signature')}
              className="w-full sm:w-auto bg-crust-amber hover:bg-primary text-white font-sans text-sm sm:text-base font-bold py-3.5 px-8 rounded-full shadow-[0_5px_20px_rgba(212,139,63,0.3)] hover:shadow-[0_5px_25px_rgba(212,139,63,0.5)] transition-all duration-300 transform active:scale-95 cursor-pointer"
              id="btn-hero-menu"
            >
              전체 메뉴 보기
            </button>
            <button
              onClick={() => handleNavigate('locations')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-sans text-sm sm:text-base font-bold py-3.5 px-8 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 transform active:scale-95 cursor-pointer"
              id="btn-hero-find"
            >
              매장 찾기
            </button>
          </motion.div>
        </div>

        {/* Small bouncy arrow pointing down */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10 hidden md:block">
          <button
            onClick={() => handleNavigate('about')}
            className="p-1 text-white/45 hover:text-white transition-colors"
            aria-label="Scroll Down"
            id="btn-hero-scroll"
          >
            <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center p-1">
              <span className="w-1 h-2 bg-yeast-gold rounded-full animate-scroll" />
            </div>
          </button>
        </div>
      </section>

      {/* Section 1: Brand Philosophy & Historical stacked croissant */}
      <section id="about" className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Portrait photo block (Stacked Croissant) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                {/* Visual shadow frame backing */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary-container/10 via-yeast-gold/5 to-transparent blur-xl pointer-events-none" />
                
                {/* Elegant White Border Card to display portrait precisely as user uploaded screen */}
                <div className="relative bg-white rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(61,43,31,0.05)] border border-secondary/10 overflow-hidden transform duration-500 group-hover:shadow-[0_25px_60px_rgba(61,43,31,0.1)]">
                  <div className="aspect-[2/3] w-full max-w-[325px] overflow-hidden rounded-2xl bg-flour-cream">
                    {/* The majestic croissant stack! */}
                    <img
                      src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800&h=1200"
                      alt="Artisanal Croissant Column Stack representing lamination"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  {/* Small tag at bottom left */}
                  <div className="absolute bottom-8 left-8 bg-burnt-espresso/80 text-white font-mono text-[9px] font-bold tracking-widest px-3 py-1 rounded shadow-md pointer-events-none">
                    CRAFT LAMINATION TRILOGY
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Literary Description & Core Values */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="font-sans text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-3 block">
                  Caring & Integrity Since 1956
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-burnt-espresso leading-tight">
                  따뜻한 마음을 나누는 곳, 성심당
                </h2>
                <p className="font-sans text-sm sm:text-base text-burnt-espresso/80 leading-relaxed text-justify">
                  “모든 이가 다 좋게 여기는 일을 하도록 하십시오.”<br />
                  이 가톨릭 자비의 구절 아래, 성심당은 단순한 빵집 매장을 넘어 지역 대전의 깊은 문화이자 시민들의 큰 자부심으로 성장했습니다. 수많은 지점 확대 제안과 유혹에도 불구하고, 오직 대전 본고장 골목만을 지키는 지역 환원 정책을 단단히 붙잡고 있습니다.
                </p>
                <p className="font-sans text-sm text-burnt-espresso/70 leading-relaxed text-justify">
                  우리는 매일 아침 당일 생산하고 당일 전량 판매하는 정당한 원칙을 부임 후 지금까지 철저하게 구가하고 있으며, 해가 저물면 남은 모든 빵을 차가운 수레에 가득 담아 한 분 한 분 도움이 절실한 이웃들에게 전액 사랑으로 아낌없이 전달하고 있습니다.
                </p>
              </div>

              {/* Core numbers showcase */}
              <div className="grid grid-cols-2 gap-4 border-t border-secondary/10 pt-8">
                <div className="space-y-1">
                  <span className="font-sans text-3xl sm:text-4xl font-extrabold text-[#8c5001] block">
                    70년
                  </span>
                  <span className="font-sans text-xs font-bold text-[#524438] block">
                    전통의 깊이
                  </span>
                  <p className="font-sans text-xs text-burnt-espresso/60 leading-relaxed">
                    대전역 노점의 따뜻한 호의에서 이어진 긴 여정
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-sans text-3xl sm:text-4xl font-extrabold text-[#8c5001] block">
                    100%
                  </span>
                  <span className="font-sans text-xs font-bold text-[#524438] block">
                    당일 생산 원칙
                  </span>
                  <p className="font-sans text-xs text-burnt-espresso/60 leading-relaxed">
                    오직 방금 베이킹한 마일라드 황금빛 활력만을 공급
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Croissant Depth Explorer section */}
      <CroissantExplorer />

      {/* Section 2: Hall of Fame (명예의 전당 대표 시그니처 그리드) */}
      <section id="signature" className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <span className="font-serif text-xs font-bold text-primary uppercase tracking-widest bg-flour-cream px-3 py-1.5 rounded-lg border border-secondary/5 self-start">
                Sungsimdang Hall of Fame
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-burnt-espresso mt-3">
                명예의 전당
              </h2>
              <p className="font-sans text-sm sm:text-base text-burnt-espresso/70 mt-2">
                역사적인 인기에 빛나는 대전의 자랑이자 성심당의 대표 시그니처 빵들입니다.
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-flour-cream px-4 py-2 rounded-2xl border border-secondary/5 shadow-sm">
              <UtensilsCrossed className="w-4 h-4 text-primary" />
              <span className="font-sans text-xs font-bold text-burnt-espresso">
                모든 시그니처는 당일 완판 사양입니다
              </span>
            </div>
          </div>

          {/* Product cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SIGNATURE_BREADS.map((bread) => (
              <ProductCard
                key={bread.id}
                bread={bread}
                onSelect={(b) => setSelectedBread(b)}
                onAddToCart={(b) => handleAddToCart(b)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why visit Daejeon & Location details */}
      <section id="locations" className="py-24 bg-surface-container-low relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          {/* Title Area */}
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <div className="mx-auto w-12 h-12 bg-flour-cream rounded-2xl border border-secondary/15 flex items-center justify-center text-primary shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-burnt-espresso">
              대전을 방문해야 하는 이유
            </h2>
            <p className="font-sans text-sm sm:text-base text-burnt-espresso/75 leading-relaxed">
              성심당은 대전 시외에 별도의 가맹 대리점이 전혀 존재하지 않습니다. 대전 본점 골목의 뜨거운 열정과, 기차 탑승구 앞 대전역점의 분주한 환영에 직접 귀를 대어 보시기 바랍니다.
            </p>
          </div>

          {/* Locations detail cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BRANCH_LOCATIONS.map((branch) => (
              <LocationDetails
                key={branch.id}
                branch={branch}
                isActive={activeLocationId === branch.id}
                onSelect={() => setActiveLocationId(branch.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Historical Timeline section */}
      <section className="py-24 bg-surface border-t border-secondary/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-flour-cream border border-secondary/10 px-3 py-1 rounded-full mb-3">
              <History className="w-4 h-4 text-primary" />
              <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-wider">
                Our History Timeline
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-burnt-espresso">
              가장 성심어린 반세기 발자취
            </h2>
          </div>

          {/* Graphical timeline slider */}
          <div className="relative border-l-2 border-dashed border-secondary/20 ml-4 md:ml-0 md:border-l-0 md:grid md:grid-cols-6 md:gap-6 space-y-8 md:space-y-0 relative">
            
            {/* Horizontal timeline track for desktop */}
            <div className="absolute top-[28px] left-0 right-0 h-0.5 border-t-2 border-dashed border-secondary/15 z-0 hidden md:block" />

            {HISTORY_TIMELINE.map((time, i) => (
              <div key={i} className="relative z-10 text-left md:text-center pl-8 md:pl-0">
                {/* Year Badge */}
                <div className="absolute top-1 left-2 md:relative md:inset-0 md:mx-auto w-10 h-10 rounded-full bg-white border-2 border-crust-amber flex items-center justify-center text-primary font-serif font-extrabold text-sm sm:text-base shadow-sm">
                  {time.year.slice(2)}
                </div>

                <div className="mt-4">
                  <span className="font-serif text-[11px] font-bold text-primary md:block tracking-widest uppercase bg-flour-cream px-2 py-0.5 rounded border border-secondary/5">
                    {time.year}
                  </span>
                  <h4 className="font-serif text-base font-extrabold text-burnt-espresso mt-2">
                    {time.title}
                  </h4>
                  <p className="font-sans text-xs text-burnt-espresso/60 leading-relaxed mt-2 text-justify md:text-center">
                    {time.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Consumer reviews sections */}
      <section className="py-24 bg-surface-container-low border-y border-secondary/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="text-center mb-16 space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-burnt-espresso">
              방문객들의 솔직 담백 리뷰
            </h3>
            <p className="font-sans text-xs sm:text-sm text-burnt-espresso/60">
              대전 시민들과 미식가 여행자들이 전하는 리얼 생생한 성심 사랑꾼들의 참관기입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 md:p-8 border border-secondary/10 shadow-[0_10px_30px_rgba(61,43,31,0.02)] relative flex flex-col justify-between"
              >
                <div className="absolute top-6 right-6 text-primary/10">
                  <Quote className="w-10 h-10 fill-current" />
                </div>

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-yeast-gold fill-yeast-gold" />
                    ))}
                  </div>
                  <p className="font-sans text-sm text-burnt-espresso/80 leading-relaxed italic text-justify">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-secondary/5 pt-4 mt-6">
                  <div>
                    <span className="font-serif text-sm font-extrabold text-burnt-espresso block">
                      {rev.name}
                    </span>
                    <span className="font-sans text-[10px] text-secondary/60">
                      Verified Guest
                    </span>
                  </div>
                  <span className="font-mono text-xs text-secondary/40">
                    {rev.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Traditional Footer */}
      <footer className="bg-burnt-espresso text-white/80 py-16 font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
          
          {/* Upper footer */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/15 pb-12">
            <div>
              <span className="font-serif text-3xl font-extrabold text-white tracking-tight flex items-center">
                Sungsimdang
                <Heart className="w-4 h-4 text-crust-amber ml-1.5 fill-crust-amber" />
              </span>
              <span className="text-yeast-gold font-serif text-[11px] font-bold tracking-widest block mt-1 uppercase">
                대전의 자랑이자 따뜻한 골목의 든든한 등대
              </span>
            </div>

            {/* Links directory layout */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-semibold uppercase text-white/70">
              <a href="#about" className="hover:text-yeast-gold transition-colors">Privacy Policy</a>
              <a href="#about" className="hover:text-yeast-gold transition-colors">Terms of Service</a>
              <a href="#signature" className="hover:text-yeast-gold transition-colors">Contact Us</a>
              <a href="#locations" className="hover:text-yeast-gold transition-colors">Recruitment</a>
            </div>
          </div>

          {/* Bottom copyright row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-white/50">
            <div>
              <p>© 1956 Sungsimdang Bakery. All Rights Reserved. Crafted with love and dedication in Daejeon.</p>
              <p className="mt-1 text-white/30 font-mono">
                Catholic Charity Division No. 1956-07 • Headquarter: 15, Daejong-ro 480beon-gil, Jung-gu, Daejeon
              </p>
            </div>
            <div className="flex items-center space-x-2 text-yeast-gold bg-white/5 px-4 py-2 rounded-xl border border-white/5 font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span>우리는 대전에서만 빵을 굽고 세상을 따뜻하게 밝힙니다.</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Cart Drawer Panel (Pre-order reservations overlay) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Detail Story Modal */}
      <AnimatePresence>
        {selectedBread && (
          <ProductModal
            bread={selectedBread}
            onClose={() => setSelectedBread(null)}
            onAddToCart={(b) => handleAddToCart(b)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
