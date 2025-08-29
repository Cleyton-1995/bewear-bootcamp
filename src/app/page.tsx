import { desc } from "drizzle-orm";
import Image from "next/image";

import BrandCarousel from "@/components/common/brand";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import HeroBanner from "@/components/common/hero";
import ProductList from "@/components/common/product-list";
import PromoGrid from "@/components/common/promo-grid";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

async function Home() {
  const products = await db.query.productTable.findMany({
    with: { variants: true },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: { variants: true },
  });

  const categories = await db.query.categoryTable.findMany({});
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl space-y-8 px-0 pb-10 md:px-4">
        <HeroBanner />

        <BrandCarousel />

        <ProductList products={products} title="Mais vendidos" />

        <section className="px-5">
          <CategorySelector categories={categories} />
        </section>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />

        <PromoGrid />
      </main>

      <div className="mt-12">
        <Footer />
      </div>
    </>
  );
}

export default Home;
