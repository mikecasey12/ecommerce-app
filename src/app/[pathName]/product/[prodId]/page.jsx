/* eslint-disable @next/next/no-img-element */
"use client";
import QtySelector from "@/components/QtySelector";
import useColorModeStore from "@/store/colormodestore";
import useLoadingStore from "@/store/loadingstore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetailsPage = () => {
  const { prodId } = useParams();
  const [product, setProduct] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const { showLoading, showLoadingFn } = useLoadingStore((state) => state);
  const { count, increment, decrement } = useColorModeStore((state) => state);
  const prod = product?.product;
  useEffect(() => {
    showLoadingFn(true);
    const getProductDetails = async () => {
      const res = await fetch(`/api/products?q=${prodId}`);
      const data = await res.json();
      setProduct(data);
      showLoadingFn(false);
    };

    getProductDetails();
  }, [prodId]);

  return (
    <>
      {!showLoading && (
        <div className='mt-[64px] px-20 py-4'>
          <div className='flex gap-4'>
            <div className='flex flex-col gap-4'>
              <div>
                <img
                  className='h-[450px] w-[400px]'
                  src={`${prod?.ImageURLs[imageIndex]}`}
                  alt={`${prod?.Name}`}
                />
              </div>
              <div className='flex gap-2'>
                {prod?.ImageURLs.map((img, index) => (
                  <img
                    key={`img-${index}`}
                    className={`${
                      imageIndex === index ? "border-black" : ""
                    } h-16 w-16 border-2 hover:border-black`}
                    src={`${img}`}
                    alt={`${prod?.Name}`}
                    onClick={() => setImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            <div>
              <h1 className='text-2xl'>{prod?.Name}</h1>
              <h2 className='text-xl text-red-500'>${prod?.Price}</h2>
              <p className='text-xs italic'>Brand: {prod?.Brand}</p>

              <QtySelector className='w-20' prod={prod} />
              <div>
                <h2 className='text-sm mt-4 text-gray-500'>Size:</h2>
                <div className='flex gap-2'>
                  {prod?.SizesAvailable.map((size, index) => (
                    <button
                      key={`sizes-${index}`}
                      onClick={() => setSizeIndex(index)}
                      className={`${
                        sizeIndex === index
                          ? "border-black text-white bg-black"
                          : "bg-gray-50 text-black"
                      } px-2 rounded-sm border-2`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <h2 className='text-sm mt-4 text-gray-500'>Colors:</h2>
                <div className='flex gap-2'>
                  {prod?.ColorsAvailable.map((color, index) => (
                    <button
                      key={`color-${index}`}
                      onClick={() => setColorIndex(index)}
                      className={`${
                        colorIndex === index
                          ? "border-black text-white bg-black"
                          : "bg-gray-50 text-black"
                      } px-2 rounded-sm border-2`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <h2 className='text-gray-500 text-sm mt-4'>
                Product Description:
              </h2>
              <p>{prod?.Description}</p>
              <h2 className='text-gray-500 text-sm mt-4'>Season:</h2>
              <p>{prod?.Season}</p>
              <h2 className='text-gray-500 text-sm mt-4'>Care Instructions:</h2>
              <p>{prod?.CareInstructions}</p>

              <h2 className='text-gray-500 text-sm mt-4'>Change color:</h2>
              <p>{count}</p>
              <button
                onClick={increment}
                className='text-white bg-black px-3 py-1 rounded-full'
              >
                Change
              </button>
            </div>
          </div>

          <div className='mt-8'>
            <h2 className='text-gray-500 text-xl'>Related Products</h2>
            <p>{prod?.Description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsPage;
