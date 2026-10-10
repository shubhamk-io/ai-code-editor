import { api } from "../utils/axios.js";

export const logout = async () => {
    try {
        // Call backend to delete Redis session + clear cookie
        await api.post("/api/auth/logout");
        return true;
    } catch (error) {
        console.log("Logout error:", error);
        return false;
    }
};
