import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

const useSecureAxios = () => {
    return instance;
};

export default useSecureAxios;