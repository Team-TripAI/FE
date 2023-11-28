import { atom } from "recoil";
interface SubmitFormatInterface {
  startDate: Date | null;
  endDate: Date | null;
  money: number;
  percentage: number[];
}

export const submitFormat = atom<SubmitFormatInterface>({
  key: "submitFormat",
  default: {
    startDate: new Date(),
    endDate: new Date(),
    money: 0,
    percentage: [],
  },
});
