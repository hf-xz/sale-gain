"use server";

import { upsertRecord } from "@/services";
import { revalidatePath } from "next/cache";

export async function submitRecords(formData: FormData) {
  const today = new Date().toISOString().split("T")[0];

  // 收集所有的记录数据
  const recordsToSubmit = [];

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("metric_") && value !== "") {
      const metricId = parseInt(key.replace("metric_", ""));
      const numericValue = parseFloat(value.toString());

      if (!isNaN(numericValue)) {
        recordsToSubmit.push({
          metric_id: metricId,
          date: today,
          value: numericValue,
        });
      }
    }
  }

  // 批量提交记录
  try {
    for (const record of recordsToSubmit) {
      await upsertRecord(record);
    }

    revalidatePath("/");
    return { success: true, message: "记录提交成功" };
  } catch (error) {
    console.error("Failed to submit records:", error);
    throw new Error("提交记录失败");
  }
}
