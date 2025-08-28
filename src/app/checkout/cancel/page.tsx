"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const CheckoutCancelPage = () => {
  return (
    <>
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="Cancel"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl text-red-600">
            Pedido cancelado!
          </DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi cancelado. Se desejar, você pode realizar uma nova
            compra.
          </DialogDescription>

          <DialogFooter className="flex flex-col gap-4 lg:flex-col">
            <Button
              className="rounded-full"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/my-orders">Ver meus pedidos</Link>
            </Button>
            <Button className="rounded-full" size="lg" asChild>
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutCancelPage;
