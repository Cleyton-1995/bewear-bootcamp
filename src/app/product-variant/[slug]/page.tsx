import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
          category: true,
        },
      },
    },
  });
  if (!productVariant) return notFound();

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: { variants: true },
    limit: 8,
  });

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-6 md:px-4">
        <section className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-slate-50">
              <Image
                src={productVariant.imageUrl}
                alt={productVariant.name}
                fill
                sizes="(max-width:768px) 100vw, 640px"
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-4 md:hidden">
              <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>
          </div>

          <div className="mt-6 md:col-span-5 md:mt-0">
            <h1 className="md:text-2x text-xl font-semibold">
              {productVariant.product.name}
            </h1>
            <p className="text-xs text-slate-500 md:text-sm">
              {productVariant.name}
            </p>

            <div className="mt-3 text-lg font-bold md:text-xl">
              {formatCentsToBRL(productVariant.priceInCents)}
            </div>

            <div className="mt-4 hidden md:block">
              <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>

            <div className="mt-6 space-y-6">
              <ProductActions productVariantId={productVariant.id} />

              <div>
                <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
                  {productVariant.product.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProductList
          title="Produtos que vai gostar"
          products={likelyProducts}
          seeAllHref={`/products?category=${productVariant.product.categoryId}&excludeProductId=${productVariant.product.id}`}
        />
      </main>

      <Footer />
    </>
  );
};

export default ProductVariantPage;
