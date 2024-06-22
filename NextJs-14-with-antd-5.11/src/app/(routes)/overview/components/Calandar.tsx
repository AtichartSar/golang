"use client";
import { Calendar, CalendarProps, Col, Row, Select, Space } from "antd";
import { Dayjs } from "dayjs";

type Props = {};

const CalendarOverview = (props: Props) => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const handleRenderHeader = () => {
    return (
      <Row justify="space-between">
        <Col>
          <Select size="small" placeholder="ทั้งหมด"></Select>
        </Col>
        <Col>
          <Space>
            <Select size="small" placeholder="2024"></Select>
            <Select size="small" placeholder="พ.ย."></Select>
          </Space>
        </Col>
      </Row>
    );
  };

  return (
    <Calendar headerRender={handleRenderHeader} onPanelChange={onPanelChange} />
  );
};

export default CalendarOverview;
