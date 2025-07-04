import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex-1 flex gap-5 items-center font-semibold">
              <Link href={"/"}>销售利润</Link>
            </div>
            <ThemeSwitcher />
            <AuthButton />
          </div>
        </nav>
        <main className="flex-1 flex flex-col gap-6 px-4 w-full"></main>
      </div>
    </main>
  );
}
