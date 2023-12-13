import styled from "styled-components";
import ImageUploader from "../../components/ImageUploader/index.tsx";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/axiosInstance.ts";
import { imageInfo } from "../../constants/imageInfo.ts";
import { useRecoilValue } from "recoil";
interface FormValues {
  colorList: string[];
  content: string;
  formattedAddress: string;
  image: string;
  labelList: string[];
  lat: number;
  lng: number;
  locationName: string;
  title: string;
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

export default function Post() {
  const { register, handleSubmit } = useForm<FormValues>();
  const inputRef = useRef<null | undefined>();
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [locationName, setLocationName] = useState<string>("");
  const [formattedAddress, setFormattedAddress] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const imageData = useRecoilValue(imageInfo);
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      console.log(imageData);
      const finalFormData: FormValues = {
        title,
        content,
        lat,
        lng,
        formattedAddress,
        locationName,
        colorList: imageData.colorList,
        labelList: imageData.labelList,
        image: imageData.imageUrl,
      };
      console.log(finalFormData);
      const response = await axiosInstance.post("/articles", {
        ...finalFormData,
      });
      console.log(response);
      alert("게시글 등록 완료!");
      navigate("/community");
    } catch (err) {
      console.log(err);
    }
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API,
    libraries: ["places"],
  });
  const onValid = (data: any) => {
    setContent(data.content);
    setTitle(data.title);
  };

  const handlePlaceChanged = () => {
    // name, lat, lng, formatted_address,
    const [place] = inputRef.current.getPlaces();
    setLat(place.geometry.location.lat());
    setLng(place.geometry.location.lng());
    setFormattedAddress(place.formatted_address);
    setLocationName(place.name);
  };

  return (
    <Wrapper>
      <ImageDiv>
        <ImageUploader />
      </ImageDiv>
      <PostDiv>
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
                />
              </StandaloneSearchBox>
              <form onSubmit={handleSubmit(onValid)}>
                <Box sx={{ width: "100%" }}>
                  <Typography>제목</Typography>
                  <TitleInput
                    {...register("title", {
                      required: "제목을 써주세요.",
                    })}
                  />
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
                  <PostButton onClick={onClick}>save</PostButton>
                </Box>
              </form>
            </>
          )}
        </Box>
      </PostDiv>
    </Wrapper>
  );
}
