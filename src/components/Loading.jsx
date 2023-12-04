"use client";
import useLoadingStore from "@/store/loadingstore";
import { motion } from "framer-motion";
const Loading = () => {
  const { showLoading } = useLoadingStore((state) => state);
  return (
    <div
      className={`${
        showLoading ? "block" : "hidden"
      } z-[100] text-red-600 top-[5.5rem] absolute left-2/4 -translate-x-2/4 -translate-y-2/4`}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='12'
            cy='12'
            r='10'
            stroke='#141B34'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <path
            d='M2 12C7.18491 16.8269 16.4642 16.3877 22 12.3556'
            stroke='#141B34'
            strokeWidth='1.5'
          />
          <path
            d='M11.5368 2C6.98945 6.5 6.48414 17 11.9941 22'
            stroke='#141B34'
            strokeWidth='1.5'
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default Loading;
