import { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Clock, CheckCircle, Ticket, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, BranchLocation } from '../types.ts';
import { BRANCH_LOCATIONS } from '../data.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('main');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [pickupCode, setPickupCode] = useState<string>('');

  const totalPrice = cart.reduce((acc, item) => acc + item.bread.price * item.quantity, 0);
  const selectedBranch = BRANCH_LOCATIONS.find((b) => b.id === selectedBranchId) || BRANCH_LOCATIONS[0];

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    
    // Simulate payment / booking logic
    setTimeout(() => {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      setPickupCode(`S-1956-${randomId}`);
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1800);
  };

  const handleReset = () => {
    onClearCart();
    setCheckoutComplete(false);
    setPickupCode('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop screen filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Drawer slide-out panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-[#fdf9f5] z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-secondary/10 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="font-serif text-lg sm:text-xl font-bold text-burnt-espresso">
                  온라인 빵 예약 (Order Cart)
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-burnt-espresso hover:text-primary rounded-full hover:bg-secondary/10 transition-colors focus:outline-none"
                id="btn-close-cart-drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Standard flow (Not completed checkout yet) */}
            {!checkoutComplete ? (
              <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                {/* Cart Items or Empty View */}
                <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
                      <div className="p-4 bg-flour-cream rounded-full border border-secondary/10">
                        <ShoppingBag className="w-10 h-10 text-secondary/30" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-burnt-espresso">
                        장바구니가 비어 있습니다
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-burnt-espresso/60 max-w-xs leading-relaxed">
                        성심당의 전설적인 튀소보로와 시그니처 빵들을 골라 예약 바구니에 마크해 보세요!
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-4 bg-burnt-espresso hover:bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors focus:outline-none"
                        id="btn-cart-empty-close"
                      >
                        빵 구경하러 가기
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="font-serif text-xs font-bold text-burnt-espresso/80 uppercase tracking-widest border-b border-secondary/10 pb-2">
                        담은 품목 ({cart.length})
                      </h4>
                      
                      <div className="space-y-4 divide-y divide-secondary/10 max-h-[28vh] overflow-y-auto pr-1">
                        {cart.map((item, i) => (
                          <div
                            key={item.bread.id}
                            className={`flex items-center space-x-4 pt-3 ${i === 0 ? 'pt-0' : ''}`}
                          >
                            <img
                              src={item.bread.imageUrl}
                              alt={item.bread.name}
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 object-cover rounded-xl border border-secondary/10"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <h5 className="font-serif text-base font-bold text-burnt-espresso truncate">
                                {item.bread.name}
                              </h5>
                              <span className="font-serif text-xs font-extrabold text-primary">
                                ₩{(item.bread.price * item.quantity).toLocaleString()}
                              </span>
                            </div>

                            {/* Quantity buttons */}
                            <div className="flex items-center space-x-1.5 bg-flour-cream rounded-xl p-1 border border-secondary/10">
                              <button
                                onClick={() => onUpdateQuantity(item.bread.id, -1)}
                                className="p-1 text-burnt-espresso hover:bg-secondary/10 rounded-lg focus:outline-none"
                                id={`qty-minus-${item.bread.id}`}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-sans text-xs font-bold px-1.5 text-burnt-espresso">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.bread.id, 1)}
                                className="p-1 text-burnt-espresso hover:bg-secondary/10 rounded-lg focus:outline-none"
                                id={`qty-plus-${item.bread.id}`}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Delete button */}
                            <button
                              onClick={() => onRemoveItem(item.bread.id)}
                              className="p-2 text-burnt-espresso/40 hover:text-red-500 rounded-lg hover:bg-red-500/5 transition-colors focus:outline-none"
                              id={`item-delete-${item.bread.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Store Pickup Branch Selector */}
                  {cart.length > 0 && (
                    <div className="space-y-4 border-t border-secondary/15 pt-6">
                      <h4 className="font-serif text-xs font-bold text-burnt-espresso/80 uppercase tracking-widest">
                        픽업 수령 매장 선택
                      </h4>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {BRANCH_LOCATIONS.map((branch) => (
                          <button
                            key={branch.id}
                            onClick={() => setSelectedBranchId(branch.id)}
                            className={`p-3 rounded-xl border text-center transition-all focus:outline-none flex flex-col justify-between ${
                              selectedBranchId === branch.id
                                ? 'bg-flour-cream border-crust-amber text-burnt-espresso shadow-[0_4px_12px_rgba(212,139,63,0.1)]'
                                : 'bg-white border-secondary/15 text-burnt-espresso/70 hover:border-burnt-espresso/30'
                            }`}
                            id={`btn-branch-opt-${branch.id}`}
                          >
                            <span className="font-serif text-[11px] sm:text-xs font-bold block leading-tight">
                              {branch.name.split(' (')[0]}
                            </span>
                            <span className="font-sans text-[10px] text-primary mt-1 font-medium block">
                              {branch.id === 'main' ? '은행동' : branch.id === 'station' ? '대전역' : '백화점'}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Selected branch telemetry */}
                      <div className="bg-flour-cream/70 rounded-2xl p-4 border border-secondary/10 space-y-3">
                        <div className="flex items-center space-x-2 text-xs font-sans text-burnt-espresso">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-semibold">{selectedBranch.hours}</span>
                        </div>
                        <p className="font-sans text-[11px] sm:text-xs text-burnt-espresso/70 leading-relaxed">
                          {selectedBranch.description}
                        </p>
                        <div className="text-[10px] sm:text-[11px] font-mono text-primary/80 bg-white px-2.5 py-1 rounded-lg inline-block border border-secondary/5 font-semibold">
                          지점특화: {selectedBranch.exclusiveBread}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer and Bill calculation */}
                {cart.length > 0 && (
                  <div className="p-6 bg-white border-t border-secondary/10 space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm font-sans text-secondary/80">
                        <span>예약 품목 합계 ({cart.reduce((a, b) => a + b.quantity, 0)}개)</span>
                        <span>₩{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm font-sans text-secondary/80">
                        <span>온라인 즉석 포장 수수료</span>
                        <span className="text-primary font-bold">무료 (빵집 기부 헌팅 포함)</span>
                      </div>
                      
                      <div className="w-full h-px bg-secondary/10 my-3" />
                      
                      <div className="flex justify-between text-base sm:text-lg font-serif font-extrabold text-burnt-espresso">
                        <span>최종 예약 금액</span>
                        <span>₩{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full bg-crust-amber hover:bg-primary disabled:bg-primary/50 text-white font-sans text-sm sm:text-base font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_5px_15px_rgba(212,139,63,0.25)] focus:outline-none"
                      id="btn-complete-booking"
                    >
                      {isCheckingOut ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          <span>성심 마이 하트 서버 통신 중...</span>
                        </>
                      ) : (
                        <span>예약 완료 및 모바일 보증 티켓 발급</span>
                      )}
                    </button>
                    <div className="text-[10px] text-center font-mono text-burnt-espresso/40">
                      대전 성심당 백년가게 당일 생산 • 당일 수령 기부 원칙 동의
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Checkout complete overlay screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 p-8 flex flex-col justify-between bg-white text-center"
              >
                <div className="my-auto space-y-6">
                  {/* Big Check icon */}
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-burnt-espresso">
                      예약이 무사히 접수되었습니다!
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-burnt-espresso/70 max-w-md mx-auto leading-relaxed">
                      당일 예약 원칙에 따라 신선한 버터가 발린 빵들이 밀실 오븐에서 즉석 베이킹 조제 후 팩킹을 개시합니다.
                    </p>
                  </div>

                  {/* High Fidelity Ticket Stub */}
                  <div className="mx-auto max-w-[340px] bg-flour-cream rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(61,43,31,0.08)] border border-secondary/15 relative">
                    {/* Punch hole cutouts on side */}
                    <div className="absolute -left-3 top-2/3 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-r border-secondary/15" />
                    <div className="absolute -right-3 top-2/3 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-l border-secondary/15" />

                    {/* Ticket Header */}
                    <div className="bg-gradient-to-r from-burnt-espresso to-secondary p-5 text-white flex items-center justify-between text-left">
                      <div>
                        <span className="font-sans text-[10px] font-bold text-yeast-gold uppercase tracking-widest">
                          Sungsimdang Reservation Ticket
                        </span>
                        <h4 className="font-serif text-base sm:text-lg font-bold mt-1">
                          {selectedBranch.name.split(' (')[0]}
                        </h4>
                      </div>
                      <Ticket className="w-8 h-8 text-yeast-gold/80" />
                    </div>

                    {/* Ticket details */}
                    <div className="p-6 text-left space-y-4">
                      <div>
                        <span className="font-sans text-[10px] font-semibold text-secondary/60 uppercase">
                          예약 픽업 인증인 코드
                        </span>
                        <span className="font-mono text-lg font-extrabold text-burnt-espresso block mt-0.5 tracking-wider">
                          {pickupCode}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-dashed border-secondary/20 pt-4">
                        <div>
                          <span className="font-sans text-[10px] font-semibold text-secondary/60 uppercase">
                            수령 예정 지점
                          </span>
                          <span className="font-sans text-xs font-bold text-burnt-espresso block mt-0.5">
                            {selectedBranch.name.split(' (')[1]?.replace(')', '') || '은행 본점'}
                          </span>
                        </div>
                        <div>
                          <span className="font-sans text-[10px] font-semibold text-secondary/60 uppercase">
                            픽업 운영 시간
                          </span>
                          <span className="font-sans text-xs font-bold text-burnt-espresso block mt-0.5">
                            ~ 22:00 까지 당일 수령
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-dashed border-secondary/20 pt-4 text-center">
                        <span className="font-sans text-[10px] font-semibold text-secondary/40 block">
                          모든 결제는 매장 수령 시 신속하게 집행됩니다
                        </span>
                        <div className="mt-3 inline-flex items-center space-x-1 text-xs font-sans text-primary font-bold">
                          <span>우리는 빵을 굽고 선을 나눕니다</span>
                          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full bg-burnt-espresso hover:bg-primary text-white font-sans text-sm font-bold py-4 rounded-xl transition-colors focus:outline-none shadow-md mt-6"
                  id="btn-cart-success-confirm"
                >
                  확인 완료 (돌아가기)
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
