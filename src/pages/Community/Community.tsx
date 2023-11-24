import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
`;

const PostButton = styled(Button)({
  boxShadow: "none",
  backgroundColor: "white",
  "$:focused": {
    boxShadow: "none",
    backgroundColor: "white",
  },
  "$:hover": {
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
  },
});

const cards = [
  {
    id: 0,
    location: "ji-house",
    address: "sangdoro 47ma 14",
    contents: "card number 0",
  },
  {
    id: 1,
    location: "Tokyo",
    address: "Japan somewhere",
    contents: "card number 1",
  },
  {
    id: 2,
    location: "mt.Hanlla",
    address: "Jeju-Island",
    contents: "card number 2",
  },
  {
    id: 3,
    location: "su-house",
    address: "Gyeonggido Gwangju",
    contents: "card number 3",
  },
];

export default function Community() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container sx={{ height: "100vh", mt: 13 }}>
        <Box>
          <Typography
            gutterBottom
            variant="h4"
            component="h2"
            textAlign="center"
            fontFamily=""
          >
            경험을 공유하세요!
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 3 }}>
          <PostButton onClick={() => navigate("/community/post")}>
            경험 공유하기
          </PostButton>
        </Box>
        <Grid container spacing={10}>
          {cards.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => navigate(`/community/${card.id}`)}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom fontFamily="mono-space">
                    {card.location}
                  </Typography>
                  <Typography>{card.address}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
}
