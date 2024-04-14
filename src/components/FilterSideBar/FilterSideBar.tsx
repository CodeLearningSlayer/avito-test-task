import React, { FC, useState } from 'react';
import YearFilter from '@/components/filters/YearFilter/YearFilter';
import CountryFilter from '@/components/filters/CountryFilter/CountryFilter';
import AgeRatingFilter from '@/components/filters/AgeRatingFilter/AgeRatingFilter';
import * as classes from "./filterSidebar.module.scss";
import { useAPI } from '@/hooks/useAPI';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import { Button } from 'antd';
import { useSearchParams } from 'react-router-dom';

interface SidebarProps {
  setMovies: () => void;
}

const handleLazySelect = async () => {
  const {filmService} = useAPI();
  const res = await filmService.GetCountriesList();
  return res;
}

const FilterSideBar: FC<{active: boolean}> = ({active}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleResetFilters = () => {
    setSearchParams({});
    window.location.reload();
  }

  return (
    <Sidebar active={active}>
      <YearFilter/>
      <CountryFilter fetchOptions={handleLazySelect}/>
      <AgeRatingFilter/>
      <Button onClick={handleResetFilters}>Сбросить фильтры</Button>
    </Sidebar>
  );
};

export default FilterSideBar;
