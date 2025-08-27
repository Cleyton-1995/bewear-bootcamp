"use client";
import {
  Home,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ShoppingBag,
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

interface HeaderProps {
  categories?: { id: string; name: string; slug: string }[];
}

export const Header = ({ categories }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await authClient.signOut();
    setOpen(false);
    router.push("/authentication");
  }

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-5">
        <Link href="/">
          <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {categories?.map((category) => {
            const href = `/category/${category.slug}`;
            return (
              <Link
                key={category.slug}
                href={href}
                className={`text-sm font-medium ${
                  isActive(href) ? "text-primary font-semibold" : ""
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Abrir menu">
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
                    <div className="flex justify-between space-y-3">
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

                        <div className="text-left">
                          <h3 className="font-semibold">
                            {session?.user?.name}
                          </h3>
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

                <div className="my-5">
                  <Separator />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className={`my-2 flex items-center gap-2 text-sm font-medium ${
                      isActive("/") ? "text-primary font-semibold" : ""
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    Início
                  </Link>

                  <Link
                    href="/my-orders"
                    onClick={() => setOpen(false)}
                    className={`my-2 flex items-center gap-2 text-sm font-medium ${
                      isActive("/my-orders") ? "text-primary font-semibold" : ""
                    }`}
                  >
                    <Truck className="h-4 w-4" />
                    Meus Pedidos
                  </Link>

                  <div
                    onClick={() => {
                      setOpen(false);
                      document
                        .querySelector<HTMLButtonElement>("#cart-button")
                        ?.click();
                    }}
                    className={`my-2 flex cursor-pointer items-center gap-2 text-sm font-medium ${
                      pathname === "/cart" ? "text-primary font-semibold" : ""
                    }`}
                    role="button"
                    aria-label="Abrir sacola"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Sacola
                  </div>
                </div>

                <div className="sm:hidden">
                  <div className="my-8">
                    <Separator />
                  </div>

                  <div>
                    {categories?.map((category) => {
                      const href = `/category/${category.slug}`;
                      return (
                        <div key={category.slug}>
                          <Button
                            asChild
                            variant="ghost"
                            className={`my-1 w-full justify-start rounded-xl text-left text-sm font-medium ${
                              isActive(href) ? "text-primary font-semibold" : ""
                            }`}
                            onClick={() => setOpen(false)}
                          >
                            <Link href={href}>{category.name}</Link>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Cart />
        </div>
      </div>
    </header>
  );
};
