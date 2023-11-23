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

interface Accommodation {
  name: string;
  lat: number;
  lng: number;
}

const accommodationList: Accommodation[] = [
  {
    name: "Lodging Tokyo Ueno",
    lat: 35.7176401814438,
    lng: 139.785188392868,
  },
  {
    name: "Base Inn Tabata(베이스 인 타바타 )",
    lat: 35.741350614741,
    lng: 139.764779165047,
  },
  {
    name: "숙소3",
    lat: 35.741350614741,
    lng: 139.764779165047,
  },
  {
    name: "숙소4",
    lat: 35.741350614741,
    lng: 139.764779165047,
  },
  {
    name: "숙소5",
    lat: 35.741350614741,
    lng: 139.764779165047,
  },
  {
    name: "숙소6",
    lat: 35.741350614741,
    lng: 139.764779165047,
  },
  {
    name: "숙소7",
    lat: 35.741350614741,
    lng: 139.764779165047,
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

function not(a: readonly Accommodation[], b: readonly Accommodation[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(
  a: readonly Accommodation[],
  b: readonly Accommodation[]
) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function SelectAccommodation() {
  const [checked, setChecked] = React.useState<readonly Accommodation[]>([]);
  const [left, setLeft] =
    React.useState<readonly Accommodation[]>(accommodationList);
  const [right, setRight] = React.useState<readonly Accommodation[]>([]);

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

  const numberOfChecked = (items: readonly Accommodation[]) =>
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

  const customList = (
    title: React.ReactNode,
    items: readonly Accommodation[]
  ) => (
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
    const { Map } = await google.maps.importLibrary("maps");

    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: accommodationList[0].lat, lng: accommodationList[0].lng },
      zoom: 12,
    });
    // 고른 곳
    right.map((accommodation: Accommodation) => {
      const marker = new google.maps.Marker({
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
      const marker = new google.maps.Marker({
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

  initMap();

  /* 숙소 선택 갯수 알아야함 */

  return (
    <>
      <Typography variant="h4" align="center">
        숙소를 선택하세요!
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
