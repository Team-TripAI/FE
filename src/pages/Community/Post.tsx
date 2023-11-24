import styled from "styled-components";
import ImageUploader from "../../components/ImageUploader.tsx";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { useRef } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  margin-top: 100px;
`;

const PostButton = styled.button`
  color: black;
  border-color: black;
  &:active {
    background-color: black;
    border-color: black;
  }
  &:hover {
    border-color: black;
    background-color: white;
  }
`;

const ImageDiv = styled.div`
  width: 50vw;
  height: 50vh;
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
const LocationInput = styled.input`
  width: 45vw;
  height: 10px;
  padding: 10px;
  font-size: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
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

const library = ["places"];

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
          <Typography>장소</Typography>
          <AutoComplete />
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
          <PostButton>게시글 쓰기</PostButton>
        </Box>
      </form>
    </PostDiv>
  );
}

const AutoComplete = () => {
  const inputRef = useRef();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API,
    libraries: library,
  });

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  return (
    isLoaded && (
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <LocationInput
          type="text"
          className="form-control"
          placeholder="놀러간 장소를 입력해주세요"
        />
      </StandaloneSearchBox>
    )
  );
};

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
