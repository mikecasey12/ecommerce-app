import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Loading from "@/components/Loading";
import CartModal from "@/components/CartModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Heavenly",
  description: "Purchase unisex, children and amazing brands.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <>
          <NavBar />
          <Loading />
          {children}

          <CartModal />
        </>
      </body>
    </html>
  );
}
