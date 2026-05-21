export interface BreadItem {
  id: string;
  name: string;
  englishName: string;
  badge?: string;
  description: string;
  longDescription: string;
  price: number;
  imageUrl: string;
  tag?: 'signature' | 'best' | 'trending' | 'seasonal';
  caloriesIndex?: string;
  allergens?: string[];
  pairing?: string;
}

export interface CartItem {
  bread: BreadItem;
  quantity: number;
}

export interface BranchLocation {
  id: string;
  name: string;
  address: string;
  englishAddress: string;
  tel: string;
  hours: string;
  description: string;
  mapEmbedUrl?: string;
  coordinates: { lat: number; lng: number };
  exclusiveBread?: string;
  features?: string[];
}

export interface LaminationPart {
  id: 'top' | 'middle' | 'bottom';
  title: string;
  subtitle: string;
  description: string;
  techStats: {
    label: string;
    value: string;
  }[];
}
