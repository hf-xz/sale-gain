import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface Store {
  id: number;
  name: string;
  description?: string;
  totalMetrics: number;
  todayRecords: number;
}

interface SalesOverviewCardsProps {
  stores: Store[];
}

export function SalesOverviewCards({ stores }: SalesOverviewCardsProps) {
  // 判断是否完成今日记录
  const isCompleted = (todayRecords: number, totalMetrics: number) => {
    return todayRecords === totalMetrics;
  };

  return (
    <div className="space-y-6">
      {/* 门店概览 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">门店概览</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <Card
              key={store.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
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
                    <Badge variant="outline" className="text-orange-600">
                      未完成 ({store.todayRecords}/{store.totalMetrics})
                    </Badge>
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
