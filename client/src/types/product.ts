export interface ProductImage {
  url: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  sizes: string[];
  colors: string[];
  rating_count: number;
  images: ProductImage[];
}

export interface ProductMeta {
  colors: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
}

export interface ProductFilters {
  colors: string[];
  sizes: string[];
  minPrice: string | null;
  maxPrice: string | null;
  keyword: string;
  category: string;
}
