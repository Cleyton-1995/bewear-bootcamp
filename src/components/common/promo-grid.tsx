import Image from "next/image";

import { Button } from "../ui/button";

export default function PromoGrid() {
  return (
    <section className="mx-5 grid gap-4 md:grid-cols-3">
      <div className="grid gap-4">
        <PromoCard
          title="Nike Therma FIT Headed"
          gradient="bg-[linear-gradient(180deg,#B9BBCA_0%,#EEEFF6_100%)]"
          img={{ src: "/shoe-black.png", width: 1026, height: 614 }}
          ratio="aspect-[1026/614]"
        />

        <PromoCard
          title="Nike Therma FIT Headed"
          gradient="bg-[linear-gradient(180deg,#B0B1F0_0%,#EAEFFA_100%)]"
          img={{ src: "/shoe-purple.png", width: 1026, height: 614 }}
          ratio="aspect-[1026/614]"
        />
      </div>

      <PromoCard
        className="over md:col-span-2"
        title="Nike Therma FIT Headed"
        gradient="bg-[linear-gradient(180deg,#A0CBE9_0%,#EAEFFA_100%)]"
        img={{ src: "/jacket-blue.png", width: 1630, height: 1276 }}
        ratio="aspect-[1630/1276]"
      />
    </section>
  );
}

type PromoCardProps = {
  title: string;
  gradient: string;
  img: { src: string; width: number; height: number };
  ratio: string;
  className?: string;
};

function PromoCard({ title, gradient, img, ratio, className }: PromoCardProps) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl p-5",
        "shadow-sm transition",
        gradient,
        className ?? "",
      ].join(" ")}
    >
      <h4 className="z-10 mb-2 text-xl font-semibold text-white drop-shadow md:text-2xl">
        {title}
      </h4>

      <div className={`relative ${ratio} w-full`}>
        <Image
          src={img.src}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-contain"
          priority={false}
        />
      </div>

      <Button className="absolute right-5 bottom-5 rounded-full bg-white px-6 py-5 text-lg text-slate-900 hover:bg-white/90">
        Comprar
      </Button>
    </div>
  );
}
