import { createClient } from "@/lib/supabase/server";
import type { Metric, CreateMetric, UpdateMetric } from "./types";

/**
 * Metric 服务 - 包含所有与 metric 表相关的数据库操作
 */

const TABLE_NAME = "metric";

// 获取所有指标
export async function getAllMetrics(): Promise<Metric[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching metrics:", error);
    throw new Error("Failed to fetch metrics");
  }

  return data || [];
}

// 根据门店ID获取指标
export async function getMetricsByStoreId(storeId: number): Promise<Metric[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("store_id", storeId)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching metrics by store:", error);
    throw new Error("Failed to fetch metrics");
  }

  return data || [];
}

// 根据类型获取指标
export async function getMetricsByType(
  type: string,
  storeId?: number
): Promise<Metric[]> {
  const supabase = await createClient();
  let query = supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("type", type)
    .eq("is_active", true);

  if (storeId) {
    query = query.eq("store_id", storeId);
  }

  const { data, error } = await query.order("display_order", {
    ascending: true,
  });

  if (error) {
    console.error("Error fetching metrics by type:", error);
    throw new Error("Failed to fetch metrics");
  }

  return data || [];
}

// 根据 ID 获取指标
export async function getMetricById(id: number): Promise<Metric | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching metric:", error);
    throw new Error("Failed to fetch metric");
  }

  return data;
}

// 创建新指标
export async function createMetric(metric: CreateMetric): Promise<Metric> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(metric)
    .select()
    .single();

  if (error) {
    console.error("Error creating metric:", error);
    throw new Error("Failed to create metric");
  }

  return data;
}

// 更新指标
export async function updateMetric(
  id: number,
  updates: UpdateMetric
): Promise<Metric> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating metric:", error);
    throw new Error("Failed to update metric");
  }

  return data;
}

// 删除指标（软删除 - 设置为不活跃）
export async function deleteMetric(id: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({ is_active: false })
    .eq("id", id);

  if (error) {
    console.error("Error deleting metric:", error);
    throw new Error("Failed to delete metric");
  }
}

// 永久删除指标
export async function permanentDeleteMetric(id: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

  if (error) {
    console.error("Error permanently deleting metric:", error);
    throw new Error("Failed to permanently delete metric");
  }
}

// 更新指标显示顺序
export async function updateMetricDisplayOrder(
  id: number,
  displayOrder: number
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({ display_order: displayOrder })
    .eq("id", id);

  if (error) {
    console.error("Error updating metric display order:", error);
    throw new Error("Failed to update metric display order");
  }
}

// 批量更新指标显示顺序
export async function batchUpdateMetricDisplayOrder(
  updates: { id: number; display_order: number }[]
): Promise<void> {
  const supabase = await createClient();

  const promises = updates.map((update) =>
    supabase
      .from(TABLE_NAME)
      .update({ display_order: update.display_order })
      .eq("id", update.id)
  );

  const results = await Promise.all(promises);

  for (const result of results) {
    if (result.error) {
      console.error("Error in batch update:", result.error);
      throw new Error("Failed to batch update metric display order");
    }
  }
}
