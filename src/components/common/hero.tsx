"use client";

import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="px-5 md:px-0">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#7459ED_0%,#D4D7E4_100%)] shadow-md">
        <Image
          src="/hero-mobile.png"
          alt="Leve uma vida com estilo"
          fill
          priority
          className="object-cover object-center md:hidden"
          sizes="100vw"
        />

        <Image
          src="/hero-desktop.png"
          alt="Leve uma vida com estilo"
          fill
          priority
          className="hidden object-cover object-center md:block"
          sizes="(max-width: 1280px) 100vw, 1200px"
        />

        <div className="invisible block aspect-[4/5] md:aspect-[169/100]" />
      </div>
    </section>
  );
}
