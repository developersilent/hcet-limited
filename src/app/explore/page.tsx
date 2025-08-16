"use client";
import { NavUser } from "@/components/avatar/fallback";
// import CartListPopup from "@/components/cartlist-popup";
import { YourGames } from "@/components/pages/games";
import { Store2 } from "@/components/pages/store2";
import ShimmerText from "@/components/shimmer-text";
import { ErrorToast, SuccessToast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/use-session";
import { useSignOutMutation } from "@/query-calls/auth-query-calls";
// import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AllTabs = "games" | "store";

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AllTabs>("games");
  const { session, user, loading } = useSession();
  const { isPending, mutateAsync } = useSignOutMutation();
  useEffect(() => {
    if (!loading && (!session?.id || !user)) {
      router.push("/signin");
    }
  }, [session, user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ShimmerText text="HCET" className="font-clash-display" />
      </div>
    );
  }

  if (!session?.id || !user) {
    return null;
  }

  const handleLogOut = async () => {
    const res = await mutateAsync();
    if (res.isSuccess) {
      SuccessToast(res.Message);
      router.push("/signin");
    } else {
      ErrorToast(res.Message);
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      <header className="font-clash-display p-2 py-5 top-0 left-0 right-0 bg-transparent w-full z-50 fixed flex items-center justify-between">
        <div>
          <Button
            onClick={() => setActiveTab("games")}
            variant={"link"}
            className={`${activeTab === "games" ? "text-purple-400/90" : "text-white/80"} text-base relative z-10`}
          >
            Games
          </Button>
          <Button
            onClick={() => setActiveTab("store")}
            variant={"link"}
            className={`${activeTab === "store" ? "text-purple-400/90" : "text-white/80"} text-base relative z-10`}
          >
            Store
          </Button>
        </div>
        <div className="px-5 flex items-center justify-center gap-1">
          <NavUser
            user={{
              email: user.data.email,
            }}
            handleLogOut={handleLogOut}
          />
          {/* <div className="relative">
            <ShoppingCart className="w-5 h-5 text-purple-100" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
                {items.length}
              </span>
            )}
          </div> */}
        </div>
      </header>
      {activeTab === "games" && (
        <>
          <YourGames />
        </>
      )}
      {activeTab === "store" && (
        <>
          <Store2 />
        </>
      )}
      {isPending && (
        <div className="flex items-center justify-center min-h-screen absolute top-0 w-full bg-black/90">
          <ShimmerText text="HCET" className="font-clash-display" />
        </div>
      )}
    </div>
  );
}
