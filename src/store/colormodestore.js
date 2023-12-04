import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useColorModeStore = create(
  persist(
    (set, get) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      name: "myPersistedStore", // name for the storage key
      version: 1,
      storage: createJSONStorage(() => sessionStorage), // specify storage (localStorage in this case)
    }
  )
);

export default useColorModeStore;
