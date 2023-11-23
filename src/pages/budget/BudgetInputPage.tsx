import {
  Container,
  Typography,
  Box,
  CardContent,
  CardMedia,
} from "@mui/material";
import BudgetInputFormat from "../../components/BudgetInputFormat";
import { styled } from "@mui/material";
import { useLocation } from "react-router-dom";

// BudgetMainPage에서 지명을 받아서
// 그에 맞는 사진 가져오고 띄우기

const MainContainer = styled(Container)({
  marginTop: 65,
  width: "1440px",
  height: "750px",
  display: "flex",
  justifyContent: "center",
  paddingTop: 20,
});

const ImageCard = styled(CardMedia)({
  width: "650px",
  height: "450px",
  borderRadius: "10px",
  marginBottom: 10,
});

const PlaceInfoCard = styled(CardContent)({
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default function BudgetInputPage() {
  const location = useLocation();
  const { item } = location.state;

  return (
    <>
      <MainContainer maxWidth="xl">
        <Box sx={{ marginRight: "20px" }}>
          <PlaceInfoCard>
            <ImageCard image={item.img}></ImageCard>
            <Typography variant="h4" color="black" gutterBottom>
              {item.title}
            </Typography>
          </PlaceInfoCard>
        </Box>
        <Box sx={{ width: "650px", height: "750px" }}>
          <BudgetInputFormat></BudgetInputFormat>
        </Box>
      </MainContainer>
    </>
  );
}
