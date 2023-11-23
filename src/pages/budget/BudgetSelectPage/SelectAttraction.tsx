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

interface Attraction {
  name: string;
  lat: number;
  lng: number;
}

const attractionList: Attraction[] = [
  {
    name: "Meiji Jingu Shrine",
    lat: 35.676167,
    lng: 139.69952,
  },
  {
    name: "Shinjuku Gyoen National Garden",
    lat: 35.686,
    lng: 139.70984,
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

function not(a: readonly Attraction[], b: readonly Attraction[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly Attraction[], b: readonly Attraction[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function SelectAttraction() {
  const [checked, setChecked] = React.useState<readonly Attraction[]>([]);
  const [left, setLeft] = React.useState<readonly Attraction[]>(attractionList);
  const [right, setRight] = React.useState<readonly Attraction[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (attraction: Attraction) => () => {
    const currentIndex = checked.indexOf(attraction);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(attraction);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly Attraction[]) =>
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

  const customList = (title: React.ReactNode, items: readonly Attraction[]) => (
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
        {items.map((attraction: Attraction) => {
          return (
            <ListItem
              key={attraction.name}
              role="listitem"
              onClick={handleToggle(attraction)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(attraction) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={attraction.name} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: attractionList[0].lat, lng: attractionList[0].lng },
      zoom: 12,
    });
    // 고른 곳
    right.map((attraction: Attraction) => {
      const marker = new google.maps.Marker({
        map,
        position: {
          lat: attraction.lat,
          lng: attraction.lng,
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
    left.map((attraction: Attraction) => {
      const marker = new google.maps.Marker({
        map,
        position: {
          lat: attraction.lat,
          lng: attraction.lng,
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
        원하는 명소를 선택하세요
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
