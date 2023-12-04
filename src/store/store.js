import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

const store = immer(
  persist(
    (set) => ({
      productQty: 0,
      showCart: false,
      cart: [],
      updateCartFn: (prod, prodQty) =>
        set((state) => {
          const productIndex = state.cart.findIndex(
            (prev) => +prev.ID === prod.ID
          );
          if (productIndex === -1) {
            // const newProduct = prod;
            // newProduct.Qty = +prodQty;
            // state.cart.push(newProduct);
            return { cart: [...state.cart, { ...prod, Qty: +prodQty }] };
          } else {
            state.cart[productIndex].Qty += +prodQty;
            // console.log(state.cart[productIndex].Qty);
            return state;
          }
          //   console.log(state.cart);
          //   return { ...state };
        }),
      resetCartFn: () => set(() => ({ cart: [] })),
      removeItemFn: (prodId) =>
        set((state) => {
          const productIndex = state.cart.findIndex(
            (prev) => prev.ID === prodId
          );
          state.cart.splice(productIndex, 1);
          console.log(productIndex);
          return state;
        }),
      showCartFn: () => set((state) => ({ showCart: !state.showCart })),
    }),
    {
      name: "cart", // name for the storage key
      version: 1,
      storage: createJSONStorage(() => sessionStorage), // specify storage (localStorage in this case)
    }
  )
);

const useCartStore = create(store);
export default useCartStore;
