import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-sumary";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finish-order-button";

const ConfirmationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
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
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }
  return (
    <div className="flex-colmt-6 mt-6 flex min-h-dvh flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-5 lg:flex lg:gap-8 lg:space-y-0 lg:px-20">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Confirmação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card>
                <CardContent>
                  <p className="text-sm">
                    {formatAddress(cart.shippingAddress)}
                  </p>
                </CardContent>
              </Card>
              <FinishOrderButton />
            </CardContent>
          </Card>
        </div>

        <div>
          <CartSummary
            subtotalInCents={cartTotalInCents}
            totalInCents={cartTotalInCents}
            products={cart.items.map((item) => ({
              id: item.productVariant.id,
              name: item.productVariant.product.name,
              variantName: item.productVariant.name,
              quantity: item.quantity,
              priceInCents: item.productVariant.priceInCents,
              imageUrl: item.productVariant.imageUrl,
            }))}
          />
        </div>
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default ConfirmationPage;
