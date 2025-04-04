import { SignInForm } from "@/app/(auth)/_ui_/sign-in-form";
import { auth } from "@/server/lucia/lucia";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session && session?.session?.id) {
    redirect("/");
  }
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </main>
  );
}
