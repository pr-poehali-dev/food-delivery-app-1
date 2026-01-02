import { Store, Product } from '@/types/delivery';

export const stores: Store[] = [
  { id: 1, name: 'Перекрёсток', category: 'Супермаркет', deliveryFee: 199, minOrder: 500, rating: 4.5, image: '🛒' },
  { id: 2, name: 'Пятёрочка', category: 'Супермаркет', deliveryFee: 149, minOrder: 400, rating: 4.3, image: '🛍️' },
  { id: 3, name: 'Магнит', category: 'Супермаркет', deliveryFee: 179, minOrder: 450, rating: 4.4, image: '🏪' },
  { id: 4, name: 'Азбука Вкуса', category: 'Премиум', deliveryFee: 299, minOrder: 1000, rating: 4.8, image: '✨' },
  { id: 5, name: 'Вкусвилл', category: 'Здоровое питание', deliveryFee: 199, minOrder: 500, rating: 4.7, image: '🥗' },
  { id: 6, name: 'Лента', category: 'Гипермаркет', deliveryFee: 249, minOrder: 600, rating: 4.6, image: '🎯' },
];

export const products: Product[] = [
  { id: 1, name: 'Молоко 3.2%', price: 89, storeId: 1, category: 'Молочные', image: '🥛' },
  { id: 2, name: 'Хлеб белый', price: 45, storeId: 1, category: 'Хлеб', image: '🍞' },
  { id: 3, name: 'Яйца 10 шт', price: 120, storeId: 1, category: 'Яйца', image: '🥚' },
  { id: 4, name: 'Сыр Российский', price: 350, storeId: 1, category: 'Молочные', image: '🧀' },
  { id: 5, name: 'Помидоры 1кг', price: 180, storeId: 2, category: 'Овощи', image: '🍅' },
  { id: 6, name: 'Огурцы 1кг', price: 150, storeId: 2, category: 'Овощи', image: '🥒' },
  { id: 7, name: 'Бананы 1кг', price: 95, storeId: 2, category: 'Фрукты', image: '🍌' },
  { id: 8, name: 'Яблоки 1кг', price: 120, storeId: 2, category: 'Фрукты', image: '🍎' },
  { id: 9, name: 'Курица охл. 1кг', price: 280, storeId: 3, category: 'Мясо', image: '🍗' },
  { id: 10, name: 'Говядина 1кг', price: 650, storeId: 3, category: 'Мясо', image: '🥩' },
  { id: 11, name: 'Лосось филе', price: 890, storeId: 4, category: 'Рыба', image: '🐟' },
  { id: 12, name: 'Креветки 500г', price: 1200, storeId: 4, category: 'Морепродукты', image: '🦐' },
];
