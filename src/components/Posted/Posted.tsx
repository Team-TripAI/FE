import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ItemData {
  img: string;
  title: string;
}

export default function Posted() {
  const navigate = useNavigate();

  const handleClick = (item: ItemData) => {
    const itemData = item;
    navigate("/budget/input", { state: { item: itemData } });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ImageList sx={{ width: "1220px", height: "750px" }}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <Button onClick={() => handleClick(item)}>
                <ImageListItemBar title={item.title} position="bottom" />
              </Button>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}

const itemData: ItemData[] = [
  {
    img: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/04/a0004721/img/ko/a0004721_parts_5fab2f30a98c3.jpg?20230830000000&amp;q=80",
    title: "일본 도쿄",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRUHZIRiTD1US7aDGwGRXMFBVCnjgo-jhN_A&usqp=CAU",
    title: "대한민국 제주도",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGSLort3sXmsVR4QGX4V34D7Xhxx8MtwqWHA&usqp=CAU",
    title: "일본 오사카",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ChbANipS9lQn8QlDVSLdUOQUbTlBf_AWbg&usqp=CAU",
    title: "일본 삿포로",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDEwGljbtf953waOU6Kdji8rYq2vS505s0YA&usqp=CAU",
    title: "미국 LA",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-Oiuw0qRnDtszYr5-EpF4FazYJMHiS43Vw&usqp=CAU",
    title: "프랑스 파리",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl_sChrYf8x3ulZhFfBkdW0biiYnSb5bqzUQ&usqp=CAU",
    title: "영국 런던",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtr-p8mYvnK7UNDXQARWQduVcq5CYvrHzDDg&usqp=CAU",
    title: "독일 뮌헨",
  },
];
