import { useState } from 'react';
import { MapPin, Phone, Clock, Compass, HelpCircle, Heart, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BranchLocation } from '../types.ts';

interface LocationProps {
  key?: string;
  branch: BranchLocation;
  isActive: boolean;
  onSelect: () => void;
}

export default function LocationDetails({ branch, isActive, onSelect }: LocationProps) {
  const [showDirections, setShowDirections] = useState<boolean>(false);

  // Simple mock route directions based on branch ID
  const getDirectionsGuide = (id: string) => {
    switch (id) {
      case 'main':
        return [
          { step: '지하철', desc: '대전지하철 1호선 중앙로역 2번 출구에서 나와 도보로 약 3분 직진 후, 으능정이 문화의거리 안쪽 우측 골목 진입' },
          { step: '도보 / 자가용', desc: '은행동 상가 공영주차장 이용 시 성심당 주차권 요청 가능 (1만원 이상 구매 시 1시간 무료 주차권 증정)' },
          { step: '기차역 연계', desc: '대전역에서 도보 15분 또는 버스/지하철 1정거장 거리 위치' }
        ];
      case 'station':
        return [
          { step: '기차 타는 곳 앞', desc: '대전역 2층 대합실 내부, 서울/부산 방면 에스컬레이터 바로 왼쪽 맞은편에 대형 부키 코트 입구 위치' },
          { step: '대기 줄 요령', desc: '대표 세트(튀소, 부추빵 단독 박싱) 구매 고객은 초고속 Express 전용 대기 줄로 서시면 1분 이내 발권 수령 가능' },
          { step: '보관 가방', desc: '열차 좌석 상단 짐칸에 노란 쇼퍼백 보관 시 냄새 침투 방지를 위한 지퍼 테이핑 입구 제공 마감' }
        ];
      case 'lotte':
        return [
          { step: '백화점 지하 1층', desc: '롯데백화점 대전점 지하 1층 푸드 에비뉴 핵심 구역에 성심당 시그니처 팩토리 입점 완료' },
          { step: '무료 주차', desc: '롯데백화점 주차타워 및 지하 주차장 전체 이용 가능, 구매 영수증 자동 정산 시스템 연동 (카운터 무료 등록)' },
          { step: '시그니처 바', desc: '오픈 키친형 오븐 제조실 바로 앞에서 야끼소바빵 나오는 시간 (11시, 16시) 맞춰 방문하시는 것을 절대 추천' }
        ];
      default:
        return [];
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`p-6 rounded-3xl border transition-all duration-500 cursor-pointer text-left flex flex-col justify-between h-full bg-white ${
        isActive
          ? 'border-crust-amber shadow-[0_15px_40px_rgba(212,139,63,0.12)] ring-1 ring-crust-amber/30 scale-[1.01]'
          : 'border-secondary/10 shadow-[0_10px_30px_rgba(61,43,31,0.03)] hover:border-burnt-espresso/30'
      }`}
    >
      <div className="space-y-4">
        {/* Banner image or map thumbnail if active */}
        <div className="relative h-44 rounded-2xl overflow-hidden bg-flour-cream">
          <img
            src={branch.mapEmbedUrl}
            alt={branch.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform scale-102 transition-transform duration-700"
          />
          {/* Subtle map lines drawing */}
          <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
            <div className="p-3 bg-white/95 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] backdrop-blur-md">
              <MapPin className="w-6 h-6 text-primary animate-bounce" />
            </div>
          </div>
          
          <div className="absolute bottom-3 right-3 bg-white/95 font-mono text-[9px] font-bold text-burnt-espresso tracking-wider px-2 py-0.5 rounded shadow-sm">
            Coordinates: {branch.coordinates.lat.toFixed(4)}, {branch.coordinates.lng.toFixed(4)}
          </div>
        </div>

        {/* Info Block */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-extrabold text-burnt-espresso">
              {branch.name}
            </h3>
            {isActive && <span className="w-2 h-2 rounded-full bg-crust-amber" />}
          </div>
          
          <span className="font-sans text-[10px] text-secondary/60 uppercase tracking-widest font-bold block mt-1">
            {branch.englishAddress}
          </span>
          
          <p className="font-sans text-xs sm:text-sm text-burnt-espresso/70 mt-3 leading-relaxed">
            {branch.description}
          </p>
        </div>

        {/* Contact info list */}
        <div className="space-y-2 pt-3 border-t border-secondary/5 font-sans text-xs">
          <div className="flex items-center space-x-2 text-burnt-espresso/80">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{branch.address}</span>
          </div>
          <div className="flex items-center space-x-2 text-burnt-espresso/80">
            <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{branch.tel}</span>
          </div>
          <div className="flex items-center space-x-2 text-burnt-espresso/80">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="font-semibold">{branch.hours}</span>
          </div>
        </div>

        {/* Branch-Exclusive Bread Tag & Features */}
        <div className="bg-flour-cream rounded-2xl p-4 border border-secondary/10 space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-serif font-bold text-burnt-espresso">
            <Compass className="w-4 h-4 text-primary" />
            <span>지점 전용 시그니처</span>
          </div>
          <p className="font-sans text-xs font-semibold text-primary">
            {branch.exclusiveBread}
          </p>
          
          {/* Features points */}
          <div className="flex flex-wrap gap-1 mt-2">
            {branch.features?.map((feature, i) => (
              <span
                key={i}
                className="font-sans text-[10px] bg-white px-2 py-0.5 rounded border border-secondary/10 text-secondary"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-secondary/5 flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDirections(true);
          }}
          className="w-full text-center bg-burnt-espresso hover:bg-primary text-white font-sans text-xs font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-sm focus:outline-none"
          id={`btn-route-${branch.id}`}
        >
          간편 길찾기 및 수령 가이드 ↗
        </button>
      </div>

      {/* Pop-up Navigation directions */}
      <AnimatePresence>
        {showDirections && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowDirections(false);
              }}
              className="fixed inset-0 bg-black"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md border border-secondary/15 relative z-10 shadow-2xl"
            >
              <button
                onClick={() => setShowDirections(false)}
                className="absolute top-4 right-4 text-burnt-espresso hover:text-primary p-2"
                id="btn-close-directions"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 mb-4">
                <Compass className="w-5 h-5 text-primary" />
                <h4 className="font-serif text-lg font-bold text-burnt-espresso">
                  {branch.name.split(' (')[0]} 대중교통 • 오시는 길
                </h4>
              </div>

              <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-1">
                {getDirectionsGuide(branch.id).map((item, i) => (
                  <div key={i} className="bg-flour-cream p-4 rounded-2xl border border-secondary/5">
                    <span className="font-sans text-xs font-extrabold text-primary uppercase block mb-1">
                      {item.step}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-burnt-espresso/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-secondary/5 text-center">
                <span className="font-sans text-[11px] text-burnt-espresso/40">
                  성심당은 오직 대전에서만 여러분을 뵈러 갑니다
                </span>
                <div className="mt-2 inline-flex items-center space-x-1 text-xs text-primary font-serif font-bold">
                  <span>Sungsimdang Hearth Map</span>
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
