import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SalesRecordsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最近销售记录</CardTitle>
        <CardDescription>最新的销售交易记录</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-8">
          暂无销售记录
        </div>
      </CardContent>
    </Card>
  );
}
