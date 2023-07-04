import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { Authorization: `Bearer ${cookies["littlecomplete.token"]}` },
});
