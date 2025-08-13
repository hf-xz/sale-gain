// 统一导出所有数据库服务
export * from "./types";
export * from "./storeService";
export * from "./metricService";
export * from "./recordService";

// 可以在这里添加一些组合服务或工具函数

/**
 * 获取门店及其指标的完整信息
 */
import { getStoreById } from "./storeService";
import { getMetricsByStoreId } from "./metricService";

export async function getStoreWithMetrics(storeId: number) {
  const [store, metrics] = await Promise.all([
    getStoreById(storeId),
    getMetricsByStoreId(storeId),
  ]);

  return {
    store,
    metrics,
  };
}

/**
 * 获取指标及其最新记录
 */
import { getMetricById } from "./metricService";
import { getLatestRecordByMetricId, getRecordStats } from "./recordService";

export async function getMetricWithLatestRecord(metricId: number) {
  const [metric, latestRecord, stats] = await Promise.all([
    getMetricById(metricId),
    getLatestRecordByMetricId(metricId),
    getRecordStats(metricId),
  ]);

  return {
    metric,
    latestRecord,
    stats,
  };
}
