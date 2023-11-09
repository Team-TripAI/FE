import { CssBaseline, Divider, Typography } from "@mui/material";
import { Box } from "@mui/material";
import styled from "styled-components";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import Comments from "./Comments";
import { useParams } from "react-router-dom";

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

const postedArticle = {
  title: "박수영 여행기",
  content: "안녕하세요 박수영입니다.",
  locationName: "방",
  formattedAddress: "서울시 동작구 상도로 47마길 14",
  nickname: "박수영",
  image:
    "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/04/a0004721/img/ko/a0004721_parts_5fab2f30a98c3.jpg?20230830000000&amp;q=80",
  createDate: "2023-10-09",
  commentList: [
    {
      commentId: 1,
      content: "안녕하세요 박수영입니다",
      isParent: true,
      nickname: "박수영",
      createDate: "2023-10-31T01:01:22.561065",
      modifyDate: "2023-10-31T01:01:22.561065",
    },
    {
      commentId: 5,
      content: "안녕하세요 박지안입니다",
      isParent: false,
      nickname: "박지안",
      createDate: "2023-10-31T01:01:59.841109",
      modifyDate: "2023-10-31T01:01:59.841109",
    },
    {
      commentId: 2,
      content: "안녕하세요 박정환입니다",
      isParent: true,
      nickname: "박정환",
      createDate: "2023-10-31T01:01:33.237118",
      modifyDate: "2023-10-31T01:01:33.237118",
    },
    {
      commentId: 3,
      content: "안녕하세요 정준서입니다",
      isParent: false,
      nickname: "정준서",
      createDate: "2023-10-31T01:01:45.984579",
      modifyDate: "2023-10-31T01:01:45.984579",
    },
    {
      commentId: 4,
      content: "안녕하세요 허동윤입니다",
      isParent: false,
      nickname: "허동윤",
      createDate: "2023-10-31T01:01:52.082025",
      modifyDate: "2023-10-31T01:01:52.082025",
    },
  ],
};

export default function Article() {
  const postId = useParams();
  return (
    <>
      <CssBaseline />
      <Wrapper>
        <MainContainer>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6" align="center" color="gray">
              {postedArticle.locationName}
            </Typography>
            <br />
            <Typography variant="h4" align="center">
              {postedArticle.title}
            </Typography>
          </Box>
          <Box sx={{ marginLeft: 2 }}>
            <Box sx={{ display: "flex", my: 1 }}>
              <PersonIcon />
              <Typography>
                {postedArticle.nickname}의 {postedArticle.createDate} 여행기
              </Typography>
            </Box>
            <Box sx={{ display: "flex", my: 1 }}>
              <PlaceIcon />
              <Typography>{postedArticle.formattedAddress}</Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <ContentBox>
            <img src={postedArticle.image}></img>
            <Typography>{postedArticle.content}</Typography>
          </ContentBox>
          <Divider />
          <Comments comments={postedArticle.commentList}></Comments>
        </MainContainer>
      </Wrapper>
    </>
  );
}
