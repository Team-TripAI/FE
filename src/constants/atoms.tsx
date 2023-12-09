import { atom } from "recoil";
interface SubmitFormatInterface {
  destination: string;
  startDate: string | null;
  endDate: string | null;
  money: number[];
  percent: number[];
  iata: string;
}

export const submitFormat = atom<SubmitFormatInterface>({
  key: "submitFormat",
  default: {
    destination: "",
    startDate: "",
    endDate: "",
    money: [],
    percent: [],
    iata: "",
  },
});
