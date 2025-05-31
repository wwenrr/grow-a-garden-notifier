import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDataStore = create(
    persist(
        (set, get) => ({
            data: {},

            setData: (key, data) => set({ data: { ...get().data, [key]: data } }),
            setDataStore: (data) => set({ data }),
            getDataStore: () => get().data,

            getCurrentCrops: () => get().data.CurrentCrops,
            getCurrentSpecCrops: () => get().data.CurrentSpecCrops,
            getCurrentWeather: () => get().data.CurrentWeather,

            checkDataEmpty: () => {
                const data = get().data;
                return !data || Object.keys(data).length === 0;
            },    

            checkTime: (key) => {
                const currentTime = new Date();
                const lastUpdateTime = get().data[key]?.updatedAt;
                if (!lastUpdateTime) return true;
                const timeDiff = currentTime - new Date(lastUpdateTime);
                return timeDiff > 1000 * 60 * 6;
            }
        }),
        {
            name: 'data-storage',
            partialize: (state) => ({ data: state.data })
        }
    )
);

export default useDataStore;