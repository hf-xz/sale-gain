import { createClient } from "@/lib/supabase/server";
import type { Store, CreateStore, UpdateStore } from "./types";

/**
 * Store 服务 - 包含所有与 store 表相关的数据库操作
 */

// 获取所有门店
export async function getAllStores(): Promise<Store[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("store")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching stores:", error);
    throw new Error("Failed to fetch stores");
  }

  return data || [];
}

// 根据 ID 获取门店
export async function getStoreById(id: number): Promise<Store | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("store")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // 记录不存在
    }
    console.error("Error fetching store:", error);
    throw new Error("Failed to fetch store");
  }

  return data;
}

// 创建新门店
export async function createStore(store: CreateStore): Promise<Store> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("store")
    .insert(store)
    .select()
    .single();

  if (error) {
    console.error("Error creating store:", error);
    throw new Error("Failed to create store");
  }

  return data;
}

// 更新门店
export async function updateStore(
  id: number,
  updates: UpdateStore
): Promise<Store> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("store")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating store:", error);
    throw new Error("Failed to update store");
  }

  return data;
}

// 删除门店
export async function deleteStore(id: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("store").delete().eq("id", id);

  if (error) {
    console.error("Error deleting store:", error);
    throw new Error("Failed to delete store");
  }
}

// 检查门店名称是否已存在
export async function isStoreNameExists(
  name: string,
  excludeId?: number
): Promise<boolean> {
  const supabase = await createClient();
  let query = supabase.from("store").select("id").eq("name", name);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error checking store name:", error);
    throw new Error("Failed to check store name");
  }

  return (data || []).length > 0;
}
