import styled from "styled-components";
import Button from "@mui/material/Button";
import { useState } from "react";
import SelectAccommodation from "./SelectAccommodation";
import SelectFlight from "./SelectFlight";
import SelectRestaurant from "./SelectRestaurant";
import SelectAttraction from "./SelectAttraction";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  let pageContent;
  switch (page) {
    case 0:
      pageContent = <SelectFlight />;
      break;
    case 1:
      pageContent = <SelectAccommodation />;
      break;
    case 2:
      pageContent = <SelectRestaurant />;
      break;
    case 3:
      pageContent = <SelectAttraction />;
      break;
  }

  return (
    <>
      <MainContainer>
        {pageContent}
        <div>
          {page === 0 && <Button onClick={nextPage}>Next</Button>}
          {page === 1 && (
            <>
              <Button onClick={prevPage}>Prev</Button>
              <Button onClick={nextPage}>Next</Button>
            </>
          )}
          {page === 2 && (
            <>
              <Button onClick={prevPage}>Prev</Button>
              <Button onClick={nextPage}>Next</Button>
            </>
          )}
          {page === 3 && (
            <>
              <Button onClick={prevPage}>Prev</Button>
              <Button onClick={() => navigate("/main")}>Save</Button>
            </>
          )}
        </div>
      </MainContainer>
    </>
  );
}
