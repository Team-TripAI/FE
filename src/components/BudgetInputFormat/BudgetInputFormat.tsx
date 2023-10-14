import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  Typography,
  Slider,
  Box,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { submitFormat } from "../../constants/atoms";

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 25,
    label: "25%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 75,
    label: "75%",
  },
  {
    value: 100,
    label: "100%",
  },
];

export default function BudgetInputFormat() {
  const [amount, setAmount] = useState<number>(0);
  const [percent, setPercent] = useState<number[]>([25, 50, 75]);
  const setSubmitFormat = useSetRecoilState(submitFormat);

  // recoilstate로 쓸때 계산을 위한 함수
  function calculatePercent(percent: number[]) {
    const percentArray: number[] = [];
    percentArray[3] = 100 - percent[2];
    percentArray[2] = percent[2] - percent[1];
    percentArray[1] = percent[1] - percent[0];
    percentArray[0] = percent[0];
    return percentArray;
  }

  function changePercent(event: any) {
    setPercent(event.target.value);
  }

  function changeAmount(event: any) {
    console.log(amount);
    setAmount(event.target.value);
  }

  function onClick() {
    const calculatedPercent = calculatePercent(percent);
    setPercent(calculatedPercent);
    setSubmitFormat((prev) => ({
      ...prev,
      money: amount,
      percentage: percent,
    }));
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Typography variant="h6">예산을 입력하세요</Typography>
        <FormControl onChange={changeAmount} sx={{ width: "450px", ml: 3 }}>
          <InputLabel>Amount</InputLabel>
          <OutlinedInput
            startAdornment={<InputAdornment position="start">₩</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" align="center">
          예산 비중 ±5%가 적용됩니다
        </Typography>
      </Box>
      <Box
        sx={{
          width: "620px",
          my: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Slider
          track={false}
          marks={marks}
          value={percent}
          disableSwap
          onChange={changePercent}
          // valueLabelDisplay="auto"
        />
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" endIcon={<SendIcon />} onClick={onClick}>
          저장하기
        </Button>
      </Box>
    </>
  );
}
