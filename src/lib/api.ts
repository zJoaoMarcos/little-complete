import axios from "axios";

export const api = axios.create({
  baseURL: "/",
});

export const backend = axios.create({
  baseURL: process.env.BACKEND_URL,
});
