import axios from "axios"
import { API_URL, API_ANDROID } from '@env';

export const getCatalog = async () => {

    const response = await axios.get(`${API_URL}/ut_api/hs/v1/catalog`);

    if (response.status != 200) {
        throw new Error('Не удалось загрузить товары');
    }

    return response.data
}

export const createItem = async (data: { name: string, article: string }) => {
    const response = await axios.post(`${API_URL}/ut_api/hs/v1/orders`, data)

    if (response.status != 200) {
        throw new Error('Не удалось загрузить товары');
    }

    return response.data
}