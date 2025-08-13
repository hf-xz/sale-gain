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
import { Input } from "@/components/ui/input";
import { createStore } from "@/services";
import { revalidatePath } from "next/cache";

export async function AddStoreButton({
  text = "添加门店",
  ...props
}: { text?: string } & ButtonProps) {
  async function handleSubmit(formData: FormData) {
    "use server";

    const storeName = formData.get("storeName");
    const description = formData.get("description");

    if (typeof storeName !== "string" || !storeName.trim()) {
      throw new Error("Invalid store name");
    }

    try {
      await createStore({
        name: storeName.trim(),
        description: description?.toString().trim() || undefined,
      });
      revalidatePath("/"); // 根据需要调整路径
    } catch (error) {
      console.error("Failed to create store:", error);
      throw new Error("Failed to create store");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>{text}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>添加门店</DialogTitle>
        </DialogHeader>

        <form id="add-store-form" action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Input name="storeName" placeholder="输入门店名称" required />
            <Input name="description" placeholder="输入门店描述（可选）" />
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
          <Button type="submit" form={"add-store-form"}>
            添加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
