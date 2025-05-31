import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNotifyStore = create(
  persist(
    (set, get) => ({
      notify: [], // mảng các object {key, lastUpdate}

      // Thêm key vào notify (nếu chưa có)
      addNotify: (key, lastUpdate) =>
        set((state) => {
          const existingItem = state.notify.find(item => item.key === key);
          if (existingItem) {
            return {
              notify: state.notify.map(item =>
                item.key === key ? { ...item, lastUpdate } : item
              )
            };
          }
          return {
            notify: [...state.notify, { key, lastUpdate }]
          };
        }),

      // Xóa key khỏi notify
      removeNotify: (key) =>
        set((state) => ({
          notify: state.notify.filter((item) => item.key !== key)
        })),

      // Xóa toàn bộ notify
      clearNotify: () => set({ notify: [] }),

      // Kiểm tra xem item có trong notify không
      isNotified: (key) => {
        const state = get();
        return state.notify.some(item => item.key === key);
      },

      // Lấy thời gian cập nhật của item
      getLastUpdate: (key) => {
        const state = get();
        const item = state.notify.find(item => item.key === key);
        return item ? item.lastUpdate : null;
      }
    }),
    {
      name: 'notify-storage',
      partialize: (state) => ({ notify: state.notify })
    }
  )
);

export default useNotifyStore;