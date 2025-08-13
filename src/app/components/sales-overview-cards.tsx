import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SalesOverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>今日销售</CardTitle>
          <CardDescription>今日销售概况</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">¥0.00</div>
          <p className="text-xs text-muted-foreground">较昨日 +0%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>今日利润</CardTitle>
          <CardDescription>今日净利润</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">¥0.00</div>
          <p className="text-xs text-muted-foreground">较昨日 +0%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>本月总计</CardTitle>
          <CardDescription>本月销售总额</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">¥0.00</div>
          <p className="text-xs text-muted-foreground">较上月 +0%</p>
        </CardContent>
      </Card>
    </div>
  );
}
