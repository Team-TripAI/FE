import {
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Posted from "../../components/Posted";
import { styled } from "@mui/material";

const MainContainer = styled(Container)({
  marginTop: 100,
  width: "1440px",
  height: "740px",
});

const ContentBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const InputPaper = styled(Paper)({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "400px",
  marginTop: 2,
  marginBottom: 5,
});

export default function BudgetMainPage() {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <>
      <MainContainer maxWidth="xl">
        <ContentBox>
          <Typography variant="h5">가고싶은 여행지를 선택하세요</Typography>
          {/* <InputPaper>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="도시, 국가를 검색해보세요."
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleClick}
            >
              <SearchIcon />
            </IconButton>
          </InputPaper> */}
        </ContentBox>
        <Posted></Posted>
      </MainContainer>
    </>
  );
}
