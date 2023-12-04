import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const store = immer((set) => ({
  showLoading: false,
  showLoadingFn: (value) => set((state) => ({ showLoading: value })),
}));

const useLoadingStore = create(store);
export default useLoadingStore;
