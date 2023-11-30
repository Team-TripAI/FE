import { CssBaseline, Divider, Typography } from "@mui/material";
import { Box } from "@mui/material";
import styled from "styled-components";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import Comments from "./Comments";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../apis/axiosInstance";
import { useState } from "react";

interface ArticleInterface {
  atricleId: number;
  // commentList: [{
  //   commnetId : number;
  //   content: string;
  //   isParent : boolean;
  //   nickname : string;
  //   createDate : string;
  //   modifyDate : string;
  // }]
  content: string;
  createDate: string;
  formattedAddress: string;
  image: string;
  locationName: string;
  modifyDate: string;
  nickname: string;
  title: string;
}

const Wrapper = styled.div`
  width: 100vw;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 80%;
  height: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function Article() {
  const postId = useParams();
  const [articleContent, setArticleContent] = useState<ArticleInterface>();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await axiosInstance.get(`/articles/${postId.postId}`);
        const articleContent: ArticleInterface = response.data.data;
        setArticleContent(articleContent);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getArticle();
  }, []);

  return (
    <>
      <CssBaseline />
      <Wrapper>
        <MainContainer>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6" align="center" color="gray">
              {articleContent?.locationName}
            </Typography>
            <br />
            <Typography variant="h4" align="center">
              {articleContent?.title}
            </Typography>
          </Box>
          <Box sx={{ marginLeft: 2 }}>
            <Box sx={{ display: "flex", my: 1 }}>
              <PersonIcon />
              <Typography>
                {articleContent?.nickname}의 {articleContent?.createDate} 여행기
              </Typography>
            </Box>
            <Box sx={{ display: "flex", my: 1 }}>
              <PlaceIcon />
              <Typography>{articleContent?.formattedAddress}</Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <ContentBox>
            <img
              style={{ width: 400, height: 300 }}
              src={articleContent?.image}
            ></img>
            <Typography>{articleContent?.content}</Typography>
          </ContentBox>
          <Divider />
          {/* <Comments comments={articleContent.commentList}></Comments> */}
        </MainContainer>
      </Wrapper>
    </>
  );
}
