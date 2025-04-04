"use client";
import { ErrorToast, SuccessToast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import { useSignOutMutation } from "@/query-calls/auth-query-calls";
import { Loader2, LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";

export function LogOut() {
  const { isPending, mutateAsync } = useSignOutMutation();
  const handleLogOut = async () => {
    const res = await mutateAsync();
    if (res.isSuccess) {
      SuccessToast(res.Message);
      redirect("/signin");
    } else {
      ErrorToast(res.Message);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        // Prevent default behaviour
        e.preventDefault();
        // Calling the Logout function
        handleLogOut();
      }}
    >
      <Button variant={"appButton"} className="text-xs w-full" type="submit">
        {isPending ? (
          <Loader2 size={30} className="animate-spin duration-[370ms]" />
        ) : (
          <div className="text-sm flex items-center gap-2 text-primary-foreground">
            <LogOutIcon />
            <span>Logout</span>
          </div>
        )}
      </Button>
    </form>
  );
}
