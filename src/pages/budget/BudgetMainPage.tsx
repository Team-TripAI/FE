import {
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import Posted from "../../components/Posted";
import { styled } from "@mui/material";

const MainContainer = styled(Container)({
  marginTop: 100,
  width: "100vw",
  display: "flex",
  justifyContent: "center",
});

export default function BudgetMainPage() {
  return (
    <>
      <MainContainer>
        <Typography variant="h5">가고싶은 여행지를 선택하세요</Typography>
      </MainContainer>
      <Posted></Posted>
    </>
  );
}
