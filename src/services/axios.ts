import axios from "axios";

export const API = axios.create({
    baseURL: "",
    timeout: 50000,
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
})