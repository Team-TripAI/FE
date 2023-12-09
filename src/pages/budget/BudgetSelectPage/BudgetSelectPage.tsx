import styled from "styled-components";
import Button from "@mui/material/Button";
import { useState } from "react";
import SelectAccommodation from "./SelectAccommodation";
import SelectFlight from "./SelectFlight";
import SelectRestaurant from "./SelectRestaurant";
import SelectAttraction from "./SelectAttraction";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { submitFormat } from "../../../constants/atoms";

interface PostForm {
  accommodation: number;
  flight: number;
  attraction: number;
  restaurant: number;
  restaurantList: any[];
  attractionList: any[];
  flightList: any[];
  accommodationList: any[];
  name: string;
  total: number;
  end: string | null;
  start: string | null;
}

const MainContainer = styled.div`
  width: 100vw;
  height: 80vh;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function BudgetSelectPage() {
  const [page, setPage] = useState<number>(0);
  const [flightList, setFlightList] = useState<any[]>([]);
  const [accommodationList, setAccommodationList] = useState<any[]>([]);
  const [restaurantList, setRestaurantList] = useState<any[]>([]);
  const [attractionList, setAttractionList] = useState<any[]>([]);
  const [submitForm, setSubmitForm] = useState({});
  const [lastPageCalled, setLastPageCalled] = useState(false);
  const navigate = useNavigate();
  const formData = useRecoilValue(submitFormat);

  const postBudget = async (finalForm: PostForm) => {
    try {
      const response = await axiosInstance.post("/plan/budget/", {
        ...finalForm,
      });
      console.log(response);
      navigate("/mypage");
    } catch (err) {
      console.log(finalForm);
      console.log(err);
    }
  };

  const lastPage = () => {
    if (!lastPageCalled) {
      const finalForm: PostForm = {
        accommodation: formData.percent[1],
        accommodationList,
        attraction: formData.percent[3],
        attractionList,
        end: formData.endDate,
        flight: formData.percent[0],
        flightList,
        restaurant: formData.percent[2],
        restaurantList,
        name: formData.destination,
        total: 100,
        start: formData.startDate,
      };
      postBudget(finalForm);
      setLastPageCalled(true);
      console.log(finalForm);
    }
  };

  const getFlightList = (newFlightList: any[]) => {
    setFlightList(newFlightList);
  };

  const getAccommodationList = (newAccommodationList: any[]) => {
    setAccommodationList(newAccommodationList);
  };

  const getRestaurantList = (newRestaurantList: any[]) => {
    setRestaurantList(newRestaurantList);
  };
  const getAttractionList = (newAttractionList: any[]) => {
    setAttractionList(newAttractionList);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    if (page === 4) {
      lastPage();
    }
  }, [page]);

  let pageContent;
  switch (page) {
    case 0:
      pageContent = (
        <SelectFlight nextPage={nextPage} getFlightList={getFlightList} />
      );
      break;
    case 1:
      pageContent = (
        <SelectAccommodation
          prevPage={prevPage}
          nextPage={nextPage}
          getAccommodationList={getAccommodationList}
        />
      );
      break;
    case 2:
      pageContent = (
        <SelectRestaurant
          prevPage={prevPage}
          nextPage={nextPage}
          getRestaurantList={getRestaurantList}
        />
      );
      break;
    case 3:
      pageContent = (
        <SelectAttraction
          prevPage={prevPage}
          nextPage={nextPage}
          getAttractionList={getAttractionList}
        />
      );
      break;
    case 4:
      pageContent = <div>posting...</div>;
      break;
  }

  return (
    <>
      <MainContainer>{pageContent}</MainContainer>
    </>
  );
}
