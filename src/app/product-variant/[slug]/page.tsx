import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
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
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <div className="mt-6 flex min-h-dvh flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-5">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="order-1 flex-1 lg:order-2">
              <Image
                src={productVariant.imageUrl}
                alt={productVariant.name}
                sizes="100vw"
                height={0}
                width={0}
                className="w-full rounded-2xl object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-6 self-start">
            <div>
              <h2 className="ml-5 text-2xl font-semibold">
                {productVariant.product.name}
              </h2>
              <h3 className="text-muted-foreground ml-5 text-sm">
                {productVariant.name}
              </h3>
              <h3 className="mt-2 ml-5 text-xl font-bold">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>
            <div className="ml-5">
              <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>

            <ProductActions productVariantId={productVariant.id} />

            <p className="text-muted-foreground ml-5 leading-relaxed">
              {productVariant.product.description}
            </p>
          </div>
        </div>

        <ProductList
          title="Você também pode gostar"
          products={likelyProducts}
        />
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default ProductVariantPage;
