"use client";
import useCartStore from "@/store/store";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = ["women", "men", "kids", "brands"];

const NavBar = () => {
  const pathname = usePathname();
  const cartLen = useCartStore((state) => state?.cart.length);
  const cart = useCartStore((state) => state?.cart);
  const showCartFn = useCartStore((state) => state?.showCartFn);

  return (
    <header className='px-20 py-3 bg-white border-b w-full fixed z-50 top-0 h-[64px]'>
      <nav className='flex justify-between items-center'>
        <div className='w-1/3'>
          <ul className='flex gap-3 text-sm'>
            {navItems.map((navItem) => (
              <li
                key={`link-${navItem}`}
                className={
                  pathname.substring(1) === navItem
                    ? "font-bold"
                    : "font-light hover:font-normal"
                }
              >
                <Link href={`/${navItem}`}>{navItem.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-1/3'>
          <h2 className='text-xl font-bold text-center'>
            <Link href='/'>HEAVENLY</Link>
          </h2>
        </div>
        <div className='w-1/3 text-right flex gap-4 items-center justify-end'>
          <button className='bg-gray-950 text-white px-4 py-2 rounded-full'>
            Get in touch
          </button>
          <button onClick={showCartFn}>
            <FontAwesomeIcon icon={faCartShopping} />
            {cartLen}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
