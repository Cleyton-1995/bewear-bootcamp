"use client";

import { Package2 } from "lucide-react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orderTable } from "@/db/schema";

interface OrderItem {
  id: string;
  imageUrl: string;
  productName: string;
  productVariantName: string;
  quantity: number;
  priceInCents: number;
  createdAt: Date | string | number;
}

interface OrderUI {
  createdAt: string | number | Date;
  id: string;
  totalPriceInCents: number;
  status: (typeof orderTable.$inferInsert)["status"];
  items: OrderItem[];
}

interface OrderProps {
  orders: OrderUI[];
}

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatOrderNumber(index: number) {
  return `#${(index + 1).toString().padStart(3, "0")}`;
}

function ItemRow({
  item,
  showPrice,
}: {
  item: OrderItem;
  showPrice?: boolean;
}) {
  const price = currency.format(item.priceInCents / 100);
  return (
    <>
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border bg-white md:h-20 md:w-20">
            <Image
              src={item.imageUrl}
              alt={item.productName}
              fill
              sizes="(max-width:768px) 64px, 80px"
              className="object-cover"
            />
          </div>
          <div className="grid min-w-0">
            <span className="text-sm font-semibold text-slate-900 md:text-base">
              {item.productName}
            </span>
            <span className="text-xs text-slate-500 md:text-sm">
              {item.productVariantName} • Qtd: {item.quantity}
            </span>
            {showPrice && (
              <span className="text-xs font-medium text-slate-700 md:hidden">
                {price}
              </span>
            )}
          </div>
        </div>
        {showPrice && (
          <div className="hidden flex-1 text-right text-sm font-semibold md:block">
            {price}
          </div>
        )}
      </div>
    </>
  );
}

export default function Orders({ orders }: OrderProps) {
  if (!orders?.length) {
    return (
      <div className="px-4">
        <Card className="rounded-2xl border-slate-200 shadow-xl">
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <Package2 className="h-8 w-8" />
            <p className="text-base font-medium">Você ainda não tem pedidos</p>
            <p className="text-sm text-slate-500">
              Assim que você finalizar uma compra, seus pedidos aparecerão aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 md:px-8">
      <h1 className="text-lg font-semibold tracking-tight md:text-2xl">
        Meus pedidos
      </h1>

      {orders.map((order, idx) => (
        <Card key={order.id} className="rounded-2xl border-slate-200 shadow-xl">
          <CardContent className="p-0">
            <Accordion
              type="single"
              collapsible
              defaultValue={idx === 0 ? `item-${order.id}` : undefined}
              className="w-full"
            >
              <AccordionItem value={`item-${order.id}`} className="border-0">
                {/* Cabeçalho responsivo */}
                <AccordionTrigger className="px-4 py-4 md:flex md:items-center md:justify-between md:border-b md:text-left md:text-sm md:font-medium md:text-slate-700 [&>svg]:hidden md:[&>svg]:hidden">
                  {/* Mobile */}
                  <div className="block text-left md:hidden">
                    <span className="text-sm font-semibold text-slate-900">
                      Número do Pedido{" "}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatOrderNumber(idx)}
                    </span>
                    <div className="mt-1">
                      {order.status === "paid" && (
                        <Badge className="bg-emerald-500 hover:bg-emerald-500/90">
                          Pago
                        </Badge>
                      )}
                      {order.status === "pending" && (
                        <Badge
                          variant="outline"
                          className="border-amber-600 text-amber-600"
                        >
                          Pagamento pendente
                        </Badge>
                      )}
                      {order.status === "canceled" && (
                        <Badge variant="destructive">Cancelado</Badge>
                      )}
                    </div>
                  </div>

                  {/* Desktop */}
                  <div className="hidden md:flex md:flex-1 md:items-center md:gap-8 lg:gap-30 xl:gap-40">
                    <div className="md:block">
                      Número do Pedido
                      <div className="text-xs font-normal text-slate-500">
                        {formatOrderNumber(idx)}
                      </div>
                    </div>
                    <div className="md:block">
                      Status
                      <div
                        className={`text-xs font-medium ${
                          order.status === "paid"
                            ? "text-emerald-600"
                            : order.status === "pending"
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      >
                        {order.status === "paid"
                          ? "Pago"
                          : order.status === "pending"
                            ? "Pagamento pendente"
                            : "Cancelado"}
                      </div>
                    </div>
                    <div className="md:block">
                      Data
                      <div className="text-xs font-normal text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                    <div className="md:block">
                      Pagamento
                      <div className="text-xs font-normal text-slate-500">
                        Cartão
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex md:items-center md:gap-2">
                    <svg
                      className="h-4 w-4 shrink-0 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                    <span className="cursor-pointer text-xs font-medium text-violet-600 hover:underline">
                      Detalhes do Pedido
                    </span>
                  </div>
                </AccordionTrigger>

                {/* Conteúdo do Accordion */}
                <AccordionContent className="space-y-4 px-4 pt-1 pb-4 md:p-4">
                  {/* Itens */}
                  <div className="space-y-4">
                    {order.items.map((item, i) => (
                      <div key={item.id}>
                        <ItemRow item={item} showPrice />
                        {i < order.items.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Resumo */}
                  <div className="mt-4 space-y-3 bg-white">
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium">
                        {currency.format(order.totalPriceInCents / 100)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="text-slate-600">
                        Transporte e Manuseio
                      </span>
                      <span className="font-medium">Grátis</span>
                    </div>
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="text-slate-600">Taxa Estimada</span>
                      <span className="text-slate-400">—</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold md:text-base">
                        Total
                      </span>
                      <span className="text-sm font-extrabold md:text-base">
                        {currency.format(order.totalPriceInCents / 100)}
                      </span>
                    </div>

                    {/* <div className="pt-1 text-[11px] text-slate-500 md:text-xs">
                      Pedido feito em:{" "}
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")} às{" "}
                      {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div> */}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
