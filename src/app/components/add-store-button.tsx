import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

    if (typeof storeName !== "string" || !storeName.trim()) {
      throw new Error("Invalid store name");
    }

    try {
      await createStore({ name: storeName.trim() });
      revalidatePath("/"); // 根据需要调整路径
    } catch (error) {
      console.error("Failed to create store:", error);
      throw new Error("Failed to create store");
    }
  }

  return (
    <Dialog>
      <Button {...props}>{text}</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Store</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit}>
          <div>
            <Input name="storeName" placeholder="Enter store name" required />
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
