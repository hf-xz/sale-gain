import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddRecordButton } from "./add-record-button";
import React from "react";
import { StoreWithTodayInfo } from "@/services";

interface SalesOverviewCardsProps {
  stores: StoreWithTodayInfo[];
}

export function SalesOverviewCards({ stores }: SalesOverviewCardsProps) {
  // 统计 totalMetrics 和 todayRecords
  const storesWithCount = stores.map((store) => {
    const totalMetrics = store.metrics.length;
    const todayRecords = store.metrics.reduce(
      (count, metric) => count + (metric.todayRecord ? 1 : 0),
      0
    );

    return {
      ...store,
      totalMetrics,
      todayRecords,
    };
  });

  // 判断是否完成今日记录
  const isCompleted = (todayRecords: number, totalMetrics: number) => {
    return todayRecords === totalMetrics;
  };

  return (
    <div className="space-y-6">
      {/* 门店概览 */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {storesWithCount.map((store) => (
            <Card key={store.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{store.name}</CardTitle>
                <CardDescription>{store.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">今日记录</span>
                  {isCompleted(store.todayRecords, store.totalMetrics) ? (
                    <Badge variant="outline" className="text-green-600">
                      已完成
                    </Badge>
                  ) : (
                    <AddRecordButton
                      asChild
                      stores={stores}
                      selectedStore={store}
                    >
                      <Badge
                        variant="outline"
                        className="text-orange-600 cursor-pointer "
                      >
                        未完成 ({store.todayRecords}/{store.totalMetrics})
                      </Badge>
                    </AddRecordButton>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
