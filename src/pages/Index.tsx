import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { CartItem, Product } from '@/types/delivery';
import { stores, products } from '@/data/delivery';
import DeliveryTabsContent from '@/components/DeliveryTabsContent';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCart(cart.filter(item => item.id !== productId));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartStoreIds = [...new Set(cart.map(item => item.storeId))];
  const deliveryFees = cartStoreIds.reduce((sum, storeId) => {
    const store = stores.find(s => s.id === storeId);
    return sum + (store?.deliveryFee || 0);
  }, 0);
  const totalWithDelivery = cartTotal + deliveryFees;

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    (selectedStore ? product.storeId === selectedStore : true) &&
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-2xl">
                <Icon name="ShoppingBag" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  FastDeliver
                </h1>
                <p className="text-xs text-muted-foreground">Доставка из любого магазина</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="lg" 
              className="relative hover:scale-105 transition-transform"
              onClick={() => setActiveTab('cart')}
            >
              <Icon name="ShoppingCart" className="mr-2" />
              Корзина
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-destructive text-white">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-8 bg-muted/50 p-1 rounded-2xl">
            <TabsTrigger value="home" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Home" className="mr-2" size={18} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="stores" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Store" className="mr-2" size={18} />
              Магазины
            </TabsTrigger>
            <TabsTrigger value="catalog" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Grid3x3" className="mr-2" size={18} />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="cart" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="ShoppingCart" className="mr-2" size={18} />
              Корзина
            </TabsTrigger>
            <TabsTrigger value="delivery" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Truck" className="mr-2" size={18} />
              Доставка
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="User" className="mr-2" size={18} />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Clock" className="mr-2" size={18} />
              История
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Star" className="mr-2" size={18} />
              Отзывы
            </TabsTrigger>
          </TabsList>

          <DeliveryTabsContent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            setActiveTab={setActiveTab}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            filteredStores={filteredStores}
            filteredProducts={filteredProducts}
            cartTotal={cartTotal}
            deliveryFees={deliveryFees}
            totalWithDelivery={totalWithDelivery}
            cartStoreIds={cartStoreIds}
          />
        </Tabs>
      </main>

      <footer className="bg-muted/50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
                <Icon name="ShoppingBag" className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">FastDeliver</h3>
                <p className="text-sm text-muted-foreground">Доставка из любого магазина</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                <Icon name="Instagram" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                <Icon name="Send" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                <Icon name="Mail" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
