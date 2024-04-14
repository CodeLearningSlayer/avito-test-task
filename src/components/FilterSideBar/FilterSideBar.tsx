import React, { FC, useState } from 'react';
import YearFilter from '@/components/filters/YearFilter/YearFilter';
import CountryFilter from '@/components/filters/CountryFilter/CountryFilter';
import AgeRatingFilter from '@/components/filters/AgeRatingFilter/AgeRatingFilter';
import * as classes from "./filterSidebar.module.scss";
import { useAPI } from '@/hooks/useAPI';
import Sidebar from '@/components/common/Sidebar/Sidebar';

interface SidebarProps {
  setMovies: () => void;
}

const handleLazySelect = async () => {
  const {filmService} = useAPI();
  const res = await filmService.GetCountriesList();
  return res;
}

const FilterSideBar: FC = () => {

  return (
    <Sidebar>
      <YearFilter/>
      <CountryFilter fetchOptions={handleLazySelect}/>
      <AgeRatingFilter/>
    </Sidebar>
  );
};

export default FilterSideBar;
