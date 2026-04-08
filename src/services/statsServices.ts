import api from "./api";
import { alertObj } from "../utils/alerts/alert";
import type { IStats } from "../types/statinterface";

export const getStats = async () : Promise<IStats> => {
    try {
        const response = await api.get('/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching stats:', error);
        alertObj("Error fetching stats", "error");
        throw error;
    }
}