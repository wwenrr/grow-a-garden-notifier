import { create } from 'zustand';

export const useParamsStore = create((set) => ({
  params: {},
  setParams: (newParams) => set({ params: newParams }),
  updateParam: (key, value) => 
    set((state) => ({
      params: { ...state.params, [key]: value }
    })),
  removeParam: (key) =>
    set((state) => {
      const newParams = { ...state.params };
      delete newParams[key];
      return { params: newParams };
    }),
  clearParams: () => set({ params: {} }),
  syncFromURL: () => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsObj = {};
    for (const [key, value] of searchParams.entries()) {
      paramsObj[key] = value;
    }
    set({ params: paramsObj });
  },
  syncToURL: () => {
    const state = useParamsStore.getState();
    const searchParams = new URLSearchParams();
    
    Object.entries(state.params).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });

    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, '', newURL);
  }
}));