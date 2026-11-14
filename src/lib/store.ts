import fs from "fs";
import path from "path";
import { FoodItem, FoodCategory, Order, Coupon, RestaurantSettings, OrderStatus } from "./types";
import { initialCategories, initialFoodItems, initialCoupons, initialSettings } from "./initialData";

interface StoreData {
  categories: FoodCategory[];
  items: FoodItem[];
  orders: Order[];
  coupons: Coupon[];
  settings: RestaurantSettings;
}

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "restaurant_store.json");

// Initial sample orders for realistic dashboard reporting
const sampleOrders: Order[] = [
  {
    id: "ORD-94821",
    customerName: "Rashid Al-Nuaimi",
    customerPhone: "+91 98450 12345",
    customerEmail: "rashid@example.com",
    orderType: "delivery",
    deliveryAddress: {
      street: "Flat 4B, Skyview Towers, Marine Drive",
      landmark: "Near High Court",
      city: "Kochi",
      pincode: "682031",
    },
    instructions: "Please make the mutton extra tender and pack dakkoos securely.",
    items: [
      {
        id: "mandi-01",
        name: "Royal Mutton Mandi",
        quantity: 1,
        unitPrice: 950,
        totalPrice: 950,
        sizeName: "Full Portion (3-4 persons)",
        addOns: [{ name: "Extra Spiced Mandi Rice", price: 110 }],
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80",
      },
      {
        id: "fal-01",
        name: "Royal Zaffran Special Falooda",
        quantity: 2,
        unitPrice: 260,
        totalPrice: 520,
        addOns: [{ name: "Extra Creamy Malai Kulfi Stick", price: 50 }],
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 1630,
    deliveryFee: 0,
    tax: 81.5,
    discount: 150,
    couponCode: "ZAFFRAN100",
    total: 1561.5,
    status: "preparing",
    paymentMethod: "razorpay",
    paymentStatus: "paid",
    razorpayOrderId: "order_mock_001",
    razorpayPaymentId: "pay_mock_9921",
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    estimatedTime: "20-25 mins",
  },
  {
    id: "ORD-94820",
    customerName: "Aiswarya Menon",
    customerPhone: "+91 97451 98765",
    customerEmail: "aiswarya@example.com",
    orderType: "takeaway",
    instructions: "Pack cutlery and extra napkins.",
    items: [
      {
        id: "ker-01",
        name: "Malabar Thalassery Chicken Biryani",
        quantity: 2,
        unitPrice: 320,
        totalPrice: 640,
        sizeName: "Single Biryani",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
      },
      {
        id: "snk-01",
        name: "Dynamic Dynamite Shrimps",
        quantity: 1,
        unitPrice: 360,
        totalPrice: 360,
        image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 1000,
    deliveryFee: 0,
    tax: 50,
    discount: 150,
    couponCode: "FIRSTBITE",
    total: 900,
    status: "out_for_delivery",
    paymentMethod: "cod",
    paymentStatus: "pending",
    createdAt: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    estimatedTime: "Arriving shortly",
  },
  {
    id: "ORD-94819",
    customerName: "Fahad Rahman",
    customerPhone: "+91 99955 44332",
    orderType: "dine_in",
    tableNumber: "T-08 (Pavilion Royal)",
    items: [
      {
        id: "din-01",
        name: "Zaffran Signature Mixed Grill Sizzler",
        quantity: 1,
        unitPrice: 680,
        totalPrice: 680,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      },
      {
        id: "moj-02",
        name: "Blue Lagoon Ocean Fizz",
        quantity: 2,
        unitPrice: 160,
        totalPrice: 320,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 1000,
    deliveryFee: 0,
    tax: 50,
    discount: 0,
    total: 1050,
    status: "delivered",
    paymentMethod: "pay_at_pickup",
    paymentStatus: "paid",
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
  },
];

function ensureStoreFile(): StoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_FILE)) {
      const initial: StoreData = {
        categories: initialCategories,
        items: initialFoodItems,
        orders: sampleOrders,
        coupons: initialCoupons,
        settings: initialSettings,
      };
      fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const raw = fs.readFileSync(STORE_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading store, falling back to initial data:", err);
    return {
      categories: initialCategories,
      items: initialFoodItems,
      orders: sampleOrders,
      coupons: initialCoupons,
      settings: initialSettings,
    };
  }
}

function saveStore(data: StoreData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to save store file:", err);
  }
}

export const db = {
  // Menu Items
  getItems(): FoodItem[] {
    const data = ensureStoreFile();
    return data.items;
  },
  getItemById(id: string): FoodItem | undefined {
    const data = ensureStoreFile();
    return data.items.find((i) => i.id === id);
  },
  createItem(item: Omit<FoodItem, "id">): FoodItem {
    const data = ensureStoreFile();
    const newItem: FoodItem = {
      ...item,
      id: "dish-" + Date.now().toString(36),
    };
    data.items.unshift(newItem);
    saveStore(data);
    return newItem;
  },
  updateItem(id: string, updates: Partial<FoodItem>): FoodItem | null {
    const data = ensureStoreFile();
    const index = data.items.findIndex((i) => i.id === id);
    if (index === -1) return null;
    data.items[index] = { ...data.items[index], ...updates };
    saveStore(data);
    return data.items[index];
  },
  deleteItem(id: string): boolean {
    const data = ensureStoreFile();
    const prevLen = data.items.length;
    data.items = data.items.filter((i) => i.id !== id);
    if (data.items.length !== prevLen) {
      saveStore(data);
      return true;
    }
    return false;
  },

  // Categories
  getCategories(): FoodCategory[] {
    const data = ensureStoreFile();
    return data.categories;
  },
  createCategory(cat: Omit<FoodCategory, "id">): FoodCategory {
    const data = ensureStoreFile();
    const newCat: FoodCategory = {
      ...cat,
      id: cat.slug || "cat-" + Date.now().toString(36),
    };
    data.categories.push(newCat);
    saveStore(data);
    return newCat;
  },

  // Orders
  getOrders(): Order[] {
    const data = ensureStoreFile();
    return data.orders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  getOrderById(id: string): Order | undefined {
    const data = ensureStoreFile();
    return data.orders.find((o) => o.id === id);
  },
  createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Order {
    const data = ensureStoreFile();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now().toString().slice(-4)}${randomSuffix.toString().slice(-2)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.orders.unshift(newOrder);
    saveStore(data);
    return newOrder;
  },
  updateOrderStatus(id: string, status: OrderStatus, paymentStatus?: "paid" | "pending" | "failed"): Order | null {
    const data = ensureStoreFile();
    const index = data.orders.findIndex((o) => o.id === id);
    if (index === -1) return null;
    data.orders[index].status = status;
    if (paymentStatus) {
      data.orders[index].paymentStatus = paymentStatus;
    }
    data.orders[index].updatedAt = new Date().toISOString();
    saveStore(data);
    return data.orders[index];
  },

  // Coupons
  getCoupons(): Coupon[] {
    const data = ensureStoreFile();
    return data.coupons;
  },
  getCouponByCode(code: string): Coupon | undefined {
    const data = ensureStoreFile();
    return data.coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive
    );
  },
  createCoupon(coupon: Omit<Coupon, "id">): Coupon {
    const data = ensureStoreFile();
    const newCoupon: Coupon = {
      ...coupon,
      id: "coup-" + Date.now().toString(36),
      code: coupon.code.toUpperCase(),
    };
    data.coupons.unshift(newCoupon);
    saveStore(data);
    return newCoupon;
  },
  toggleCoupon(id: string): Coupon | null {
    const data = ensureStoreFile();
    const index = data.coupons.findIndex((c) => c.id === id);
    if (index === -1) return null;
    data.coupons[index].isActive = !data.coupons[index].isActive;
    saveStore(data);
    return data.coupons[index];
  },

  // Settings
  getSettings(): RestaurantSettings {
    const data = ensureStoreFile();
    return data.settings;
  },
  updateSettings(updates: Partial<RestaurantSettings>): RestaurantSettings {
    const data = ensureStoreFile();
    data.settings = { ...data.settings, ...updates };
    saveStore(data);
    return data.settings;
  },
};
