import {
  Typography,
  Slider,
  Box,
  Divider,
  Modal,
  Stack,
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
import { useNavigate } from "react-router-dom";
import moment from "moment";

const SliderBox = styled(Box)({
  width: "45vw",
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
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #519ABA",
  boxShadow: 24,
  p: 4,
  borderRadius: 12,
};

export default function BudgetInputFormat({ item }) {
  const [amount, setAmount] = useState<number>(0);
  const [percent, setPercent] = useState<number[]>([25, 50, 75]);
  const [maxValue, setMaxValue] = useState<number[]>([0, 0, 0, 0]);
  const [firstDate, setFirstDate] = useState<string | null>(null);
  const [secondDate, setSecondDate] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const setSubmitFormat = useSetRecoilState(submitFormat);
  const changeAmount = (e: any) => setAmount(e.target.value);
  const changePercent = (e: any) => setPercent(e.target.value);

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
    const maxValueArray = percentArray.map((percent) =>
      Math.floor((amount * percent) / 100)
    );
    setMaxValue(maxValueArray);
  }

  function onClickSave() {
    const checkIfNumber = isNumber(amount);
    if (
      checkIfNumber &&
      amount > 0 &&
      firstDate !== null &&
      secondDate !== null
    ) {
      const startDate = moment(firstDate?.$d);
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const endDate = moment(secondDate?.$d);
      const formattedSecondDate = endDate.format("YYYY-MM-DD");
      setFirstDate(formattedStartDate);
      setSecondDate(formattedSecondDate);
      setAmount(amount);
      setOpen(true);
      calculatePercent();
      setError(false);
    } else setError(true);
  }

  function onClickSubmit() {
    setSubmitFormat((prev) => ({
      ...prev,
      destination: item.title,
      startDate: firstDate,
      endDate: secondDate,
      money: maxValue,
      percent: percent,
      iata: item.iata,
    }));
    navigate("/budget/select");
  }

  return (
    <>
      {error && (
        <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
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
              width: "45vw",
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
            {`출발 날짜 : ${firstDate}`}
          </Typography>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            {`도착 날짜 : ${secondDate}`}
          </Typography>
          <Divider />
          <Typography
            variant="h6"
            sx={{ my: 2 }}
          >{`입력한 예산 : ${amount} ₩`}</Typography>
          <Divider />
          <Box sx={{ width: "100%", my: 4 }}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              입력 비율
            </Typography>
            <Box sx={{ my: 2, display: "flex", justifyContent: "flex-start" }}>
              <Stack spacing={5} direction="row">
                <Typography color="primary">{`교통 : ${percent[0]}%`}</Typography>
                <Typography color="secondary">{`숙박 : ${percent[1]}%`}</Typography>
                <Typography color="green">{`맛집 : ${percent[2]}%`}</Typography>
                <Typography color="orange">{`명소 : ${percent[3]}%`}</Typography>
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
