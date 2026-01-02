import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Product, Store, CartItem } from '@/types/delivery';
import { stores, products } from '@/data/delivery';

type DeliveryTabsContentProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStore: number | null;
  setSelectedStore: (storeId: number | null) => void;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  filteredStores: Store[];
  filteredProducts: Product[];
  cartTotal: number;
  deliveryFees: number;
  totalWithDelivery: number;
  cartStoreIds: number[];
};

const DeliveryTabsContent = ({
  searchQuery,
  setSearchQuery,
  selectedStore,
  setSelectedStore,
  setActiveTab,
  cart,
  addToCart,
  removeFromCart,
  filteredStores,
  filteredProducts,
  cartTotal,
  deliveryFees,
  totalWithDelivery,
  cartStoreIds,
}: DeliveryTabsContentProps) => {
  return (
    <>
      <TabsContent value="home" className="space-y-8 animate-fade-in">
        <div className="text-center space-y-4 py-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-slide-up">
            Доставка из любого магазина
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Выберите магазин, составьте список покупок и мы доставим всё за вас
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск магазинов и товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg rounded-2xl border-2 focus:border-primary shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'Store', title: 'Любой магазин', desc: 'Выбирайте из популярных сетей', color: 'from-primary to-orange-400' },
            { icon: 'Clock', title: 'Быстрая доставка', desc: 'От 30 минут до вашей двери', color: 'from-secondary to-purple-400' },
            { icon: 'ShieldCheck', title: 'Гарантия качества', desc: 'Проверяем каждый товар', color: 'from-accent to-blue-400' },
          ].map((feature, idx) => (
            <Card key={idx} className="border-2 hover:border-primary transition-all hover:scale-105 animate-slide-up" style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon name={feature.icon as any} className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-bold mb-6">Популярные магазины</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stores.map((store) => (
              <Card 
                key={store.id} 
                className="cursor-pointer hover:scale-110 transition-transform border-2 hover:border-primary hover:shadow-xl"
                onClick={() => {
                  setSelectedStore(store.id);
                  setActiveTab('catalog');
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">{store.image}</div>
                  <p className="font-semibold text-sm">{store.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{store.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="stores" className="animate-fade-in">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Все магазины</h2>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {filteredStores.length} магазинов
            </Badge>
          </div>

          <div className="relative">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Найти магазин..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store, idx) => (
              <Card 
                key={store.id} 
                className="hover:shadow-2xl transition-all border-2 hover:border-primary cursor-pointer group animate-scale-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
                onClick={() => {
                  setSelectedStore(store.id);
                  setActiveTab('catalog');
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-6xl group-hover:scale-110 transition-transform">{store.image}</div>
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                      <Icon name="Star" size={14} className="mr-1" />
                      {store.rating}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mt-4">{store.name}</CardTitle>
                  <CardDescription className="text-base">{store.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Truck" size={18} className="text-primary" />
                    <span>Доставка: <strong>{store.deliveryFee} ₽</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="ShoppingBag" size={18} className="text-secondary" />
                    <span>Мин. заказ: <strong>{store.minOrder} ₽</strong></span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="catalog" className="animate-fade-in">
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold">Каталог товаров</h2>
              {selectedStore && (
                <p className="text-muted-foreground mt-1">
                  Магазин: <strong>{stores.find(s => s.id === selectedStore)?.name}</strong>
                </p>
              )}
            </div>
            {selectedStore && (
              <Button 
                variant="outline" 
                onClick={() => setSelectedStore(null)}
                className="hover:scale-105 transition-transform"
              >
                <Icon name="X" className="mr-2" />
                Сбросить фильтр
              </Button>
            )}
          </div>

          <div className="relative">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Найти товар..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <Card 
                key={product.id} 
                className="hover:shadow-2xl transition-all border-2 hover:border-secondary group animate-scale-in"
                style={{ animationDelay: `${idx * 0.03}s` }}
              >
                <CardHeader>
                  <div className="text-7xl text-center group-hover:scale-110 transition-transform">
                    {product.image}
                  </div>
                  <CardTitle className="text-lg mt-4">{product.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="mt-2">{product.category}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {product.price} ₽
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {stores.find(s => s.id === product.storeId)?.name}
                    </span>
                  </div>
                  <Button 
                    onClick={() => addToCart(product)} 
                    className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all hover:scale-105"
                  >
                    <Icon name="Plus" className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="cart" className="animate-fade-in">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Корзина</h2>
            {cart.length > 0 && (
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} товаров
              </Badge>
            )}
          </div>

          {cart.length === 0 ? (
            <Card className="p-12 text-center border-2 border-dashed">
              <div className="text-8xl mb-6 opacity-50">🛒</div>
              <h3 className="text-2xl font-semibold mb-3">Корзина пуста</h3>
              <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
              <Button 
                size="lg" 
                onClick={() => setActiveTab('catalog')}
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl"
              >
                <Icon name="ShoppingBag" className="mr-2" />
                Перейти в каталог
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, idx) => (
                  <Card key={item.id} className="animate-scale-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="text-6xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {stores.find(s => s.id === item.storeId)?.name}
                          </p>
                          <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {item.price} ₽
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button 
                            size="icon" 
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            className="hover:bg-destructive hover:text-white transition-colors"
                          >
                            <Icon name="Minus" />
                          </Button>
                          <span className="text-2xl font-bold w-12 text-center">{item.quantity}</span>
                          <Button 
                            size="icon"
                            onClick={() => addToCart(item)}
                            className="bg-gradient-to-r from-primary to-secondary"
                          >
                            <Icon name="Plus" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="h-fit sticky top-24 border-2 border-primary/20 shadow-2xl animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-2xl">Итого</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 pb-4 border-b">
                    <div className="flex justify-between text-lg">
                      <span>Товары:</span>
                      <strong>{cartTotal} ₽</strong>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Доставка:</span>
                      <strong>{deliveryFees} ₽</strong>
                    </div>
                    {cartStoreIds.length > 1 && (
                      <p className="text-xs text-muted-foreground">
                        * Доставка из {cartStoreIds.length} магазинов
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between text-2xl font-bold">
                    <span>К оплате:</span>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {totalWithDelivery} ₽
                    </span>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full h-14 text-lg bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all hover:scale-105"
                  >
                    <Icon name="CheckCircle" className="mr-2" />
                    Оформить заказ
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="delivery" className="animate-fade-in">
        <Card className="max-w-3xl mx-auto border-2">
          <CardHeader>
            <CardTitle className="text-3xl">Условия доставки</CardTitle>
            <CardDescription className="text-base">Информация о доставке товаров</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: 'Clock', title: 'Быстрая доставка', desc: 'От 30 до 90 минут', color: 'bg-primary' },
                { icon: 'MapPin', title: 'По всему городу', desc: 'Доставляем в любой район', color: 'bg-secondary' },
                { icon: 'CreditCard', title: 'Удобная оплата', desc: 'Наличными или картой', color: 'bg-accent' },
                { icon: 'ShieldCheck', title: 'Проверка товаров', desc: 'Контролируем качество', color: 'bg-primary' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className={`${item.color} p-3 rounded-xl`}>
                    <Icon name={item.icon as any} className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold">Стоимость доставки</h3>
              <div className="space-y-3">
                {stores.map((store) => (
                  <div key={store.id} className="flex items-center justify-between bg-background p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{store.image}</span>
                      <div>
                        <p className="font-semibold">{store.name}</p>
                        <p className="text-sm text-muted-foreground">Мин. заказ: {store.minOrder} ₽</p>
                      </div>
                    </div>
                    <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-primary to-secondary">
                      {store.deliveryFee} ₽
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="profile" className="animate-fade-in">
        <Card className="max-w-2xl mx-auto border-2">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
                АИ
              </div>
              <div>
                <CardTitle className="text-2xl">Александр Иванов</CardTitle>
                <CardDescription className="text-base">+7 (999) 123-45-67</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Адреса доставки</h3>
              <Card className="bg-muted/50">
                <CardContent className="p-4 flex items-start gap-3">
                  <Icon name="MapPin" className="text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Дом</p>
                    <p className="text-sm text-muted-foreground">ул. Ленина, д. 10, кв. 25</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Способы оплаты</h3>
              <Card className="bg-muted/50">
                <CardContent className="p-4 flex items-center gap-3">
                  <Icon name="CreditCard" className="text-secondary" />
                  <div className="flex-1">
                    <p className="font-semibold">•••• 4242</p>
                    <p className="text-sm text-muted-foreground">Visa</p>
                  </div>
                  <Badge variant="secondary">Основная</Badge>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" variant="outline" className="w-full hover:scale-105 transition-transform">
              <Icon name="Settings" className="mr-2" />
              Редактировать профиль
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="animate-fade-in">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">История заказов</h2>
          <div className="space-y-4">
            {[
              { id: '10234', date: '15 янв, 14:30', items: 5, total: 1450, status: 'Доставлен', color: 'bg-green-500' },
              { id: '10233', date: '14 янв, 18:20', items: 3, total: 890, status: 'Доставлен', color: 'bg-green-500' },
              { id: '10232', date: '12 янв, 12:15', items: 8, total: 2340, status: 'Доставлен', color: 'bg-green-500' },
            ].map((order, idx) => (
              <Card key={order.id} className="border-2 hover:border-primary transition-colors cursor-pointer animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl text-white">
                        <Icon name="Package" size={28} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Заказ #{order.id}</h3>
                        <p className="text-muted-foreground">{order.date}</p>
                        <p className="text-sm mt-1">Товаров: {order.items}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {order.total} ₽
                      </p>
                      <Badge className={`${order.color} mt-2`}>{order.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="animate-fade-in">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Отзывы клиентов</h2>
            <div className="flex items-center gap-2">
              <Icon name="Star" className="text-amber-500" size={32} />
              <span className="text-3xl font-bold">4.7</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Мария К.', rating: 5, text: 'Отличный сервис! Доставили за 40 минут, всё свежее и качественное.', date: '2 дня назад', avatar: '👩' },
              { name: 'Дмитрий П.', rating: 5, text: 'Очень удобно заказывать из разных магазинов в одном приложении!', date: '5 дней назад', avatar: '👨' },
              { name: 'Елена С.', rating: 4, text: 'Хорошая доставка, но хотелось бы больше магазинов в списке.', date: '1 неделю назад', avatar: '👩‍🦰' },
            ].map((review, idx) => (
              <Card key={idx} className="border-2 animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{review.avatar}</div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{review.name}</h3>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Icon key={i} name="Star" className="text-amber-500 fill-amber-500" size={18} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button size="lg" variant="outline" className="w-full hover:scale-105 transition-transform">
            <Icon name="MessageSquare" className="mr-2" />
            Оставить отзыв
          </Button>
        </div>
      </TabsContent>
    </>
  );
};

export default DeliveryTabsContent;
