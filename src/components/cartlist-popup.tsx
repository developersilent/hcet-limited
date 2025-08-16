"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cartInfo } from "@/state/cart";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import CheckoutModal from "./checkout-modal";

export default function CartListPopup() {
  const { current: cartItems, RemoveFromCart } = cartInfo();
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.currentPrice || item.price || 0),
    0,
  );

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-5 h-5 text-purple-100" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
          <DialogHeader className="space-y-0">
            <DialogTitle className="border-b px-6 py-4 text-base">
              Cart Items ({cartItems.length})
            </DialogTitle>
          </DialogHeader>

          {cartItems.length > 0 ? (
            <>
              <ScrollArea className="flex flex-col h-[300px] px-6">
                <div className="py-4 space-y-2">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-3 bg-muted/20 rounded-lg"
                    >
                      <div className="w-[250px]">
                        <Image
                          src={item.src || ""}
                          alt={item.title || "Game"}
                          width={250}
                          height={150}
                          className="object-cover aspect-video rounded h-full"
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h3 className="font-semibold text-sm truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1 max-w-xs">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-green-600">
                            ${(item.currentPrice || item.price || 0).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => RemoveFromCart(item)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t px-6 py-4 space-y-4">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total:</span>
                  <span className="text-lg text-green-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <DialogFooter className="gap-2 sm:gap-2">
                  <DialogClose asChild>
                    <Button variant="outline" className="flex-1">
                      Continue Shopping
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      onClick={() => setShowCheckout(true)}
                    >
                      Checkout
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Add some games to get started!
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={showCheckout} onOpenChange={setShowCheckout} />
    </>
  );
}
