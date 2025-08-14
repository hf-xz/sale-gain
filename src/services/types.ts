// 数据库类型定义
export interface Store {
  id: number;
  created_at: string;
  name: string;
  description?: string;
}

export interface Metric {
  id: number;
  created_at: string;
  name: string;
  type: string;
  store_id: number;
  unit?: string;
  formula?: string;
  is_calculated: boolean;
  display_order: number;
  is_active: boolean;
}

export interface Record {
  id: number;
  created_at: string;
  metric_id: number;
  date: string;
  value: number;
  note?: string;
}

// 创建和更新时的类型（不包含自动生成的字段）
export type CreateStore = Omit<Store, "id" | "created_at">;
export type UpdateStore = Partial<CreateStore>;

export type CreateMetric = Omit<Metric, "id" | "created_at">;
export type UpdateMetric = Partial<CreateMetric>;

export type CreateRecord = Omit<Record, "id" | "created_at">;
export type UpdateRecord = Partial<CreateRecord>;

// 业务逻辑相关的类型
export interface MetricWithTodayRecord extends Metric {
  todayRecord: Record | null;
}
export interface StoreWithTodayInfo extends Store {
  metrics: MetricWithTodayRecord[];
}