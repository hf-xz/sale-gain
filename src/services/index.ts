// 统一导出所有数据库服务
export * from "./types";
export * from "./storeService";
export * from "./metricService";
export * from "./recordService";

/**
 * 获取所有门店及其指标以及最新记录的完整信息
 */
import { getAllStores } from "./storeService";
import { getMetricsByStoreId } from "./metricService";
import { getRecordByMetricAndDate } from "./recordService";
import { Metric } from "./types";

async function getMetricsWithTodayRecord(metrics: Metric[], today: string) {
  return await Promise.all(
    metrics.map(async (metric) => {
      const todayRecord = await getRecordByMetricAndDate(metric.id, today);
      return {
        ...metric,
        todayRecord,
      };
    })
  );
}

export async function getStoresWithTodayInfo() {
  const today = new Date().toISOString().split("T")[0]; // 获取今天的日期

  const stores = await getAllStores();
  const todayInfo = await Promise.all(
    stores.map(async (store) => {
      const metrics = await getMetricsByStoreId(store.id).then(
        async (metrics) => {
          return await getMetricsWithTodayRecord(metrics, today);
        }
      );
      return {
        ...store,
        metrics: metrics || [],
      };
    })
  );

  return todayInfo;
}
