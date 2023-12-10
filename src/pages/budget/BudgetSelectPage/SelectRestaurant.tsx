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

interface Restaurant {
  name: string;
  lat: number;
  lng: number;
  hours?: {
    day: string;
    open: string;
    close: string;
  };
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

function not(a: readonly Restaurant[], b: readonly Restaurant[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly Restaurant[], b: readonly Restaurant[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function SelectRestaurant({
  nextPage,
  prevPage,
  getRestaurantList,
}: {
  prevPage: any;
  nextPage: any;
  getRestaurantList: any;
}) {
  const [checked, setChecked] = React.useState<Restaurant[]>([]);
  const [left, setLeft] = React.useState<Restaurant[]>([]);
  const [right, setRight] = React.useState<Restaurant[]>([]);
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const restaurantData = useRecoilValue(submitFormat);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [alert, setAlert] = useState(false);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axiosInstance.get("/plan/budget/restaurant", {
          params: {
            destination: restaurantData.destination,
            endDate: restaurantData.endDate,
            startDate: restaurantData.startDate,
            maxPrice: restaurantData.money[2],
          },
        });
        setRestaurantList(response.data.data.restaurantSearchDataList);
        setLeft(response.data.data.restaurantSearchDataList);
        if (left !== null) {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setError("에러가 발생했습니다");
        setLoading(false);
      }
    };
    getRestaurants();
  }, []);

  useEffect(() => {
    if (restaurantList.length > 0) {
      initMap();
    }
  }, [right]);

  const handleToggle = (restaurant: Restaurant) => () => {
    const currentIndex = checked.indexOf(restaurant);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(restaurant);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleNextPage = () => {
    if (right.length > 0) {
      nextPage(2);
      const formattedRestaurants = right.map((rest) => {
        return {
          name: rest.name,
          lat: rest.lat,
          lng: rest.lng,
          hours: rest.hours,
          image: rest.image,
        };
      });
      getRestaurantList(formattedRestaurants);
    } else {
      setAlert(true);
    }
  };

  const handlePrevPage = () => {
    prevPage(2);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: readonly Restaurant[]) => (
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
        {items.map((restaurant: Restaurant) => {
          return (
            <ListItem
              key={restaurant.lat}
              role="listitem"
              onClick={handleToggle(restaurant)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(restaurant) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={restaurant.name} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
  async function initMap() {
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;

    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: right[0].lat, lng: right[0].lng },
      zoom: 12,
    });
    // 고른 곳
    right.map((restaurant: Restaurant) => {
      new google.maps.Marker({
        map,
        position: {
          lat: restaurant.lat,
          lng: restaurant.lng,
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
    left.map((restaurant: Restaurant) => {
      new google.maps.Marker({
        map,
        position: {
          lat: restaurant.lat,
          lng: restaurant.lng,
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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {alert && (
        <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
          please check your inputs!
        </Alert>
      )}
      <Typography variant="h4" align="center">
        식당을 선택하시면 지도가 나옵니다!
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
            <Grid item>{customList("식당 리스트", left)}</Grid>
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
            <Grid item>{customList("선택한 식당", right)}</Grid>
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
