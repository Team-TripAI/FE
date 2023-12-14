import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/axiosInstance";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { Button } from "@mui/material";

interface ArticleInterface {
  articleId: number;
  title: string;
  locationName: string;
  formattedAddress: string;
  image: string;
}

const Wrapper = styled.div`
  width: 100vw;
`;

export default function MyArticle() {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState<ArticleInterface[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };
  const [deleteDisplayButton, setDeleteDisplayButton] =
    useState<boolean>(false);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axiosInstance.get(`/users/articles`, {
          params: {
            pageNumber: pageNumber - 1,
            pageSize: 8,
          },
        });
        setArticleList(response.data.data.articleList);
        setTotalPages(response.data.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };

    getArticles();
  }, [pageNumber]);

  const deleteDisplay = () => {
    setDeleteDisplayButton(!deleteDisplayButton);
  };

  const deleteArticle = async (_e, articleId: number) => {
    try {
      const response = await axiosInstance.delete(`/articles/${articleId}`);
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Container sx={{ height: "75vh", mt: 13 }}>
        <Box>
          <Typography
            gutterBottom
            variant="h4"
            component="h2"
            textAlign="center"
            fontFamily=""
          >
            내가 작성한 게시글
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {deleteDisplayButton ? (
            <Button onClick={deleteDisplay}>취소하기</Button>
          ) : (
            <Button onClick={deleteDisplay}>게시글 삭제하기</Button>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 3 }}>
          {/* <PostButton onClick={() => navigate('/community/post')}>경험 공유하기</PostButton> */}
        </Box>
        <Grid container spacing={10}>
          {articleList.map((article: ArticleInterface) => (
            <Grid item key={article.articleId} xs={12} sm={6} md={3}>
              {deleteDisplayButton ? (
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={article.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom fontSize="15px">
                      {article.title}
                    </Typography>
                    <Typography fontFamily="mono-space">
                      {article.locationName}
                    </Typography>
                  </CardContent>
                  <Button onClick={(e) => deleteArticle(e, article.articleId)}>
                    Delete
                  </Button>
                </Card>
              ) : (
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={article.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom fontSize="15px">
                      {article.title}
                    </Typography>
                    <Typography fontFamily="mono-space">
                      {article.locationName}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={handleChange}
        />
      </div>
    </Wrapper>
  );
}
