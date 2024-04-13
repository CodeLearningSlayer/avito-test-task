import React, { useState, useRef, useMemo, useEffect } from "react";
import { Select, Spin } from "antd";
import { countries } from "@/helpers/consts/countries";
import * as classes from "./countryFilter.module.scss";
import { GetCountriesListResponse, ICountry } from "@/api/specs/films";
import { useFilter } from "@/hooks/useFilter";

export interface SelectProps {
  fetchOptions: () => Promise<GetCountriesListResponse>;
}

interface Option {
  key: string;
  label: string;
  value: string;
  disabled: boolean | undefined;
  title: boolean | undefined;
}

export function CountryFilter({ fetchOptions, ...props }: SelectProps) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const fetchRef = useRef(0);
  const [country, setCountry] = useState<Option>(null);

  const handleCountryChange = (data: Option) => {
    if (data) {
      console.log(data);
      setCountry(data);
    }
  };

  const transformToQuery = () => {
    if (country)
      return {
        "countries.name": country.value,
      };
  };

  const {retrieveParams} = useFilter(country, transformToQuery);
  
  const transformQueryToSelectedCountry = (countryStr: string) => {
    setCountry({
      disabled: undefined,
      key: countryStr,
      label: countryStr,
      title: undefined,
      value: countryStr
    })
  }

  useEffect(() => {
    const selectedCountry = retrieveParams("countries.name");
    if (selectedCountry) {
      transformQueryToSelectedCountry(selectedCountry);
    }
  }, [])

  const fetcher = async (isDropdownVisible: boolean) => {
    if (!isDropdownVisible || options.length != 0) {
      return;
    }

    try {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      setFetching(true);

      const newOptions = await fetchOptions();

      if (fetchId !== fetchRef.current) {
        // for fetch callback order
        return;
      }

      const formattedOptions: Array<{ label: string; value: string }> =
        newOptions.map((item) => ({ label: item.name, value: item.name }));
      setOptions(formattedOptions);
      setFetching(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className={classes.title}>Страна</div>
      <Select
        labelInValue
        placeholder="Выберите страну"
        filterOption={false}
        onDropdownVisibleChange={fetcher}
        value={country}
        onChange={handleCountryChange}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        style={{ width: "100%" }}
        options={options}
      />
    </div>
  );
}

export default CountryFilter;
