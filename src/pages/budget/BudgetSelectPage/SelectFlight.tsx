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
import { useState } from "react";

interface Flight {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  arrivalDate: string;
}

const flightDepartureList: Flight[] = [
  {
    departureAirport: "ICN",
    arrivalAirport: "LAX",
    departureDate: "2023-12-25",
    arrivalDate: "2023-12-25",
  },
];

const flightArrivalList: Flight[] = [
  {
    departureAirport: "LAX",
    arrivalAirport: "ICN",
    departureDate: "2023-12-31",
    arrivalDate: "2023-12-31",
  },
];

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
`;

function not(a: readonly Flight[], b: readonly Flight[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly Flight[], b: readonly Flight[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function SelectAccommodation() {
  const [checked, setChecked] = useState<readonly Flight[]>([]);
  const [left, setLeft] = useState<readonly Flight[]>(flightDepartureList);
  const [right, setRight] = useState<readonly Flight[]>(flightArrivalList);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (flight: Flight) => () => {
    const currentIndex = checked.indexOf(flight);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(flight);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const customList = (title: React.ReactNode, items: readonly Flight[]) => (
    <Card>
      <CardHeader sx={{ px: 1, py: 1 }} avatar={<Box />} title={title} />
      <Divider />
      {/* 여기가 표 리스트 아이템들 */}
      <List
        sx={{
          width: "30vw",
          height: "50vh",
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((flight: Flight) => {
          return (
            <ListItem
              key={flight.departureAirport}
              role="listitem"
              onClick={handleToggle(flight)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(flight) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItem>
                <ListItemText primary={flight.departureAirport} />
                <ListItemText primary={flight.arrivalAirport} />
                <ListItemText primary={flight.departureDate} />
                <ListItemText primary={flight.arrivalDate} />
              </ListItem>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <>
      <Typography variant="h4" align="center">
        항공권을 선택하세요!
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>{customList("출국 항공권", left)}</Grid>
          <Grid item>{customList("입국 항공권", right)}</Grid>
        </Grid>
      </Container>
    </>
  );
}
