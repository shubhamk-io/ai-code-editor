import { api } from "../utils/axios.js";

export const login = async (token) => {

    try {

        // send token to backend
        const { data } = await api.post(
            "/api/auth/login",
            { token }
        );

        return data;

    } catch (error) {

        console.log(error);
        return null;
    }
};