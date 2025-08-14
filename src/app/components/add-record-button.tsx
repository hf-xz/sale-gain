"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState, FormEvent, useTransition } from "react";
import { submitRecords } from "../actions";
import { StoreWithTodayInfo } from "@/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddRecordButtonProps extends ButtonProps {
  text?: string;
  stores: StoreWithTodayInfo[];
  selectedStore?: StoreWithTodayInfo; // 新增可选的 selectedStore prop
}

export function AddRecordButton({
  text = "添加记录",
  stores,
  selectedStore: preSelectedStore, // 解构新增的 selectedStore prop
  asChild = false,
  ...props
}: AddRecordButtonProps & { asChild?: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(
    preSelectedStore ? preSelectedStore.id : null
  );

  const selectedStore =
    preSelectedStore || stores.find((store) => store.id === selectedStoreId); // 优先使用传入的 selectedStore

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);

    startTransition(() => {
      void submitRecords(fd)
        .then(() => {
          setOpen(false);
        })
        .catch((error) => {
          console.error("Failed to submit records:", error);
        });
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && !preSelectedStore) {
      // 清理逻辑无需处理 selectedStoreId
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild={asChild}>
        {asChild ? props.children : <Button {...props}>{text}</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            添加记录{selectedStore ? ` - ${selectedStore.name}` : ""}
          </DialogTitle>
        </DialogHeader>

        <form id="add-record-form" onSubmit={handleSubmit}>
          {/* Hidden input for store ID */}
          {selectedStore && (
            <input type="hidden" name="store_id" value={selectedStore.id} />
          )}
          <div className="flex flex-col gap-6">
            {/* 门店选择 */}
            {!!!preSelectedStore && (
              <div className="space-y-2">
                <Label htmlFor="store-select">选择门店</Label>
                <Select
                  value={selectedStoreId?.toString() || ""}
                  onValueChange={(value) =>
                    setSelectedStoreId(value ? parseInt(value) : null)
                  }
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="请选择门店" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.id.toString()}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* 指标输入 */}
            {selectedStore && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  {selectedStore.metrics
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((metric) => (
                      <div key={metric.id} className="space-y-2">
                        <Label htmlFor={`metric_${metric.id}`}>
                          {metric.name}
                          {metric.unit && (
                            <span className="text-gray-500 ml-1">
                              ({metric.unit})
                            </span>
                          )}
                        </Label>
                        <Input
                          id={`metric_${metric.id}`}
                          name={`metric_${metric.id}`}
                          type="number"
                          step="0.01"
                          inputMode="decimal"
                          pattern="[0-9]*"
                          disabled={metric.is_calculated}
                          placeholder={
                            metric.todayRecord
                              ? `当前值: ${metric.todayRecord.value}`
                              : "请输入数值"
                          }
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              取消
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="add-record-form"
            disabled={!selectedStore || isPending}
          >
            {isPending ? "提交中..." : "提交"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
