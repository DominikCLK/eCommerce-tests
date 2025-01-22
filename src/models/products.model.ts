export interface Product {
  id: string;
  name: string;
  description: string;
  category: {
    id: string;
    name: string;
    parent_id: string;
    slug: string;
  };
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  price: number;
}
