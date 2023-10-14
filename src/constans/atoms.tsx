import { atom } from "recoil";
interface SubmitFormatInterface {
  money: number;
  percentage: number[];
}

export const submitFormat = atom<SubmitFormatInterface>({
  key: "submitFormat",
  default: {
    money: 0,
    percentage: [25, 50, 75, 100],
  },
});
