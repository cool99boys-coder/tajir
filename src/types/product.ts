export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string;
  category: string | null;
  created_at: string;
  updated_at: string;
}
