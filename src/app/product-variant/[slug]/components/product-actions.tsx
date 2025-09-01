"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Quantidade</h3>
        <div className="flex w-[120px] items-center justify-between rounded-xl border">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Diminuir"
          >
            <MinusIcon />
          </Button>
          <p className="w-8 text-center text-sm font-semibold">{quantity}</p>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Aumentar"
          >
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div className="mx-auto flex flex-col space-y-4 px-5 md:mx-0 md:ml-[-18px]">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button className="rounded-full" size="lg">
          Comprar agora
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
