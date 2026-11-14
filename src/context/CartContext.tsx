"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, FoodItem, FoodSize, CartItemAddOn } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (
    foodItem: FoodItem,
    size?: FoodSize,
    addOns?: CartItemAddOn[],
    quantity?: number,
    specialInstructions?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  couponCode: string | null;
  couponError: string | null;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
  grandTotal: number;
  freeDeliveryRemaining: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zaffran_cart_v1");
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem("zaffran_coupon_v1");
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        setCouponCode(parsed.code);
        setDiscount(parsed.discount);
      }
    } catch (e) {
      console.error("Failed to restore cart from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("zaffran_cart_v1", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist cart", e);
    }
  }, [items, isInitialized]);

  const addToCart = (
    foodItem: FoodItem,
    size?: FoodSize,
    addOns: CartItemAddOn[] = [],
    quantity = 1,
    specialInstructions = ""
  ) => {
    // Generate unique composite key
    const addOnsKey = addOns
      .map((a) => a.id)
      .sort()
      .join("-");
    const cartItemId = `${foodItem.id}_${size?.id || "base"}_${addOnsKey}`;

    const unitPrice =
      foodItem.price +
      (size?.priceOffset || 0) +
      addOns.reduce((sum, a) => sum + a.price, 0);

    setItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: (item.quantity + quantity) * unitPrice,
                specialInstructions: specialInstructions || item.specialInstructions,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          foodItem,
          quantity,
          selectedSize: size,
          selectedAddOns: addOns,
          specialInstructions,
          unitPrice,
          totalPrice: unitPrice * quantity,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
    setDiscount(0);
    localStorage.removeItem("zaffran_cart_v1");
    localStorage.removeItem("zaffran_coupon_v1");
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  // Delivery charge rule: ₹49 if subtotal < ₹599, free above ₹599
  const FREE_DELIVERY_THRESHOLD = 599;
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 49;
  const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  // 5% GST tax
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round((taxableAmount * 0.05));
  const grandTotal = Math.max(0, taxableAmount + tax + deliveryFee);

  const applyCoupon = async (code: string): Promise<boolean> => {
    setCouponError(null);
    try {
      const res = await fetch(`/api/coupons?code=${encodeURIComponent(code)}&subtotal=${subtotal}`);
      const data = await res.json();
      if (data.success && data.coupon) {
        setCouponCode(data.coupon.code);
        setDiscount(data.discount);
        localStorage.setItem(
          "zaffran_coupon_v1",
          JSON.stringify({ code: data.coupon.code, discount: data.discount })
        );
        return true;
      } else {
        setCouponError(data.error || "Invalid coupon code");
        return false;
      }
    } catch (e) {
      setCouponError("Failed to validate coupon");
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setDiscount(0);
    setCouponError(null);
    localStorage.removeItem("zaffran_coupon_v1");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        deliveryFee,
        tax,
        discount,
        couponCode,
        couponError,
        applyCoupon,
        removeCoupon,
        grandTotal,
        freeDeliveryRemaining,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
