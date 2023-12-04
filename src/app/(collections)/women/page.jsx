/* eslint-disable @next/next/no-img-element */
"use client";

import QtySelector from "@/components/QtySelector";
import { dummyProducts } from "@/data/dummy_data";
import { imgs } from "@/data/image_dummy";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

let index = 0;
const WomenProductPage = () => {
  const pathname = usePathname();
  const [imageSrc, setImageSrc] = useState(imgs[0]);
  useEffect(() => {
    const imgId = setInterval(() => {
      if (index >= imgs.length - 1) {
        index = 0;
      } else {
        index++;
      }
      setImageSrc(imgs[index]);
    }, 10000);

    return () => {
      clearInterval(imgId);
    };
  }, [imageSrc]);

  return (
    <main className='mt-16'>
      <div className='px-[5%] py-4 w-full'>
        <h1 className='text-3xl'>{"Women's Product"}</h1>
        <p className='text-sm'>
          Shop all women products including bags, shoes, accessories, and more.
        </p>
        <div className='flex gap-1'>
          <img
            className='w-1/2 mt-4 h-[450px] object-center'
            src='https://media.istockphoto.com/id/1148523276/photo/gorgeous-female-brunette-model-in-white-clothes.jpg?s=1024x1024&w=is&k=20&c=kP-gl3C9VaYVjhyLFSv8G0ICuLpaKLJqiyzXtLPaaWw='
            alt='lady in white'
          />
          <img
            className='w-1/2 mt-4 h-[450px] object-center'
            src={`${imageSrc}`}
            alt='lady in white'
          />
        </div>

        <h2 className='mt-8 text-center font-sans text-2xl italic'>
          Elegance: Celebrating Women&apos;s Style
        </h2>
        <div className='flex items-stretch justify-center flex-wrap gap-8 mt-4'>
          {dummyProducts.products.map((prod, index) => (
            <div
              key={`prod-${prod.ID}`}
              className='w-1/6 h-min p-2 bg-white shadow-sm hover:shadow-md cursor-pointer'
            >
              <Link href={`${pathname}/product/${prod.ID}`}>
                <img
                  className='w-full'
                  src={`${prod.ImageURLs[0]}`}
                  alt={prod.Name}
                />
              </Link>

              <p className='font-semibold'>{prod.Name}</p>
              <p>${prod.Price}</p>
              <p className='text-xs italic font-light'>{prod.Brand}</p>

              <QtySelector prod={prod} />
            </div>
          ))}
          <button className='bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-300'>
            Load more
          </button>
        </div>
      </div>
      <Toaster
        toastOptions={{
          classNames: {
            toast: "!bg-gray-800",
            title: "!text-white",
            description: "!text-gray-100",
            success: "!text-green-500",
            closeButton: "!bg-red-500 !text-white",
          },
        }}
        closeButton
        position='bottom-center'
      />
    </main>
  );
};

export default WomenProductPage;
