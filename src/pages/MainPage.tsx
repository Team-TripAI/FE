import heroImage from "../assets/heroImage.jpeg";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Container,
} from "@mui/material";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroCard = styled(CardMedia)({
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: "0",
  left: "0",
});

const LogoHero = styled(Typography)({
  letterSpacing: ".3rem",
  m: "10px",
  textAlign: "center",
});

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Card sx={{ width: "97vw" }}>
          <HeroCard image={heroImage} />
          <CardContent
            sx={{
              position: "relative",
            }}
          >
            <LogoHero variant="h5">TripAI</LogoHero>
            <br />
            <Typography variant="body2" textAlign="center">
              This will be the information for TripAI
            </Typography>
          </CardContent>
          <CardActions sx={{ position: "relative", justifyContent: "center" }}>
            <Button
              onClick={() => navigate("/imageplace")}
              size="small"
              color="inherit"
            >
              사진으로 찾기
            </Button>
            <Button
              onClick={() => navigate("/budget")}
              size="small"
              color="inherit"
            >
              예산으로 찾기
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
