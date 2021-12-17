import axios from "axios";
import { IQuote } from "../models/Quote";

const api = axios.create({
    baseURL: "http://api.quotable.io",
    headers: {
        "Content-type": "application/json",
    },
});

export const getQuote = async () => {
    const res = await api.get<IQuote>("/random");
    return res.data;
};
