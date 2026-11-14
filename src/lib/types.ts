export interface FoodSize {
  id: string;
  name: string;
  priceOffset: number; // additional cost in rupees
}

export interface FoodAddOn {
  id: string;
  name: string;
  price: number;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  price: number; // in INR (₹)
  image: string;
  isVeg: boolean;
  spicyLevel: 0 | 1 | 2 | 3; // 0 = Mild, 1 = Medium, 2 = Hot, 3 = Extra Spicy
  isPopular: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  rating: number;
  reviewsCount: number;
  prepTime: string;
  calories?: string;
  sizes?: FoodSize[];
  addOns?: FoodAddOn[];
}

export interface FoodCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  badge?: string;
}

export interface CartItemAddOn {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string; // unique key: `${item.id}-${size?.id || 'default'}-${sortedAddOnIds}`
  foodItem: FoodItem;
  quantity: number;
  selectedSize?: FoodSize;
  selectedAddOns: CartItemAddOn[];
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type OrderType = "delivery" | "takeaway" | "dine_in";

export type PaymentMethod = "razorpay" | "cod" | "pay_at_pickup";

export type PaymentStatus = "pending" | "paid" | "failed";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  sizeName?: string;
  addOns?: { name: string; price: number }[];
  specialInstructions?: string;
  image?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  orderType: OrderType;
  deliveryAddress?: {
    street: string;
    landmark?: string;
    city: string;
    pincode: string;
  };
  tableNumber?: string;
  instructions?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  updatedAt: string;
  estimatedTime?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  flatDiscount?: number;
  minOrder: number;
  maxDiscount?: number;
  description: string;
  validUntil: string;
  isActive: boolean;
}

export interface RestaurantSettings {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  openingHours: {
    weekdays: string;
    weekends: string;
  };
  deliveryFee: number;
  freeDeliveryThreshold: number;
  taxPercent: number;
  isAcceptingOrders: boolean;
  currencySymbol: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
}
