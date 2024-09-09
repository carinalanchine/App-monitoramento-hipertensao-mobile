import axios from "axios";
import { URL_BASE } from "../util/constants";

export const useAxios = axios.create({
  baseURL: URL_BASE,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    "Content-Type": "application/json"
  }
});