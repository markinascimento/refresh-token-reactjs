import axios from "axios";

import { storageKeys } from "@/config/storageKeys";

export const httpClient = axios.create({
  baseURL: "http://localhost:3333",
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${"NOVO TOKEN"}`);
  }

  return config;
});
