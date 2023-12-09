import React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Box, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { submitFormat } from "../../../constants/atoms";
import { useEffect } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { useState } from "react";
import { Alert } from "@mui/material";

interface Accommodation {
  name: string;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  avgPrice: number;
  price: number;
  image: string;
}

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
`;

const MapContainer = styled.div`
  width: 50vw;
  height: 60vh;
  margin-bottom: 20px;
`;

function not(a: readonly Accommodation[], b: readonly Accommodation[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(
  a: readonly Accommodation[],
  b: readonly Accommodation[]
) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function SelectAccommodation({
  prevPage,
  nextPage,
  getAccommodationList,
}: {
  prevPage: any;
  nextPage: any;
  getAccommodationList: any;
}) {
  const [checked, setChecked] = useState<readonly Accommodation[]>([]);
  const [left, setLeft] = useState<readonly Accommodation[]>([]);
  const [right, setRight] = useState<readonly Accommodation[]>([]);
  const [accommodationList, setAccommodationList] = useState<Accommodation[]>(
    []
  );
  const [alert, setAlert] = useState(false);
  const accommodationData = useRecoilValue(submitFormat);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getAccommodation = async () => {
      try {
        const response = await axiosInstance.get("/plan/budget/accommodation", {
          params: {
            destination: accommodationData.destination,
            endDate: accommodationData.endDate,
            startDate: accommodationData.startDate,
            maxPrice: accommodationData.money[1],
          },
        });
        setAccommodationList(response.data.data.accommodationSearchDataList);
        setLeft(response.data.data.accommodationSearchDataList);
        if (left !== null) {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setError("에러가 발생했습니다");
        setLoading(false);
      }
    };

    getAccommodation();
  }, []);

  // Google Maps 라이브러리가 제대로 로드되었는지 확인
  useEffect(() => {
    if (accommodationList.length > 0) {
      initMap();
    }
  }, [right]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (accommodation: Accommodation) => () => {
    const currentIndex = checked.indexOf(accommodation);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(accommodation);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  const handleNextPage = () => {
    if (right.length > 0) {
      nextPage(1);
      const formattedAccommodations = right.map((hotel) => {
        return {
          name: hotel.name,
          lat: hotel.lat,
          lng: hotel.lng,
          startDate: hotel.startDate,
          endDate: hotel.endDate,
          price: hotel.price,
          avgPrice: hotel.avgPrice,
          image: hotel.image,
        };
      });
      getAccommodationList(formattedAccommodations);
    } else {
      setAlert(true);
    }
  };
  const handlePrevPage = () => {
    prevPage(1);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (
    title: React.ReactNode,
    items: readonly Accommodation[]
  ) => (
    <Card>
      <CardHeader sx={{ px: 1, py: 1 }} avatar={<Box />} title={title} />
      <Divider />
      {/* 여기가 표 리스트 아이템들 */}
      <List
        sx={{
          width: "20vw",
          height: "50vh",
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((accommodation: Accommodation) => {
          return (
            <ListItem
              key={accommodation.name}
              role="listitem"
              onClick={handleToggle(accommodation)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(accommodation) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={accommodation.name} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  async function initMap() {
    const { Map } = google.maps;

    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: {
        lat: right[0].lat,
        lng: right[0].lng,
      },
      zoom: 12,
    });
    // 고른 곳
    right.map((accommodation: Accommodation) => {
      new google.maps.Marker({
        map,
        position: {
          lat: accommodation.lat,
          lng: accommodation.lng,
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "red",
          fillOpacity: 0.8,
          strokeColor: "white",
          strokeWeight: 1,
          scale: 10,
        },
      });
    });
    // 아직 안 고른 곳
    left.map((accommodation: Accommodation) => {
      new google.maps.Marker({
        map,
        position: {
          lat: accommodation.lat,
          lng: accommodation.lng,
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "blue",
          fillOpacity: 0.6,
          strokeColor: "white",
          strokeWeight: 1,
          scale: 10,
        },
      });
    });
  }
  /* 숙소 선택 갯수 알아야함 */

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error..</div>;
  }
  return (
    <>
      {alert && (
        <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
          please check your inputs!
        </Alert>
      )}
      <Typography variant="h4" align="center">
        숙소를 선택하시면 지도가 나옵니다!
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Container>
        <MapContainer id="map"></MapContainer>
        <MapContainer>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>{customList("숙소 리스트", left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList("선택된 숙소", right)}</Grid>
          </Grid>
        </MapContainer>
      </Container>
      <div>
        <Button onClick={handlePrevPage}>prev</Button>
        <Button onClick={handleNextPage}>next</Button>
      </div>
    </>
  );
}
