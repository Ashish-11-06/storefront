export interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  image?: string;
  category?: string;
  unit?: string;
}