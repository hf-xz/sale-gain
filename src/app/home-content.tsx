import { createClient } from "@/lib/supabase/server";
import {
  SalesOverviewCards,
  SalesRecordsCard,
  ProfitAnalysisCard,
  QuickActionsCard,
  SystemStatusCard,
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
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">销售利润管理系统</h1>
        <p className="text-lg text-muted-foreground">欢迎回来，{user.email}</p>
      </div>

      <SalesOverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesRecordsCard />
        <ProfitAnalysisCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActionsCard />
        <SystemStatusCard />
      </div>
    </div>
  );
}
