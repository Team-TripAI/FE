import styled from "styled-components";
import ImageUploader from "../../components/ImageUploader.tsx";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormValues {
  title: string;
  content: string;
  place: string;
  lat: number;
  lng: number;
}


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


export function PostForm() {
  const { register, handleSubmit } = useForm<FormValues>();
  const inputRef = useRef();
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const navigate = useNavigate();

  const onValid = (data: FormValues) => {
    data.lng = lng;
    data.lat = lat;
    console.log(data);

    navigate("/mypage");
  };

  const onInvalid = (data: FormValues) => {
    console.log(data);
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API,
    libraries: ["places"],
  });

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    setLat(place.geometry.location.lat());
    setLng(place.geometry.location.lng());
  };

  return (
    <PostDiv>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <Box sx={{ width: "100%", mx: 2 }}>
          <Typography>장소</Typography>
          {isLoaded && (
            <>
              <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={handlePlaceChanged}
              >
                <LocationInput
                  type="text"
                  className="form-control"
                  placeholder="놀러간 장소를 입력해주세요"
                  {...register("place")}
                />
              </StandaloneSearchBox>
              <Typography>제목</Typography>
              <TitleInput
                {...register("title", {
                  required: "제목을 써주세요.",
                })}
              />
            </>
          )}
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
          <PostButton>save</PostButton>
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
