import {
  Typography,
  Slider,
  Box,
  Divider,
  Modal,
  Stack,
  Paper,
  Chip,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { submitFormat } from "../../constants/atoms";
import { styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Alert } from "@mui/material";

const SliderBox = styled(Box)({
  width: "620px",
  marginTop: 3,
  marginBottom: 3,
  display: "flex",
  justifyContent: "center",
});

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

const modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 12,
};

export default function BudgetInputFormat() {
  const [amount, setAmount] = useState<number>(0);
  const [percent, setPercent] = useState<number[]>([25, 50, 75]);
  const [firstDate, setFirstDate] = useState<Date | null>(null);
  const [secondDate, setSecondDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const setSubmitFormat = useSetRecoilState(submitFormat);
  const changeAmount = (e) => setAmount(e.target.value);
  const changePercent = (e) => setPercent(e.target.value);

  const handleClose = () => {
    setPercent([25, 50, 75]);
    setOpen(false);
    setFirstDate(null);
    setSecondDate(null);
    setAmount(0);
  };

  function isNumber(value?: number): boolean {
    return value != null && !isNaN(Number(value.toString()));
  }

  // recoilstate로 쓸때 계산을 위한 함수
  function calculatePercent() {
    const percentArray: number[] = [];
    percentArray[3] = 100 - percent[2];
    percentArray[2] = percent[2] - percent[1];
    percentArray[1] = percent[1] - percent[0];
    percentArray[0] = percent[0];
    setPercent(percentArray);
  }

  function onClickSave() {
    const checkIfNumber = isNumber(amount);

    if (
      checkIfNumber &&
      parseInt(amount) > 0 &&
      firstDate !== null &&
      secondDate !== null
    ) {
      setAmount(parseInt(amount));
      setOpen(true);
      calculatePercent();
      setError(false);
    } else setError(true);
  }

  function onClickSubmit() {
    setSubmitFormat((prev) => ({
      ...prev,
      startDate: firstDate,
      endDate: secondDate,
      money: amount,
      percentage: percent,
    }));
  }

  return (
    <>
      {error && (
        <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
          please check your inputs!
        </Alert>
      )}
      <Divider>
        <Chip variant="outlined" label="여행 일정" />
      </Divider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <DatePicker
              sx={{ width: "45%", mr: 5 }}
              disablePast
              label="출발일"
              value={firstDate}
              format={"YYYY-MM-DD"}
              formatDensity="spacious"
              maxDate={secondDate}
              onChange={(newDate) => setFirstDate(newDate)}
            />
            <Typography variant="h6">~</Typography>
            <DatePicker
              sx={{ width: "45%", ml: 5 }}
              disablePast
              label="도착일"
              minDate={firstDate}
              value={secondDate}
              format={"YYYY-MM-DD"}
              formatDensity="spacious"
              onChange={(newDate) => {
                setSecondDate(newDate);
              }}
            />
          </Box>
        </DemoContainer>
      </LocalizationProvider>
      <Divider sx={{ my: 3 }}>
        <Chip variant="outlined" label="예산 입력" />
      </Divider>
      <Box
        sx={{
          my: 3,
        }}
      >
        <TextField
          fullWidth
          value={amount}
          onChange={changeAmount}
          error={error}
          helperText="문자열이 포함되거나 0으로 시작할 수 없습니다"
        ></TextField>
      </Box>
      <Divider>
        <Chip sx={{ mr: 2 }} variant="outlined" label="탈것" color="primary" />
        <Chip
          sx={{ mr: 2 }}
          variant="outlined"
          label="호텔"
          color="secondary"
        />
        <Chip sx={{ mr: 2 }} variant="outlined" label="맛집" color="success" />
        <Chip variant="outlined" label="명소" color="warning" />
      </Divider>
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" align="center">
          예산 비중 ±5%가 적용됩니다
        </Typography>
      </Box>
      <SliderBox>
        <Slider
          track={false}
          marks={marks}
          value={percent}
          disableSwap
          onChange={changePercent}
        />
      </SliderBox>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={onClickSave}
        >
          저장하기
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalstyle}>
          <Typography variant="h6" component="h2">
            {`출발 날짜: ${firstDate?.$y}년 ${firstDate?.$M + 1}월 ${
              firstDate?.$D
            }일`}
          </Typography>
          <Typography variant="h6" component="h2">
            {`도착 날짜: ${secondDate?.$y}년 ${secondDate?.$M + 1}월 ${
              secondDate?.$D
            }일`}
          </Typography>
          <Typography
            variant="h6"
            sx={{ mt: 2 }}
          >{`입력한 예산 : ${amount} ₩`}</Typography>
          <Box sx={{ width: "100%", mb: 4 }}>
            <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
              입력한 비율
            </Typography>
            <Box sx={{ my: 2 }}>
              <Stack spacing={2} direction="row">
                <Paper sx={{ width: "50%" }}>{`탈것 : ${percent[0]}%`}</Paper>
                <Paper sx={{ width: "50%" }}>{`숙박 : ${percent[1]}%`}</Paper>
              </Stack>
            </Box>
            <Box>
              <Stack spacing={2} direction="row">
                <Paper sx={{ width: "50%" }}>{`맛집 : ${percent[2]}%`}</Paper>
                <Paper sx={{ width: "50%" }}>{`명소 : ${percent[3]}%`}</Paper>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose}>cancel</Button>
            <Button onClick={onClickSubmit}>save</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
