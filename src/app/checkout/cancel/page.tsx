"use client";

import { XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/common/header";
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
      <Header />

      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
            <XCircle className="h-12 w-12 text-red-600" aria-hidden="true" />
          </div>

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
            <Button className="w-full rounded-full" size="lg" asChild>
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutCancelPage;
