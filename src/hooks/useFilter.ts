import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilter = (
  filter: Object,
  transformFilter: () => { [key: string]: any }
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const transformParamsToObj = () => {
    const paramsObj: {[key: string]: any} = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    })

    return paramsObj;
  }

  useEffect(() => {
    console.log("UPDATE");
    const obj1 = transformParamsToObj();
    const obj2 = Object.assign({}, obj1, transformFilter());
    setSearchParams({
      ...obj2, // функция, возвращающая объект параметров
    });
  }, [filter]);

  const retrieveParams = (queryName: string) => {
    if (searchParams.has(queryName)) {
      return searchParams.get(queryName);
    }
  }

  return {
    retrieveParams
  }
};
