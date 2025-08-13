import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SystemStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>系统状态</CardTitle>
        <CardDescription>账户和系统信息</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span>账户状态</span>
          <span className="text-green-500">活跃</span>
        </div>
        <div className="flex justify-between">
          <span>数据同步</span>
          <span className="text-green-500">已同步</span>
        </div>
        <div className="flex justify-between">
          <span>存储使用</span>
          <span>15%</span>
        </div>
        <div className="flex justify-between">
          <span>最后登录</span>
          <span className="text-sm text-muted-foreground">刚刚</span>
        </div>
      </CardContent>
    </Card>
  );
}
