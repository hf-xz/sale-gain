import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddRecordButton } from "./add-record-button";
import { StoreWithTodayInfo } from "@/services";

interface QuickActionsCardProps {
  stores: StoreWithTodayInfo[];
}

export function QuickActionsCard({ stores }: QuickActionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>快速操作</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 md:flex-row">
          <AddRecordButton asChild stores={stores}>
            <button className="flex-1 w-full p-3 rounded-lg border text-left transition-all duration-200 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800">
              <div className="flex items-center gap-3">
                <span className="text-xl">📝</span>
                <div>
                  <div className="font-medium">修改记录</div>
                  <div className="text-sm text-muted-foreground">
                    为门店指标添加新的数据记录
                  </div>
                </div>
              </div>
            </button>
          </AddRecordButton>

          <button className="flex-1 w-full p-3 rounded-lg border text-left transition-all duration-200 bg-green-50 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏪</span>
              <div>
                <div className="font-medium">管理门店</div>
                <div className="text-sm text-muted-foreground">
                  添加、编辑或删除门店信息
                </div>
              </div>
            </div>
          </button>

          <button className="flex-1 w-full p-3 rounded-lg border text-left transition-all duration-200 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900 dark:hover:bg-purple-800">
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <div>
                <div className="font-medium">配置指标</div>
                <div className="text-sm text-muted-foreground">
                  设置门店的业务指标和计算公式
                </div>
              </div>
            </div>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
