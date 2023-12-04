"use client";
import { useState } from "react";
import useCartStore from "@/store/store";
import { toast } from "sonner";

const QtySelector = ({ className, prod }) => {
  const [qty, setQty] = useState("1");
  const cartFn = useCartStore((state) => state?.updateCartFn);

  const onClickHandler = (actionType) => {
    if (actionType === "add") {
      setQty((prevQty) => +prevQty + 1);
    } else {
      if (qty <= 1) return;
      setQty((prevQty) => +prevQty - 1);
    }
  };

  const onChangeHandler = (qty) => {
    setQty((prevQty) => prevQty - prevQty + +qty);
  };

  const addToCartHandler = (prod) => {
    cartFn(prod, qty);
    toast.success(`Added to Cart`, {
      description: `${prod.Name} was added to cart`,
    });
  };
  return (
    <div className={`flex items-center justify-between gap-1 ${className}`}>
      <div className='mt-2 flex items-center'>
        <button
          onClick={() => onClickHandler("sub")}
          className='bg-gray-900 p-1 rounded-full text-sm text-white w-7 hover:bg-gray-700'
        >
          -
        </button>
        <input
          className='w-10 text-center mx-1'
          type='number'
          min={1}
          step={1}
          value={qty}
          onChange={(e) => onChangeHandler(e.target.value)}
        />
        <button
          onClick={() => onClickHandler("add")}
          className='bg-gray-900 p-1 rounded-full text-sm text-white w-7 hover:bg-gray-700'
        >
          +
        </button>
      </div>
      <button
        onClick={() => addToCartHandler(prod)}
        className='text-white bg-gray-900 p-2 text-center text-xs rounded-full mt-2'
      >
        Add <i className='fa-solid fa-cart-plus'></i>
      </button>
    </div>
  );
};

export default QtySelector;
