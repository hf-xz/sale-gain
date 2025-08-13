import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function QuickActionsCard() {
  const quickActions = [
    {
      icon: "📝",
      title: "录入指标数据",
      description: "为门店指标添加新的数据记录",
      color:
        "bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800",
    },
    {
      icon: "🏪",
      title: "管理门店",
      description: "添加、编辑或删除门店信息",
      color:
        "bg-green-50 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800",
    },
    {
      icon: "📊",
      title: "配置指标",
      description: "设置门店的业务指标和计算公式",
      color:
        "bg-purple-50 hover:bg-purple-100 dark:bg-purple-900 dark:hover:bg-purple-800",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>快速操作</CardTitle>
        <CardDescription>常用功能快捷入口，提高工作效率</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 md:flex-row">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`w-full p-3 rounded-lg border text-left transition-all duration-200 ${action.color}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{action.icon}</span>
                  <div>
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
