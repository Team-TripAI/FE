import {
  Container,
  Typography,
  Box,
  CardContent,
  CardMedia,
} from "@mui/material";
import BudgetInputFormat from "../../components/BudgetInputFormat";
import { styled } from "@mui/material";
// BudgetMainPage에서 지명을 받아서
// 그에 맞는 사진 가져오고 띄우기

const MainContainer = styled(Container)({
  marginTop: 100,
  width: "1440px",
  height: "750px",
  display: "flex",
  justifyContent: "center",
});

const ImageCard = styled(CardMedia)({
  width: "650px",
  height: "450px",
  borderRadius: "10px",
  marginBottom: 10,
});

const PlaceInfoCard = styled(CardContent)({
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const place = {
  name: "Tokyo,Japan",
  placeurl:
    "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/04/a0004721/img/ko/a0004721_parts_5fab2f30a98c3.jpg?20230830000000&amp;q=80",
  flagimg:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAAB3CAMAAACQcepdAAAAnFBMVEX///++ACbw8PD7///BACX//f+9ACOzAADVjZi+AB+8ACi2AADj4+O8AA66Aia7AACtAAC5AAe1ABi7ABju2d376O3vzNPnvsfz6Ozitb+8PEjx1trFeILy3+HFb3q7EirboKnYqa64LDv02uPSmKO6Q0/GAB64Ei7lv8HMeX/HanTFYWu6NEL68/XPc4C4Hzi3Iz+2JDK9UF++T1h021A6AAAEUElEQVR4nO2ci1LqMBCGU5OmTXvS0hZLEZGCUkTE6/u/20nA2yAeYXdPHGfyj+MoUPPNzmZ3k2xkf05+mf6wE/bLdOKRHcgju5BHdiGP7EIe2YU8sgt5ZBfyyC7kkV3IIzPGuf1i/P1nzmlH+A9W5vyVd/sr9d+nRn4BPa0HRvXpx9eoRIi8BWtG7d19rygKrc233sNdO2o+vE0gOuSNLYfLM51qJYMXSaUjfbYcMkJbkyEboNF5mXcqEMGOVJeX5yMyO9NZeXwx0UoImSU7xFkghNKTizHRQHjkcGO+8UVUWXeQn41sX0gS4yEWmm8e+GHkjaaP+hPqJ3T9OKUYiwKZN0959x3wxqnzVYN3aArk+kyrQ4iNV+vbGj0Lccg8NKFr0FPfOsW7oXvXJtyFGGwcsiVuC/k96ZsSWbSW+ceQDfE0kofb2PqGTKe4tIJA5tYrp6nYjcP/lAgmwjBjHBqFHLK6PMYrXiTL2jwKhsY4BmfjBYDYFB7ZGGFmFHK40hDkINCrEO7OqOl3noKAjfIYPirGly+jwzLIHnW9y5+wcvgEJg5E9QQOzWBkk/VKOHLSlQPoDEQgz5SETT4jKdWMAfM2FNkYORefa+NDZR7NoWYGWzlcVSb7gpUF1QrozWDk0VGlxT5Dy5Fj5DjCEQdBBIzNYOQJeOq9Sk6cIvPLHpY4EMB0ArXylUYjB/oKNDQUedkdVSbvU9ItXSI3cwrkeeMQebyAJ+s3qQVoAwmIXEfwZP0moWuHyMPouCXffuRo6BC5TZG5zygRUesQOQavRz4qBeU/KHJBgVx4ZI+8R8Ipcksz/VqHyNcpPpMEMr12iDzK8cTGl0HrEnCNQWFlpzXGek6BPF87RGbLCo9cOa2XWYt35ixvnSKP0QvsIItg563gFfY9usZX97CR4fsY6GQCq+MQyH3sRoac9B0j8xtkzKhu3G7WchbWSM9Ia+CpFGIXf16ijDyHjotAriV8tzaTErS6RiKzVQVfs4J3l3HIjT1ahZyu2gNW0EYRGtlk7SQBGFok0FyNRTbT/UZDdmASoW8QB++oA2HezEDBuZo1iPYGZKNOX6osOyZw2A8rCcx7JMhsWBwX6kSWiXSAGhKJzNkg6o6KzlkXgc9VSZBDzqabc+FDA0ciyylDtRZRNJ3VZSUOM3SWyaoEZz1CZNZ/zg80ssqf+zgTkyAbhPXdYZ0ZKroArampkTeqbwuRiC8PI8xbQaaKW7RTWJEgm7zQxJHttBZfeYhQOoobhmpDpES23slP49mX7pEoPYvX2z41tGisvG2JbNqH1HZdJ4ktPMS2bzmx/db5Q2srN84pOsWJbzyM4udFZLmlNBFNGtoiWjzHwDaG/SK/V7IeD+LVore98dBbrOLBmCBKfBQt8nvD3roxemVFdv/uiP72DvltnV35a10u5JFdyCO7kEd2IY/sQh7ZhTyyC3lkF/LILuSRXehXIv++/0D5FzeOPo7KVMKhAAAAAElFTkSuQmCC",
};

export default function BudgetInputPage() {
  return (
    <>
      <MainContainer maxWidth="xl">
        <Box sx={{ marginRight: "20px" }}>
          <PlaceInfoCard>
            <ImageCard image={place.placeurl}></ImageCard>
            <img src={place.flagimg}></img>
            <Typography variant="h4" color="black" gutterBottom>
              {place.name}
            </Typography>
          </PlaceInfoCard>
        </Box>
        <Box sx={{ width: "650px", height: "750px" }}>
          <BudgetInputFormat></BudgetInputFormat>
        </Box>
      </MainContainer>
    </>
  );
}
