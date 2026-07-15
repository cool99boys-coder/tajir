import type { DeliveryLocation } from "../config/deliveryFees";

export type { Contact } from "../types/contact";
export type {
  Order,
  OrderItem,
  CreateOrderInput,
  CreateOrderItemInput,
} from "../types/order";

export type Category = string;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: Category;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethodId = "telebirr" | "cbe" | "transfer";

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  description: string;
  accountName: string;
  accountNumber: string;
}

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
  paymentMethod: PaymentMethodId;
  deliveryLocation: DeliveryLocation;
}
