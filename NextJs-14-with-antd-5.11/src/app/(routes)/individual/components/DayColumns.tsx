"use client";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import weekdayPlugin from "dayjs/plugin/weekday";
type Props = {};

const DayColumn = (props: Props) => {
  const dateFormat = "dd";
  const days = []; //จันทร์-อาทิตย์
  const startDate = dayjs().startOf("month").day();
  const endDate = dayjs().daysInMonth();
  const now = dayjs().locale({
    ...locale,
  });
  dayjs.extend(weekdayPlugin);
  for (let day = 1, date = startDate; day <= endDate; day++, date++) {
    days.push(
      <StyledDay key={day}>{now.weekday(date).format(dateFormat)}</StyledDay>
    );
  }

  return <StyledRowDay column={endDate}>{days}</StyledRowDay>;
};

export default DayColumn;

const StyledDay = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledRowDay = styled.div<{ column: number }>`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: ${({ column }) => `repeat(${column}, 1fr)`};
`;
