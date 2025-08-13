import { createClient } from "@/lib/supabase/server";
import type { Record, CreateRecord, UpdateRecord } from "./types";

/**
 * Record 服务 - 包含所有与 record_new 表相关的数据库操作
 */

// 获取所有记录
export async function getAllRecords(): Promise<Record[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("record_new")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching records:", error);
    throw new Error("Failed to fetch records");
  }

  return data || [];
}

// 根据指标ID获取记录
export async function getRecordsByMetricId(
  metricId: number
): Promise<Record[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("record_new")
    .select("*")
    .eq("metric_id", metricId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching records by metric:", error);
    throw new Error("Failed to fetch records");
  }

  return data || [];
}

// 根据日期范围获取记录
export async function getRecordsByDateRange(
  startDate: string,
  endDate: string,
  metricId?: number
): Promise<Record[]> {
  const supabase = await createClient();
  let query = supabase
    .from("record_new")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDate);

  if (metricId) {
    query = query.eq("metric_id", metricId);
  }

  const { data, error } = await query.order("date", { ascending: false });

  if (error) {
    console.error("Error fetching records by date range:", error);
    throw new Error("Failed to fetch records");
  }

  return data || [];
}

// 根据指标ID和日期获取特定记录
export async function getRecordByMetricAndDate(
  metricId: number,
  date: string
): Promise<Record | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("record_new")
    .select("*")
    .eq("metric_id", metricId)
    .eq("date", date)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching record:", error);
    throw new Error("Failed to fetch record");
  }

  return data;
}

// 根据 ID 获取记录
export async function getRecordById(id: number): Promise<Record | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("record_new")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching record:", error);
    throw new Error("Failed to fetch record");
  }

  return data;
}

// 创建新记录
export async function createRecord(record: CreateRecord): Promise<Record> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("record_new")
    .insert(record)
    .select()
    .single();

  if (error) {
    console.error("Error creating record:", error);
    throw new Error("Failed to create record");
  }

  return data;
}

// 批量创建记录
export async function createRecords(
  records: CreateRecord[]
): Promise<Record[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("record_new")
    .insert(records)
    .select();

  if (error) {
    console.error("Error creating records:", error);
    throw new Error("Failed to create records");
  }

  return data || [];
}

// 更新记录
export async function updateRecord(
  id: number,
  updates: UpdateRecord
): Promise<Record> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("record_new")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating record:", error);
    throw new Error("Failed to update record");
  }

  return data;
}

// 更新或创建记录（upsert）
export async function upsertRecord(record: CreateRecord): Promise<Record> {
  // 首先尝试查找现有记录
  const existing = await getRecordByMetricAndDate(
    record.metric_id,
    record.date
  );

  if (existing) {
    // 如果存在，更新记录
    return updateRecord(existing.id, {
      value: record.value,
      note: record.note,
    });
  } else {
    // 如果不存在，创建新记录
    return createRecord(record);
  }
}

// 删除记录
export async function deleteRecord(id: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("record_new").delete().eq("id", id);

  if (error) {
    console.error("Error deleting record:", error);
    throw new Error("Failed to delete record");
  }
}

// 删除指标的所有记录
export async function deleteRecordsByMetricId(metricId: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("record_new")
    .delete()
    .eq("metric_id", metricId);

  if (error) {
    console.error("Error deleting records by metric:", error);
    throw new Error("Failed to delete records");
  }
}

// 获取指标的最新记录
export async function getLatestRecordByMetricId(
  metricId: number
): Promise<Record | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("record_new")
    .select("*")
    .eq("metric_id", metricId)
    .order("date", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching latest record:", error);
    throw new Error("Failed to fetch latest record");
  }

  return data;
}

// 获取指标的记录统计
export async function getRecordStats(metricId: number): Promise<{
  count: number;
  sum: number;
  avg: number;
  min: number;
  max: number;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("record_new")
    .select("value")
    .eq("metric_id", metricId);

  if (error) {
    console.error("Error fetching record stats:", error);
    throw new Error("Failed to fetch record stats");
  }

  const values = (data || []).map((r) => Number(r.value));

  if (values.length === 0) {
    return { count: 0, sum: 0, avg: 0, min: 0, max: 0 };
  }

  const sum = values.reduce((acc, val) => acc + val, 0);
  const avg = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  return {
    count: values.length,
    sum,
    avg,
    min,
    max,
  };
}
