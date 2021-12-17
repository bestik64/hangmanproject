import axios from "axios";
import { IResult } from "../models/Result";

const api = axios.create({
    baseURL: "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task",
    headers: {
        "Content-type": "application/json",
    },
});

export const postResult = async (dto: IResult | undefined) => {
    const res = await api.post("/highscores", dto);
    return res.status;
};

export const getScores = async () => {
    const res = await api.get<IResult[]>("/highscores");
    return res.data;
};
