import { useEffect, useRef, useState } from "react";
import { Select, Flex } from "antd";
import * as classes from "./yearFilter.module.scss";
import { useFilter } from "@/hooks/useFilter";
import { DEFAULT_START_YEAR, DEFAULT_END_YEAR } from "@/helpers/consts/years";

const createArrayInRange = (min: number, max: number) => {
  const arr = [];
  for (let i = min; i <= max; i++) {
    arr.push({
      label: i,
      value: i,
    });
  }
  return arr;
};

const YearFilter = () => {
  const [startYear, setStartYear] = useState(DEFAULT_START_YEAR);
  const [endYear, setEndYear] = useState(DEFAULT_END_YEAR);

  const isStartYearChanged = useRef(false);
  const isEndYearChanged = useRef(false);

  const handleStartYearChange = (year: number) => {
    setStartYear(year);
    isStartYearChanged.current = true;
  };

  const handleEndYearChange = (year: number) => {
    setEndYear(year);
    isEndYearChanged.current = true;
  };

  const transformToQuery = () => {
    return {
      ...(isStartYearChanged ? {startYear} : {}),
      ...(isEndYearChanged ? {endYear} : {}),
    };
  };

  const { retrieveParams } = useFilter(JSON.stringify([startYear, endYear]), transformToQuery);

  useEffect(() => {
    const startYear = retrieveParams("startYear");
    const endYear = retrieveParams("endYear");
    if (startYear && endYear && Number(startYear) && Number(endYear)) {
      setStartYear(Number(startYear));
      setEndYear(Number(endYear));
    }
  }, [])

  return (
    <div>
      <div className={classes.filterName}>Год выхода</div>
      <Flex align="center" gap={8}>
        <Select
          style={{ width: "100%" }}
          value={startYear}
          options={createArrayInRange(1977, new Date().getFullYear())}
          onChange={handleStartYearChange}
        />
        <span style={{ fontWeight: 500 }}>—</span>
        <Select
          style={{ width: "100%" }}
          value={endYear}
          options={createArrayInRange(1977, new Date().getFullYear())}
          onChange={handleEndYearChange}
        />
      </Flex>
    </div>
  );
};

export default YearFilter;
