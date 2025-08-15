import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cartInfo } from "@/state/cart";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";

export default function CartListPopup() {
  const { current } = cartInfo();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="relative z-10 bg-black/30 hover:bg-black/40">
          <ShoppingCart />
          <Badge>{current.length}</Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex overflow-y-auto flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Cart Items
          </DialogTitle>
          {current.length > 0 &&
            current.map((item, index) => (
              <div key={index}>
                <DialogDescription asChild>
                  <div className="px-6 py-4">
                    <div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
                      <div className="space-y-1">
                        <p>
                          <strong>{item.title}</strong>
                        </p>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </div>
            ))}
          <DialogFooter className="px-6 pb-6 sm:justify-start">
            <DialogClose asChild>
              <Button type="button">Buy Now</Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
