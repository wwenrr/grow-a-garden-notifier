import { handleApiResponse } from '@/core/helpers/apiHelper';

const API_URL = 'https://grow-a-garden-notifier-proxy.vercel.app/api';

export default {
    getCurrentCrops: async () => {
        const response = await fetch(`${API_URL}?type=stock`);
        return handleApiResponse(response);
    },

    getCurrentSpecCrops: async () => {
        const response = await fetch(`${API_URL}?type=special-stock`);
        return handleApiResponse(response);
    },

    getCurrentWeather: async () => {
        const response = await fetch(`${API_URL}?type=weather`);
        return handleApiResponse(response);
    }
}







