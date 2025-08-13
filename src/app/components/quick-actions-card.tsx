import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function QuickActionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>快速操作</CardTitle>
        <CardDescription>常用功能快捷入口</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <button className="w-full text-left p-2 rounded hover:bg-muted">
          📝 添加新销售记录
        </button>
        <button className="w-full text-left p-2 rounded hover:bg-muted">
          📊 查看详细报表
        </button>
        <button className="w-full text-left p-2 rounded hover:bg-muted">
          🏪 管理商品信息
        </button>
        <button className="w-full text-left p-2 rounded hover:bg-muted">
          👥 客户管理
        </button>
      </CardContent>
    </Card>
  );
}
