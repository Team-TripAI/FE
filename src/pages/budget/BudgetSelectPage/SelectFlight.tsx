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
import Divider from "@mui/material/Divider";
import { Alert, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { submitFormat } from "../../../constants/atoms";
import { useEffect } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { Button } from "@mui/material";

interface Flight {
  id: string;
  airline: string;
  departureDate: string;
  arrivalDate: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
}

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
`;

export default function SelectFlight({
  nextPage,
  getFlightList,
}: {
  nextPage: any;
  getFlightList: any;
}) {
  const [leftChecked, setLeftChecked] = useState<Flight | null>(null);
  const [rightChecked, setRightChecked] = useState<Flight | null>(null);
  const [left, setLeft] = useState<readonly Flight[]>([]);
  const [right, setRight] = useState<readonly Flight[]>([]);
  const flightData = useRecoilValue(submitFormat);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const getFlight = async () => {
      try {
        const response = await axiosInstance.get("/plan/budget/flight", {
          params: {
            arrivalAirport: flightData.iata,
            departure: flightData.startDate,
            departureAirport: "ICN",
            maxFare: flightData.money[0],
          },
        });
        const responseArrival = await axiosInstance.get("/plan/budget/flight", {
          params: {
            arrivalAirport: "ICN",
            departure: flightData.endDate,
            departureAirport: flightData.iata,
            maxFare: flightData.money[0],
          },
        });
        setLeft(response.data.data.flightSearchDataList);
        console.log(responseArrival);
        setRight(responseArrival.data.data.flightSearchDataList);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("에러가 발생했습니다");
        setLoading(false);
      }
    };
    getFlight();
  }, [flightData]);

  const onClick = () => {
    if (leftChecked !== null && rightChecked !== null) {
      nextPage(1);
      const selectedFlights = [];
      selectedFlights.push(leftChecked);
      selectedFlights.push(rightChecked);
      const formattedFlights = selectedFlights.map((flight) => {
        return {
          name: flight.id,
          airline: flight.airline,
          departureAirport: flight.departureAirport,
          arrivalAirport: flight.arrivalAirport,
          startTime: `${flight.departureDate}T${flight.departureTime
            .split("+")[0]
            .slice(0, -3)}`,
          endTime: `${flight.arrivalDate}T${flight.arrivalTime
            .split("+")[0]
            .slice(0, -3)}`,
        };
      });
      console.log(formattedFlights);
      getFlightList(formattedFlights);
    } else {
      setAlert(true);
    }
  };

  const handleToggle = (list: "left" | "right", flight: Flight) => () => {
    if (list === "left") {
      setLeftChecked(flight);
      getFlightList(flight);
    } else {
      setRightChecked(flight);
      getFlightList(flight);
    }
  };

  const customList = (
    title: React.ReactNode,
    list: "left" | "right",
    items: readonly Flight[]
  ) => (
    <Card>
      <CardHeader sx={{ px: 1, py: 1 }} avatar={<Box />} title={title} />
      <Divider />
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
        {items.map((flight: Flight) => (
          <ListItem
            key={flight.id}
            role="listitem"
            onClick={handleToggle(list, flight)}
          >
            <ListItemIcon>
              <Checkbox
                checked={
                  list === "left"
                    ? leftChecked === flight
                    : rightChecked === flight
                }
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={flight.departureAirport} />
            <ListItemText primary="->" />
            <ListItemText primary={flight.arrivalAirport} />
            <ListItemText primary={flight.departureTime} />
          </ListItem>
        ))}
      </List>
    </Card>
  );

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
        항공권을 선택하세요!
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>{customList("출국 항공권", "left", left)}</Grid>
          <Grid item>{customList("입국 항공권", "right", right)}</Grid>
        </Grid>
      </Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onClick}>next</Button>
      </div>
    </>
  );
}
