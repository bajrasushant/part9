import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((res) => res.data);
};

export const createNewDiaryEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((res) => res.data)
    .catch((err) => {
      if (axios.isAxiosError(err) && err.response) {
        throw new Error(err.response.data);
      } else {
        console.error(err);
      }
    });
};
