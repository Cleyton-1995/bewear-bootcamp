import { and, eq, ne } from "drizzle-orm";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductItem from "@/components/common/product-item";
import { db } from "@/db";
import { productTable } from "@/db/schema";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    excludeProductId?: string;
  }>;
}

async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, excludeProductId } = await searchParams;

  const whereConditions = [];

  if (category) {
    whereConditions.push(eq(productTable.categoryId, category));
  }

  if (excludeProductId) {
    whereConditions.push(ne(productTable.id, excludeProductId));
  }

  const products = await db.query.productTable.findMany({
    where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
    with: { variants: true },
  });

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-6 md:px-4">
        <div className="mb-4 flex flex-col gap-1 md:mb-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-xl font-semibold md:text-2xl">
            {category ? "Produtos da categoria" : "Todos os produtos"}
          </h2>

          <p className="text-sm text-slate-500">
            {products.length} {products.length === 1 ? "item" : "itens"}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 text-center text-slate-600">
            Não encontramos produtos disponíveis.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 xl:grid-cols-5">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                textContainerClassName="max-w-full"
              />
            ))}
          </div>
        )}
      </main>

      <div className="mt-66">
        <Footer />
      </div>
    </>
  );
}

export default ProductsPage;
