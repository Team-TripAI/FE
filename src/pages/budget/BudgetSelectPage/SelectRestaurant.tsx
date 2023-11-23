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

interface Restaurant {
  name: string;
  lat: number;
  lng: number;
  hours?: {
    day: string;
    open: string;
    close: string;
  };
}

const restaurantList: Restaurant[] = [
  {
    name: "Gyopao Gyoza Roppongi",
    lat: 35.663578,
    lng: 139.73212,
  },
  {
    name: "Rokkasen",
    lat: 35.69537,
    lng: 139.6986,
  },
];

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

export default function SelectRestaurant() {
  const [checked, setChecked] = React.useState<readonly Restaurant[]>([]);
  const [left, setLeft] = React.useState<readonly Restaurant[]>(restaurantList);
  const [right, setRight] = React.useState<readonly Restaurant[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

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

  const numberOfChecked = (items: readonly Restaurant[]) =>
    intersection(checked, items).length;

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
      <CardHeader
        sx={{ px: 1, py: 1 }}
        avatar={<Box />}
        title="선택된 숙소"
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
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
              key={restaurant.name}
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
    const { Map } = await google.maps.importLibrary("maps");

    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: restaurantList[0].lat, lng: restaurantList[0].lng },
      zoom: 12,
    });
    // 고른 곳
    right.map((restaurant: Restaurant) => {
      const marker = new google.maps.Marker({
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
      const marker = new google.maps.Marker({
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

  initMap();

  /* 숙소 선택 갯수 알아야함 */

  return (
    <>
      <Typography variant="h4" align="center">
        식당을 선택하세요
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
            <Grid item>{customList("Choices", left)}</Grid>
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
            <Grid item>{customList("Chosen", right)}</Grid>
          </Grid>
        </MapContainer>
      </Container>
    </>
  );
}
