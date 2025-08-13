import { createClient } from "@/lib/supabase/server";
import {
  SalesOverviewCards,
  SalesRecordsCard,
  QuickActionsCard,
} from "./components";

export async function HomeContent() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="text-4xl font-bold mb-4">欢迎使用销售利润管理系统</h1>
        <p className="text-lg text-muted-foreground mb-8">
          请先登录以访问您的销售数据和利润分析
        </p>
        <p className="text-sm text-muted-foreground">
          👆 请点击页面右上角的登录按钮
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto p-4">
      {/* 门店概览 */}
      <SalesOverviewCards />

      {/* 数据记录 */}
      <SalesRecordsCard />

      {/* 快速操作 */}
      <QuickActionsCard />
    </div>
  );
}
