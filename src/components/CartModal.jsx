/* eslint-disable @next/next/no-img-element */
"use client";
import useCartStore from "@/store/store";
import "./CartModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";

const CartModal = () => {
  const cart = useCartStore((state) => state.cart);
  const cartLen = useCartStore((state) => state.cart.length);
  const clearAllFn = useCartStore((state) => state.resetCartFn);
  const showCart = useCartStore((state) => state.showCart);
  const removeItemFn = useCartStore((state) => state.removeItemFn);

  return (
    <motion.div
      initial={{ x: "150%" }}
      animate={showCart ? { x: "0%" } : { x: "150%" }}
      transition={{ duration: 0.3, type: "tween" }}
      className={`${
        showCart ? "block" : "hidden"
      } hide-scrollbar h-[90%] w-[350px] fixed top-0 right-2 bg-white shadow-md px-4 py-4 mt-16 z-50 overflow-y-scroll text-center`}
    >
      <div className='py-1 border-b-2 border-gray-100'>
        <h2 className='text-lg font-semibold'>Cart ({cartLen})</h2>
      </div>
      {cartLen < 1 && (
        <div className='text-gray-500 text-center h-1/3 pt-10'>
          <p>Cart is empty</p>
        </div>
      )}
      {cart.map((cartItem) => (
        <div
          key={`${cartItem.ID}`}
          className='flex items-start gap-4 text-left mt-4'
        >
          <Link href={`/women/product/${cartItem.ID}`}>
            <img
              className='h-[120px] w-[120px]'
              src={`${cartItem.ImageURLs[0]}`}
              alt={`${cartItem.Name}`}
            />
          </Link>

          <div>
            <Link href={`/women/product/${cartItem.ID}`}>
              <h2 className='font-bold'>{cartItem.Name}</h2>
            </Link>

            <p className='font-medium italic'>
              Price:{" "}
              <span className='text-red-500'>
                ${(cartItem.Qty * cartItem.Price).toFixed(2)}
              </span>
            </p>
            <p>
              <span className='font-medium italic'>Qty:</span> {cartItem.Qty}
            </p>
            <button className='bg-gray-950 text-white px-4 py-2 rounded-full mt-2'>
              Checkout
            </button>
          </div>
          <button onClick={() => removeItemFn(cartItem.ID)}>
            <FontAwesomeIcon
              className='ml-4 hover:text-red-500'
              title='Remove item'
              icon={faRemove}
            />
          </button>
        </div>
      ))}
      <div className='border-t-2 border-gray-100 mt-4 py-4 flex justify-center gap-4'>
        <button
          className={`bg-gray-950 text-white px-4 py-2 rounded-full disabled:bg-gray-400 ${
            cartLen < 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={cartLen < 1}
        >
          Checkout all
        </button>
        <button
          className={`bg-red-500 text-white px-4 py-2 rounded-full disabled:bg-gray-400 ${
            cartLen < 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={cartLen < 1}
          onClick={clearAllFn}
        >
          Clear cart
        </button>
      </div>
    </motion.div>
  );
};

export default CartModal;
