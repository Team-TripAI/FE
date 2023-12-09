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

interface Attraction {
  name: string;
  lat: number;
  lng: number;
  image: string;
  price: string;
  hours: string[];
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

function not(a: readonly Attraction[], b: readonly Attraction[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly Attraction[], b: readonly Attraction[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function SelectAttraction({
  prevPage,
  nextPage,
  getAttractionList,
}: {
  prevPage: any;
  nextPage: any;
  getAttractionList: any;
}) {
  const [checked, setChecked] = React.useState<readonly Attraction[]>([]);
  const [left, setLeft] = React.useState<readonly Attraction[]>([]);
  const [right, setRight] = React.useState<readonly Attraction[]>([]);
  const [attractionList, setAttractionList] = useState<Attraction[]>([]);
  const attractionData = useRecoilValue(submitFormat);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    const getAttraction = async () => {
      try {
        const response = await axiosInstance.get(
          "/plan/budget/attraction/international",
          {
            params: {
              destination: attractionData.destination,
              maxPrice: attractionData.money[3],
            },
          }
        );
        setAttractionList(response.data.data.attractionSearchDataList);
        setLeft(response.data.data.attractionSearchDataList);
        if (left !== null) {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setError("에러가 발생했습니다");
        setLoading(false);
      }
    };
    getAttraction();
  }, []);

  useEffect(() => {
    if (attractionList.length > 0) {
      initMap();
    }
  }, [right]);

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

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  const handlePrevPage = () => {
    prevPage(3);
  };

  const handleNextPage = () => {
    if (right.length > 0) {
      nextPage(3);
      const selectedAttraction = right;
      const formattedAttractions = selectedAttraction.map((attr) => {
        return {
          name: attr.name,
          lat: attr.lat,
          lng: attr.lng,
          hours: attr.hours,
          image: attr.image,
        };
      });
      getAttractionList(formattedAttractions);
    } else {
      setAlert(true);
    }
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: readonly Attraction[]) => (
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
    const { Map } = google.maps;

    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: right[0].lat, lng: right[0].lng },
      zoom: 12,
    });
    // 고른 곳
    right.map((attraction: Attraction) => {
      new google.maps.Marker({
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
      new google.maps.Marker({
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
    setLoading(false);
  }

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
        명소를 선택하시면 지도가 나옵니다!
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
            <Grid item>{customList("명소 리스트", left)}</Grid>
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
            <Grid item>{customList("선택된 명소", right)}</Grid>
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
