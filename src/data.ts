import { BreadItem, BranchLocation, LaminationPart } from './types.ts';

export const SIGNATURE_BREADS: BreadItem[] = [
  {
    id: 'soboro',
    name: '튀소보로',
    englishName: 'Fried Soboro Bun',
    badge: 'No.1 Signature',
    description: '바삭한 소보로 안에 달콤한 팥앙금이 가득. 1980년 탄생하여 40년 넘게 사랑받는 성심당의 절대 강자.',
    longDescription: '성심당의 최고 상징이자 특허 등록된 시그니처 빵입니다. 겉은 고소한 소보로를 튀겨내어 극대화된 과자 같은 크런치함을 자랑하고, 속에는 전통 수제 팥앙금을 듬뿍 채워 거부할 수 없는 달콤고소함을 선사합니다. 대전에 가면 무조건 박스로 구입해 간다는 최고의 선물용 빵입니다.',
    price: 3000,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800&h=600',
    tag: 'signature',
    caloriesIndex: '345 kcal',
    allergens: ['밀', '우유', '계란', '땅콩'],
    pairing: '차가운 흰 우유, 산미 있는 아메리카노'
  },
  {
    id: 'chive',
    name: '판타롱부추빵',
    englishName: 'Pantaloons Chives Bun',
    badge: 'Best Item',
    description: '아삭한 부추와 고기가 어우러진 담백한 맛. 추억의 명작 식사 대용 빵.',
    longDescription: '1986년 판타롱 청바지가 유행하던 시절 첫선을 보여 대흥행을 이룬 역사의 빵입니다. 찐빵처럼 촉촉하고 부드러운 하얀 빵 속에, 싱그러운 향을 내뿜는 아삭아삭한 신선 부추, 잘게 썰어 볶아낸 국산 돼지고기, 고소한 삶은 계란이 꽉 차 있어 향긋함과 담백함의 극치를 한입에 느낄 수 있습니다.',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=800&h=600',
    tag: 'best',
    caloriesIndex: '280 kcal',
    allergens: ['밀', '우유', '계란', '돼지고기', '대두'],
    pairing: '따뜻한 둥굴레차, 보리차'
  },
  {
    id: 'baguette',
    name: '명란바게트',
    englishName: 'Pollack Roe Baguette',
    badge: 'Trending',
    description: '짭조름한 명란과 바삭한 바게트의 완벽한 조화. 이영자 맛집 추천 대유행 빵.',
    longDescription: '천연 발효종을 사용해 오랫동안 천천히 구워낸 프렌치 전통 바게트를 반으로 슬라이스한 후, 짭짤하고 감칠맛 뛰어난 특제 명란 마요를 가득 채워 오븐에 노릇하게 재구워냈습니다. 김가루와 깨가 솔솔 뿌려져 서양의 바게트와 동양의 명란 짭조름함이 마성의 단짠 중독적 감칠맛을 연출합니다.',
    price: 3800,
    imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=800&h=600',
    tag: 'trending',
    caloriesIndex: '310 kcal',
    allergens: ['밀', '대두', '알류(명란)', '쇠고기'],
    pairing: '차가운 맥주, 스파클링 탄산수'
  },
  {
    id: 'strawberry',
    name: '딸기시루',
    englishName: 'Strawberry Siru Cake',
    badge: '성심당 케익부띠끄',
    description: '신선한 제철 딸기와 부드러운 초코 크림이 겹겹이 쌓인 가성비 종결 예술작품 케이크.',
    longDescription: '성심당 산하 디저트 전문점인 케익부띠끄의 절대적 베스트셀러이자 대기 행렬이 무려 수백 미터에 이르기로 유명한 전설적인 케이크입니다. 시트를 거의 찾아보기 힘들 정도로 무려 3~4kg에 달하는 압도적인 양의 싱싱한 딸기를 고밀도 쇼콜라 초코시트 사방에 알차게 얹고, 다크 초콜릿 가나슈 크림을 터질 듯 채워 넣은 딸기 과일 폭탄 케이크입니다.',
    price: 43000,
    imageUrl: 'https://images.unsplash.com/photo-1464349172961-10442a8a1730?auto=format&fit=crop&q=80&w=800&h=600',
    tag: 'seasonal',
    caloriesIndex: '1,250 kcal (전체 분량)',
    allergens: ['밀', '우유', '계란', '대두'],
    pairing: '따뜻한 얼그레이 홍차, 싱글 오리진 드립 커피'
  },
  {
    id: 'bomunsan',
    name: '보문산메아리',
    englishName: 'Bomunsan Echo Pastry',
    badge: 'Heritage Spec',
    description: '켜켜이 녹아든 감미로운 버터향과 골든 시럽이 주는 잔잔하고 깊은 울림의 몽블랑.',
    longDescription: '대전을 지키는 아름다운 산 보문산의 등고선 모양을 모티브로 구워낸 황금빛 페이스트리 몽블랑인 보문산 메아리입니다. 얇고 촉촉한 퍼프 반죽 결이 원형 나선형으로 촘촘히 꼬여 있어 부드럽게 한 겹씩 결대로 찢어내며 즐기는 재미가 있습니다. 속은 촉촉하고 달콤한 럼 시럽이 스며들어 있어 깊고 아늑한 달콤함을 선보입니다.',
    price: 6000,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800&h=600',
    tag: 'signature',
    caloriesIndex: '420 kcal',
    allergens: ['밀', '우유', '계란'],
    pairing: '카페라떼, 진한 카푸치노'
  },
  {
    id: 'saltroll',
    name: '소금버터롤',
    englishName: 'Salted Butter Roll',
    badge: 'Daily Classic',
    description: '고급 엘레이르 프랑스 고메 버터의 깊은 풍미 위로 크리스탈 소금이 알알이 씹히는 매일의 일상.',
    longDescription: '겉은 바작바작 구워져 바게트와 같은 가벼운 저항감을 주고, 버터가 스팀처럼 녹아 빠져나간 속 빈자리에는 쫀득한 빵살과 풍부하고 고소한 버터 오일이 응축되어 있습니다. 프랑스산 게랑드 천일염이 고운 결정으로 뿌려져 한입 씹을 때마다 짭조름한 소금이 고소함과 버티한 풍미를 기가 막히게 살려줍니다.',
    price: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800&h=600',
    tag: 'best',
    caloriesIndex: '210 kcal',
    allergens: ['밀', '우유'],
    pairing: '차가운 콜드브루, 밀크티'
  }
];

export const BRANCH_LOCATIONS: BranchLocation[] = [
  {
    id: 'main',
    name: '성심당 본점 (은행동)',
    address: '대전 중구 대종로480번길 15',
    englishAddress: '15, Daejong-ro 480beon-gil, Jung-gu, Daejeon',
    tel: '1588-8069',
    hours: '08:00 ~ 22:00 (연중무휴)',
    description: '1956년 문을 연 이래 대전 문화 예술의 거리 한복판을 지켜온 성심당의 심장입니다. 전국 빵순이들의 성지라 불리며, 매장에 발을 들이는 순간 갓 나온 수십 개 트레이가 쏟아내는 역동적 활기찬 빵 내음을 만끽할 수 있습니다.',
    coordinates: { lat: 36.3278, lng: 127.4273 },
    exclusiveBread: '토요빵, 보문산 메아리 Full Collection',
    features: ['60년 넘은 역사적 유산', '수백 종류의 빵 테이스팅 존', '케익부띠끄 인접 (도보 2분)'],
    mapEmbedUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600&h=350&blur=1'
  },
  {
    id: 'station',
    name: '성심당 대전역점',
    address: '대전 동구 중앙로 215 대전역 2층 대합실',
    englishAddress: '2F Daejeon Station, 215, Jungang-ro, Dong-gu, Daejeon',
    tel: '1588-8069 (내선 2번)',
    hours: '07:00 ~ 22:30 (대합실 전 열차 운영시간 맞춤)',
    description: '열차 승하차 동선 바로 앞에 위치하여 여행자들의 양손 가득 튀김소보로 노란 종이박스를 안겨주는 관문 매장입니다. 바쁜 관광객들이 바로 갓 튀긴 튀김소보로 박스를 신속하고 신선하게 살 수 있도록 튀김 전용 소보로 전용 라인이 최적화되어 있습니다.',
    coordinates: { lat: 36.3323, lng: 127.4342 },
    exclusiveBread: '철도 추억의 미니 찐빵 세트',
    features: ['대전역 대합실 내 초고속 주문 가능', '기차 탑승객 실시간 픽업 전용 존', '갓 튀겨 따끈한 즉석 박싱'],
    mapEmbedUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=600&h=350&blur=1'
  },
  {
    id: 'lotte',
    name: '성심당 롯데백화점 대전점',
    address: '대전 서구 계룡로 598 롯데백화점 대전점 지하 1층',
    englishAddress: 'B1, Lotte Department Store, 598, Gyeryong-ro, Seo-gu, Daejeon',
    tel: '042-601-2500',
    hours: '10:30 ~ 20:00 (금,토,일 20:30 연장 영업)',
    description: '백화점 리빙/푸드 애비뉴에 시그니처 팩토리 형태로 입점한 하이엔드 브랜치입니다. 주차 공간이 잘 여유롭고 쇼핑하듯 쾌적하게 빵 쇼핑을 할 수 있으며, 롯데 대전점에서만 한정 생산하는 시그니처 롤케이크와 스페셜 브런치가 선풍적인 인기를 몰고 다닙니다.',
    coordinates: { lat: 36.3402, lng: 127.3895 },
    exclusiveBread: '롯데 단독 야끼소바빵, 초코 성심 크로와상',
    features: ['백화점 전용 안락하고 넓은 다이닝 카페석', '주차 3시간 전액 무료', '즉석 프리미엄 샌드위치 플레이트'],
    mapEmbedUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600&h=350&blur=1'
  }
];

export const LAMINATION_GUIDE: LaminationPart[] = [
  {
    id: 'top',
    title: 'Top Layer: Concentric Spiral',
    subtitle: '나선형 페이스트리 : 바삭함의 정수, 캐러멜라이즈드 골든 크라운',
    description: '버터 시트와 패스트리 도우를 27겹으로 정교하게 밀고 접어 나선 모양으로 꼬아 밀도를 극대화시켰습니다. 오븐에 굽는 과정에서 겉면에 버터 유막 캐러멜 라이징 광택을 촉진하여, 입에 대는 순간 달콤하고 가녀리게 바스라지는 크런치 사운드를 들려줍니다.',
    techStats: [
      { label: 'Shell Crispy Hardness', value: '8.8 / 10' },
      { label: 'Lamination Layer Fold', value: '27 Folds' },
      { label: 'Butter Concentric Density', value: 'High' }
    ]
  },
  {
    id: 'middle',
    title: 'Middle Layer: Honeycomb Aeration',
    subtitle: '벌집 에어쉘 크럼브 : 구름같이 가벼운 버터 향 공기 방울',
    description: '밀가루의 글루텐 공기 역학 설계와 유기농 천연 이스트 저온 슬로우 에이징 제법으로 탄생한 크로와상의 정수입니다. 완벽하고 일률적인 육각형 벌집 모양의 에어룸(기공포켓)들이 팽창하며 버티한 풍미를 머금어 입 안에서 사뿐한 가볍고 쫄깃한 충격을 보장합니다.',
    techStats: [
      { label: 'Flour Hydration Water Ratio', value: '72%' },
      { label: 'Air-pocket Bubble Retention', value: '94%' },
      { label: 'Elastic Chewiness Scale', value: '9.6 / 10' }
    ]
  },
  {
    id: 'bottom',
    title: 'Bottom Layer: Fluffy Crown Base',
    subtitle: '크라운 오븐 플러피 베이스 : 향긋하게 피어오르는 부드러운 화덕 기초',
    description: '모양을 단단하게 지탱해 주는 원기둥 컵베이크 기둥입니다. 열기가 빵 아래쪽에서 위로 수분을 밀어 올리며 하단 중심부는 짙은 버터 증기를 촉촉하게 내놓아, 위쪽의 건조함과 극적 대비를 이루는 솜사탕처럼 부드럽고 풍부한 고소함을 느끼게 합니다.',
    techStats: [
      { label: 'Flops Core Moisture Index', value: '9.8 / 10' },
      { label: 'Baking Oven Core Temp', value: '210°C' },
      { label: 'Crust Foundation Thickness', value: 'Solid Base' }
    ]
  }
];

export const HISTORY_TIMELINE = [
  { year: '1956', title: '찐빵 오두막의 수줍은 출발', description: '창업주 고(故) 임길순·한순덕 부부가 대전역 노점에 가톨릭 구호품인 밀가루 2포대로 차린 작디작은 찐빵 노점에서 성심당의 따사로운 불씨가 올려졌습니다.' },
  { year: '1970', title: '은행동 빵집으로의 정착', description: '현재 본점이 위치한 대전 중구 은행동 거리로 이전 확장하며 대전 최초의 현대식 제과점 설비를 갖추고 신선한 생크림 케이크와 서양 도넛을 판매했습니다.' },
  { year: '1980', title: '전설의 ‘튀김소보로’ 탄생', description: '소보로 빵과 튀김 곰보빵, 팥앙금이라는 이색 조합에서 아이디어를 캐어내 무수히 고전한 연구 끝에, 마침내 오늘날 대표 걸작인 특허제품 튀소보로가 태어났습니다.' },
  { year: '1986', title: '부추와 청바지 열풍, ‘부추빵’', description: '전국 최초로 가공하지 않은 아삭한 날부추를 속 재료로 써서 판타롱 바지 바람과 함께 학창 시절 아련한 향수를 자극하는 촉촉하고 싱싱한 판타롱 부추빵을 출시해 선풍을 이끕니다.' },
  { year: '2014', title: '프란치스코 교황의 식탁 위로', description: '한국을 내방한 교황 프란치스코 성하의 소박한 공식 조식 빵 식탁으로 성심당의 이탈리안 바게트와 치아바타, 그리고 대전 빵들이 직접 공급되는 세계적인 광영을 누립니다.' },
  { year: '2026', title: '우리가 대전에만 남은 든든한 이유', description: '타 도시의 화려한 확장 제안을 묵묵히 마다하고 대전의 정체성을 보존하며 남은 빵은 전량 불우이웃에게 기부하는 ESG 가치와 백년가게 사랑의 가약을 성심껏 실천해 갑니다.' }
];

export const REVIEWS = [
  { name: '김민주 (대전 토박이)', rating: 5, date: '2d ago', comment: '성심당 없는 대전은 상상할 수 없어요! 타지역 친구 오면 무조건 튀김소보로 6개짜리 세트 한 박스 들려서 기차 태웁니다. 최근 빠진 야끼소바빵과 딸기시루도 매번 먹어도 감동이에요.' },
  { name: 'John Doe (Seoul Traveler)', rating: 5, date: '4d ago', comment: 'Honestly thought it was overhyped. Boy was I wrong. The Pollack Roe Baguette warmed up is a literal culinary masterpiece. Perfect crunch, salty, complex flavors.' },
  { name: '박태환 (디저트 블로거)', rating: 5, date: '1w ago', comment: '딸기시루 케이크 무거워서 무릎이 주저앉을 뻔했어요ㅎㅎ 초콜릿 시트가 묵직하고 딸기가 가득해서 전혀 느끼하지 않고 상콤달달의 끝판왕입니다. 줄 서는 노고가 완벽히 보상받는 맛!' }
];
