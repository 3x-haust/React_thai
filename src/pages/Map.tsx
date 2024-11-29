import { SetStateAction, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  margin-top: 150px;
  margin-bottom: 300px;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 350px;
  }
`;

const StyledImg = styled.img`
  width: 80%;
  height: auto;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const FloorSelector = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 20px;
  }
`;

const FloorLabel = styled.p`
  font-family: 'Pretendard';
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
  margin: 5px 0;
`;

export default function Map() {
  const [selectedFloor, setSelectedFloor] = useState(1);

  const handleFloorChange = (floor: SetStateAction<number>) => {
    setSelectedFloor(floor);
  };

  return (
    <Container>
      <FloorSelector>
        {[1, 2, 3].map((floor) => (
          selectedFloor === floor ? (
            <FloorLabel key={floor} onClick={() => handleFloorChange(floor)}>
              {floor}F
            </FloorLabel>
          ) : (
            <FloorLabel key={floor} onClick={() => handleFloorChange(floor)} style={{ color: "#767676" }}>
              {floor}F
            </FloorLabel>
          )
        ))}
      </FloorSelector>
      <StyledImg
        src={`assets/img/map/${selectedFloor}.png`}
        alt={`Map of floor ${selectedFloor}`}
      />
    </Container>
  );
}