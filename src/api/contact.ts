import { supabase } from "../lib/supabase";
import type { Contact } from "../types/contact";

type ContactRow = {
  id: string;
  phone: string;
  telegram_username: string | null;
  address: string;
  created_at: string;
  updated_at: string;
};

function mapContact(row: ContactRow): Contact {
  return {
    id: row.id,
    phone: row.phone,
    telegram_username: row.telegram_username,
    address: row.address,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function getContact(): Promise<Contact | null> {
  const { data, error } = await supabase
    .from("contact")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return mapContact(data as ContactRow);
}
