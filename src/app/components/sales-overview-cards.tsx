import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SalesOverviewCards() {
  // 模拟门店数据 - 实际使用时将从服务获取
  const mockStores = [
    {
      id: 1,
      name: "主店",
      description: "总店",
      totalMetrics: 8,
      todayRecords: 8,
    },
    {
      id: 2,
      name: "分店A",
      description: "商业区分店",
      totalMetrics: 6,
      todayRecords: 5,
    },
    {
      id: 3,
      name: "分店B",
      description: "居民区分店",
      totalMetrics: 5,
      todayRecords: 5,
    },
  ];

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
          {mockStores.map((store) => (
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
