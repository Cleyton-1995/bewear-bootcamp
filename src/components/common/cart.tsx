"use client";

import { ShoppingBag, ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

export const Cart = () => {
  const { data: cart } = useCart();
  const isEmpty = !cart?.items || cart.items.length === 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button id="cart-button" variant="outline" size="icon">
          <ShoppingBag />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex h-full flex-col px-5">
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-8 py-5">
              {isEmpty ? (
                <p className="text-muted-foreground text-center text-sm">
                  Seu carrinho está vazio.
                </p>
              ) : (
                [...cart.items]
                  .sort((a, b) => {
                    // Ordena do mais recente para o mais antigo
                    const timeA = new Date(a.createdAt).getTime();
                    const timeB = new Date(b.createdAt).getTime();
                    return timeB - timeA;
                  })
                  .map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      productVariantId={item.productVariant.id}
                      productName={item.productVariant.product.name}
                      productVariantName={item.productVariant.name}
                      productVariantImageUrl={item.productVariant.imageUrl}
                      productVariantPriceInCents={
                        item.productVariant.priceInCents
                      }
                      quantity={item.quantity}
                    />
                  ))
              )}
            </div>
          </ScrollArea>
        </div>

        {!isEmpty && (
          <div className="bg-background border-muted-foreground/20 mt-[-15px] flex flex-shrink-0 flex-col gap-4 px-5 pb-5">
            <Separator />

            <div className="flex items-center justify-between text-xs font-medium">
              <p>Subtotal</p>
              <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs font-medium">
              <p>Entrega</p>
              <p>GRÁTIS</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs font-medium">
              <p>Total</p>
              <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
            </div>

            <Button className="mt-2 w-full rounded-full" asChild>
              <Link href="/cart/identification">Finalizar compra</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
