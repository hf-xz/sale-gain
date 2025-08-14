import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Record {
  id: number;
  metricName: string;
  storeName: string;
  value: number;
  unit: string;
  date: string;
  time: string;
}

export function SalesRecordsCard({ records }: { records: Record[] }) {
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
          {records.slice(0, 5).map((record) => (
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
