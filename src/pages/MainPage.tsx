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

const HeroCard = styled(CardMedia)({
  width: "1440px",
  height: "725px",
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
  return (
    <>
      <Container>
        {/* 여기 화면크기에 맞춰서 줄이거나 늘릴것 */}
        <Card sx={{ width: "1400px" }}>
          <HeroCard image={heroImage} />
          <CardContent
            sx={{
              position: "relative",
            }}
          >
            <LogoHero variant="h5">TripAI</LogoHero>
            <Typography variant="body2" textAlign="center">
              This will be the information for TripAI
            </Typography>
          </CardContent>
          <CardActions sx={{ position: "relative", justifyContent: "center" }}>
            <Button size="small" color="inherit">
              사진으로 찾기
            </Button>
            <Button size="small" color="inherit">
              예산으로 찾기
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
