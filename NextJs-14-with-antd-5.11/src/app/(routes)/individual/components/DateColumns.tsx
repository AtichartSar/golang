"use client";
type Props = {};
import styled from "@emotion/styled";
import dayjs from "dayjs";

interface IDateColumn {
  status: string[];
}
const DateColumn = ({ status }: IDateColumn) => {
  const dates = []; //1-31
  const endDate = dayjs().daysInMonth();

  const startDate = dayjs().startOf("month").day();
  for (let day = 1, date = startDate; day <= endDate; day++, date++) {
    const color =
      status[day - 1] === "online"
        ? "green"
        : status[day - 1] === "offline"
        ? "red"
        : "blue";
    console.log("color", color);

    dates.push(
      <StyledDate color={color} key={date}>
        {day}
      </StyledDate>
    );
  }
  return <StyledRowDate column={endDate}>{dates}</StyledRowDate>;
};

export default DateColumn;

const StyledDate = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  border-radius: 5px;
  color: #ffffff;
`;

const StyledRowDate = styled.div<{ column: number }>`
  display: grid;
  grid-gap: 6px;
  width: 100%;
  grid-template-columns: ${({ column }) => `repeat(${column}, 1fr)`};
`;
