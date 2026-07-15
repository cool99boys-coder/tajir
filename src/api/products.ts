import { supabase } from "../lib/supabase";
import type { Product } from "../types/product";

type ProductRow = {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  image_url: string;
  category: string | null;
  created_at: string;
  updated_at: string;
};

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    image_url: row.image_url,
    category: row.category,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function mapProducts(rows: ProductRow[] | null): Product[] {
  return (rows ?? []).map(mapProduct);
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return mapProducts(data as ProductRow[] | null);
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? mapProduct(data as ProductRow) : null;
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  if (!category || category === "all") return getProducts();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return mapProducts(data as ProductRow[] | null);
}

export async function searchProducts(search: string): Promise<Product[]> {
  const term = search.trim();
  if (!term) return getProducts();

  const escaped = term.replace(/[%_]/g, "\\$&");
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${escaped}%,description.ilike.%${escaped}%`)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return mapProducts(data as ProductRow[] | null);
}
