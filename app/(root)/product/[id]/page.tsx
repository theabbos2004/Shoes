import LikeForYou from "@/components/LikeForYou";
import ProductDetailsImage from "@/components/ProductDetailsImage";
import React from "react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <section className="py-5">
      <ProductDetailsImage
        productId={id}
        className="grid grid-cols-1 md:grid-cols-3"
      />
      <LikeForYou/>
    </section>
  );
};
