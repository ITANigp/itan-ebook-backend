import axios from "axios";

const URL_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
   baseURL: URL_BASE
})