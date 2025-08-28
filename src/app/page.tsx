import { desc } from "drizzle-orm";
import Image from "next/image";

import Footer from "@/components/common/footer";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

async function Home() {
  const products = await db.query.productTable.findMany({
    with: { variants: true },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: { variants: true },
  });

  return (
    <>
      <div className="mx-auto max-w-screen-xl space-y-6 px-5 lg:space-y-12 lg:px-10">
        <div>
          <picture>
            <source srcSet="/hero-desktop.png" media="(min-width: 1024px)" />

            <Image
              src="/banner-01.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="mt-6 h-auto w-full rounded-l-2xl"
            />
          </picture>
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div>
          <div className="block md:hidden">
            <Image
              src="/banner-02.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>

          <div className="hidden md:grid md:grid-cols-2 md:gap-4">
            <Image
              src="/banner-02.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="50vw"
              className="h-auto w-full rounded-2xl object-cover"
            />

            <div className="grid grid-rows-2 gap-2">
              <Image
                src="/Frame222.png"
                alt="Produto destaque"
                height={0}
                width={0}
                sizes="50vw"
                className="h-full w-full rounded-2xl object-cover"
              />
              <Image
                src="/Frame224.png"
                alt="Produto destaque"
                height={0}
                width={0}
                sizes="50vw"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </>
  );
}

export default Home;
