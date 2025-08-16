"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cartInfo } from "@/state/cart";
import {
  ShoppingCart,
  CreditCard,
  Calendar,
  Lock,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

interface CheckoutModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CheckoutModal({
  isOpen,
  onOpenChange,
}: CheckoutModalProps) {
  const { current: cartItems, ClearCart } = cartInfo();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.currentPrice || item.price || 0),
    0,
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePurchase = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsProcessing(false);
      setIsSuccess(true);

      // Clear cart after successful purchase
      setTimeout(() => {
        ClearCart();
        setIsSuccess(false);
        onOpenChange?.(false);
        setFormData({
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        });
      }, 3000);
    } catch (error) {
      setIsProcessing(false);
      console.error("Purchase failed:", error);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md w-full">
          <div className="text-center space-y-4 py-8">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-green-600">
                Purchase Successful!
              </h2>
              <p className="text-muted-foreground">
                Your games will be available in your library shortly.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 p-6 border-b">
          <div className="space-y-1">
            <DialogTitle className="text-2xl text-white">Checkout</DialogTitle>
            <p className="text-gray-400">
              Complete your purchase to get access to your games.
            </p>
          </div>
        </DialogHeader>

        {cartItems.length > 0 ? (
          <ScrollArea className="max-h-[calc(90vh-120px)]">
            <div className="p-6 space-y-8">
              {/* Order Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                  <CreditCard className="h-5 w-5" />
                  Order Summary
                </h3>
                <ScrollArea className="max-h-[200px] flex items-center flex-col">
                  <div className="space-y-3 pr-4">
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg"
                      >
                        <Image
                          src={item.src || ""}
                          alt={item.title || "Game"}
                          width={80}
                          height={45}
                          className="object-cover aspect-video rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-white truncate">
                            {item.title}
                          </h4>
                          <Badge
                            variant="secondary"
                            className="text-xs mt-1 bg-purple-600/50 text-white"
                          >
                            Digital Download
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm text-white">
                            ${(item.currentPrice || item.price || 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                  <span className="text-lg font-semibold text-white">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-purple-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                  <Lock className="h-5 w-5" />
                  Payment Details
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="cardNumber"
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <CreditCard className="h-4 w-4" />
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", e.target.value)
                      }
                      className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="expiry"
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <Calendar className="h-4 w-4" />
                        Expiry Date
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) =>
                          handleInputChange("expiryDate", e.target.value)
                        }
                        className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="cvv"
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <Lock className="h-4 w-4" />
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) =>
                          handleInputChange("cvv", e.target.value)
                        }
                        className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePurchase}
                  disabled={
                    isProcessing ||
                    !formData.cardNumber ||
                    !formData.expiryDate ||
                    !formData.cvv
                  }
                  className="w-full h-12 text-lg font-semibold bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Processing...
                    </div>
                  ) : (
                    `Complete Purchase - $${totalPrice.toFixed(2)}`
                  )}
                </Button>

                <div className="text-center text-sm text-gray-400">
                  <p className="flex items-center justify-center gap-1">
                    <Lock className="h-3 w-3" />
                    Secure checkout powered by industry-standard encryption
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
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
  );
}
