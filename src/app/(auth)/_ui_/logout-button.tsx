"use client";
import { ErrorToast, SuccessToast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import { useSignOutMutation } from "@/query-calls/auth-query-calls";
import { Loader2, LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";

export function LogOutButton() {
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
      <Button
        className="text-xs w-full bg-transparent hover:bg-transparent h-3 flex items-center"
        type="submit"
      >
        {isPending ? (
          <Loader2 size={30} className="animate-spin duration-[370ms]" />
        ) : (
          <div className="text-sm flex items-center gap-2">
            <LogOutIcon />
            <span>Logout</span>
          </div>
        )}
      </Button>
    </form>
  );
}
