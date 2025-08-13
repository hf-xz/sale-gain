import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProfitAnalysisCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>利润分析</CardTitle>
        <CardDescription>利润率趋势图表</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-8">
          暂无数据可分析
        </div>
      </CardContent>
    </Card>
  );
}
