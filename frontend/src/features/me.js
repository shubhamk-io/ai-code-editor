import { api } from "../utils/axios.js"

export const me = async () => {
    try {
        const {data} = await api.get("/api/me")

        return data;

    } catch (error) {
        // console.log(error);
         console.log("ME ERROR:", error.response?.data);
        console.log("STATUS:", error.response?.status);
        console.log("FULL ERROR:", error);
        return null;
    }
}