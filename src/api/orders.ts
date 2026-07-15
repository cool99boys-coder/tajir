import { supabase } from "../lib/supabase";
import type {
  CreateOrderInput,
  CreateOrderItemInput,
  Order,
  OrderItem,
} from "../types/order";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

type OrderRow = {
  id: string;
  order_code: string;
  full_name: string;
  phone: string;
  address: string;
  notes: string | null;
  payment_method: string;
  screenshot_url: string | null;
  subtotal: string | number;
  total: string | number;
  created_at: string;
  updated_at: string;
};

type OrderItemRow = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  unit_price: string | number;
  quantity: number;
  line_total: string | number;
  created_at: string;
};

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    order_code: row.order_code,
    full_name: row.full_name,
    phone: row.phone,
    address: row.address,
    notes: row.notes,
    payment_method: row.payment_method,
    screenshot_url: row.screenshot_url,
    subtotal: Number(row.subtotal),
    total: Number(row.total),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function mapOrderItem(row: OrderItemRow): OrderItem {
  return {
    id: row.id,
    order_id: row.order_id,
    product_id: row.product_id,
    product_name: row.product_name,
    unit_price: Number(row.unit_price),
    quantity: row.quantity,
    line_total: Number(row.line_total),
    created_at: row.created_at,
  };
}

export async function uploadOrderScreenshot(
  file: File,
  orderCode: string,
): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      "Missing Cloudinary environment variables. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.",
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", `tajirEmpire/${orderCode}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to upload screenshot to Cloudinary.");
  }

  const result = (await response.json()) as { secure_url?: string };
  if (!result.secure_url) {
    throw new Error("Cloudinary upload did not return a secure URL.");
  }

  return result.secure_url;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const { data, error } = await supabase
    .from("orders")
    .insert(input)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return mapOrder(data as OrderRow);
}

export async function createOrderItems(
  items: CreateOrderItemInput[],
): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from("order_items")
    .insert(items)
    .select("*");

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => mapOrderItem(row as OrderItemRow));
}
