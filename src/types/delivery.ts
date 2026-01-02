export type Product = {
  id: number;
  name: string;
  price: number;
  storeId: number;
  category: string;
  image: string;
};

export type Store = {
  id: number;
  name: string;
  category: string;
  deliveryFee: number;
  minOrder: number;
  rating: number;
  image: string;
};

export type CartItem = Product & { quantity: number };
