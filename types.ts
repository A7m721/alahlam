export interface Meal {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  rating: number;
  category: string;
}

export interface CartItem {
  meal: Meal;
  qty: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Pending' | 'Delivered' | 'Cancelled';
  items: CartItem[];
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (meal: Meal, quantity?: number) => void;
  removeFromCart: (mealId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  itemsCount: number;
  orders: Order[];
  placeOrder: () => void;
  confirmOrderReceipt: (orderId: string) => void;
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
  isFavorite: (mealId: string) => boolean;
}