import api from "./api";
import { alertObj } from "../utils/alerts/alert";
import type { IAdminLoginCredentials } from "../types/adminLogin";

export const adminLogin = async (login: IAdminLoginCredentials) => {
    try {
        const response = await api.post('/admin/login', login);
        alertObj("Login successful", "success");
        const success = response.data.success;
        if (!success) { throw new Error("Login failed")}
        return success;
        
    } catch (error: any) {
        const response = error.response;
        console.log(response);
        
        if (response.status === 401) {
            alertObj("Invalid password", "error");
            return
        }

        console.error('Error logging in:', error);
        alertObj("Error logging in", "error");
        return
    }
}