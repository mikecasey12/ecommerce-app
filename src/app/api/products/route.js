import { dummyProducts } from "@/data/dummy_data";
import { NextResponse } from "next/server";

export const GET = async (response) => {
  const { url } = response;
  const newUrl = new URL(url);
  const id = newUrl?.searchParams.get("q");
  const product = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyProducts.products.find((prod) => prod.ID === +id));
    }, 1000);
  });
  return NextResponse.json({ product });
};
