import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SalesRecordsCard() {
  // 模拟最新记录数据 - 实际使用时将从服务获取
  const mockRecords = [
    {
      id: 1,
      metricName: "日销售额",
      storeName: "主店",
      value: 12500,
      unit: "元",
      date: "2025-08-13",
      time: "14:30",
    },
    {
      id: 2,
      metricName: "客流量",
      storeName: "分店A",
      value: 156,
      unit: "人",
      date: "2025-08-13",
      time: "14:15",
    },
    {
      id: 3,
      metricName: "平均客单价",
      storeName: "主店",
      value: 80.12,
      unit: "元",
      date: "2025-08-13",
      time: "14:00",
    },
    {
      id: 4,
      metricName: "库存商品数",
      storeName: "分店B",
      value: 245,
      unit: "件",
      date: "2025-08-13",
      time: "13:45",
    },
    {
      id: 5,
      metricName: "成本支出",
      storeName: "主店",
      value: 3200,
      unit: "元",
      date: "2025-08-13",
      time: "13:30",
    },
  ];

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>最近记录</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockRecords.slice(0, 10).map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="mb-1">
                  <span className="font-medium">{record.metricName}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {record.storeName} • {record.time}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">
                  {record.value.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {record.unit}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <button className="w-full text-sm text-center text-muted-foreground hover:text-foreground transition-colors">
            查看所有记录 →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
