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

const MainContainer = styled(Container)({
  marginTop: 65,
  width: "100vw",
  height: "80vh",
  display: "flex",
  justifyContent: "center",
});

const ImageCard = styled(CardMedia)({
  width: "50vw",
  height: "65vh",
  borderRadius: "15px",
  marginBottom: 10,
});

const PlaceInfoCard = styled(CardContent)({
  padding: 0,
  marginTop: 10,
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
            <Typography variant="h6" color="black" gutterBottom>
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
