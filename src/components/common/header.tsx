"use client";
import {
  Home,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ShoppingBasketIcon,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await authClient.signOut();
    setOpen(false);
    router.push("/authentication");
  }

  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleLogout}
                    >
                      <LogOutIcon />
                    </Button>
                  </div>

                  {pathname !== "/my-orders" && (
                    <>
                      <div>
                        <Link
                          href="/"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 text-sm font-medium"
                        >
                          <Home className="h-4 w-4" />
                          Inicío
                        </Link>
                      </div>
                      <div className="m-3">
                        <Separator />
                      </div>
                      <div>
                        <Link
                          href="/my-orders"
                          className="flex items-center gap-2 text-sm font-medium"
                        >
                          <Truck className="h-4 w-4" />
                          Meus Pedidos
                        </Link>
                      </div>

                      <div className="m-3">
                        <Separator />
                      </div>
                      <div
                        onClick={() => {
                          setOpen(false);
                          document
                            .querySelector<HTMLButtonElement>("#cart-button")
                            ?.click();
                        }}
                        className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                      >
                        <ShoppingBasketIcon className="h-4 w-4" />
                        Sacola
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button
                    size="icon"
                    asChild
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Cart />
      </div>
    </header>
  );
};
