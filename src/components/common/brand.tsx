"use client";

import Image from "next/image";
import Link from "next/link";

type Brand = { name: string; logo: string; href?: string };

const DEFAULT: Brand[] = [
  { name: "Nike", logo: "/nike.svg" },
  { name: "Adidas", logo: "/adidas.svg" },
  { name: "Puma", logo: "/puma.svg" },
  { name: "New Balance", logo: "/nb.svg" },
  { name: "Converse", logo: "/converse.svg" },
  { name: "Polo", logo: "/polo.svg" },
  { name: "Zara", logo: "/zara.svg" },
];

function BrandCard({ brand }: { brand: Brand }) {
  const content = (
    <div
      className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
      aria-label={brand.name}
    >
      <div className="relative aspect-[7/7] w-full">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          className="object-contain"
          sizes="(max-width:768px) 33vw, (max-width:1024px) 18vw, 12vw"
          priority={false}
        />
      </div>
    </div>
  );

  return brand.href ? (
    <Link href={brand.href} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}

export default function BrandCarousel({
  brands = DEFAULT,
}: {
  brands?: Brand[];
}) {
  return (
    <section className="space-y-3">
      <h3 className="px-5 font-semibold">Marcas parceiras</h3>

      <div className="mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
        {brands.map((b) => (
          <div
            key={b.name}
            className="/* 3 por view considerando (~12px) */ shrink-0 basis-[calc(33.333%-12px)] snap-start gap-3"
          >
            <BrandCard brand={b} />
          </div>
        ))}
      </div>

      <div className="mx-5 hidden grid-cols-3 gap-3 sm:grid-cols-4 md:grid md:grid-cols-7">
        {brands.map((b) => (
          <BrandCard key={b.name} brand={b} />
        ))}
      </div>
    </section>
  );
}
