import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/login");
  }
  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session?.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },

    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
  });

  return (
    <div className="mt-6 flex min-h-screen flex-col items-center">
      <div className="w-full max-w-6xl flex-1 space-y-5 px-5">
        <div className="mx-auto w-full max-w-6xl">
          <Card>
            <div className="space-y-5 p-5 lg:flex lg:flex-col lg:gap-6">
              <CardHeader>
                <CardTitle>Meus Pedidos</CardTitle>
              </CardHeader>

              <Orders
                orders={orders.map((order) => ({
                  id: order.id,
                  totalPriceInCents: order.totalPriceInCents,
                  status: order.status,
                  createdAt: order.createdAt,
                  items: order.items.map((item) => ({
                    id: item.id,
                    imageUrl: item.productVariant.imageUrl,
                    productName: item.productVariant.product.name,
                    productVariantName: item.productVariant.name,
                    priceInCents: item.productVariant.priceInCents,
                    quantity: item.quantity,
                  })),
                }))}
              />
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-12 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default MyOrdersPage;
