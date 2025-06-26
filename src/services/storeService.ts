import { createClient } from "@/lib/supabase/server";

export async function getStores() {
  const supabase = await createClient();
  const { data: stores, error } = await supabase.from("store").select();

  if (error) {
    console.error("Error fetching stores:", error);
    throw new Error("Failed to fetch stores");
  }

  return stores;
}
