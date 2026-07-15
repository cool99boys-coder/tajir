export interface Order {
  id: string;
  order_code: string;
  full_name: string;
  phone: string;
  address: string;
  notes: string | null;
  payment_method: string;
  screenshot_url: string | null;
  subtotal: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
  created_at: string;
}

export interface CreateOrderInput {
  order_code: string;
  full_name: string;
  phone: string;
  address: string;
  notes: string | null;
  payment_method: string;
  screenshot_url: string | null;
  subtotal: number;
  total: number;
}

export interface CreateOrderItemInput {
  order_id: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}
