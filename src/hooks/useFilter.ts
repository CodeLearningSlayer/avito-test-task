import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilter = (
  filter: Object,
  transformFilter: () => { [key: string]: any }
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const transformParamsToObj = () => {
    const paramsObj: { [key: string]: any } = {};
    searchParams.forEach((value, key) => {
      if (!!value) paramsObj[key] = value;
    });

    return paramsObj;
  };

  const filterFalsyValues = (obj: Object) => {
    const newObj: { [key: string]: any } = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (!!value) newObj[key] = value;
    });

    return newObj;
  }

  const getParamsObj = () => {
    return transformParamsToObj();
  };

  useEffect(() => {
    console.log("UPDATE");
    const obj1 = transformParamsToObj();
    const obj2 = Object.assign({}, obj1, transformFilter());
    setSearchParams({
      ...(filterFalsyValues(obj2)), // функция, возвращающая объект параметров
    });
  }, [filter]);

  const retrieveParams = (queryName: string) => {
    if (searchParams.has(queryName)) {
      return searchParams.get(queryName);
    }
  };

  return {
    retrieveParams,
    getParamsObj,
  };
};
