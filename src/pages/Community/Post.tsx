import styled from "styled-components";
import ImageUploader from "../../components/ImageUploader.tsx";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const ImageDiv = styled.div`
  width: 50%;
  height: 70%;
  display: flex;
  align-items: center;
`;

const PostDiv = styled.div`
  width: 50vw;
  height: 70%;
  display: flex;
`;

const TitleInput = styled.textarea`
  width: 45vw;
  font-size: large;
  resize: none;
  padding: 10px;
  border-radius: 12px;
  &:focus {
    outline: none;
  }
`;

const ContentTextarea = styled.textarea`
  width: 45vw;
  height: 25vw;
  font-size: medium;
  padding: 10px;
  border-radius: 12px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export function PostForm({
  onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1_000));
    console.log(data);
  },
}) {
  const {
    register,
    handleSubmit,
    // formState: { isSubmitting, isSubmitted, errors },
  } = useForm();
  return (
    <PostDiv>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: "100%", mx: 2 }}>
          <Typography>제목</Typography>
          <TitleInput
            {...register("title", {
              required: "제목을 써주세요.",
            })}
          />
        </Box>
        <Box sx={{ width: "100%", m: 2 }}>
          <Typography>내용</Typography>
          <ContentTextarea
            {...register("content", {
              required: "내용을 써주세요.",
              minLength: {
                value: 10,
                message: "내용이 너무 짧습니다.",
              },
            })}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
          <Button variant="outlined" type="submit">
            게시글 쓰기
          </Button>
        </Box>
      </form>
    </PostDiv>
  );
}

export default function Post() {
  return (
    <Wrapper>
      <ImageDiv>
        <ImageUploader />
      </ImageDiv>
      <PostForm></PostForm>
    </Wrapper>
  );
}
