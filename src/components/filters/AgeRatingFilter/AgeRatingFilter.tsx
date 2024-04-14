import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { useFilter } from "@/hooks/useFilter";

const plainOptions = ["6+", "12+", "16+", "18+"];

const getQuery = (age: string[]) => {
  const query = age.map((item) => item.slice(0, -1));
  let textQuery = "";
  query.length > 1
    ? (textQuery = `${query[0]}-${query[query.length - 1]}`)
    : (textQuery = query[0]);
  return textQuery;
};

const AgeRatingFilter = () => {
  const [ageRating, setAgeRating] = useState([]);

  const transformToParams = () => {
    console.log({
      ...(!!ageRating.length ? {ageRating: getQuery(ageRating)}: {}),
    });
    return {
      ...(!!ageRating.length ? {ageRating: getQuery(ageRating)}: {ageRating: undefined}),
    };
  };

  const {retrieveParams} = useFilter(ageRating, transformToParams);
  
  const transformBackToSelectForm = (value: string) => {
    const arrAges = value.split("-");
    
    if (arrAges.some(item => !Number(item))) return;

    if (arrAges.length > 1) {
      const transformedAges = arrAges.map(item => `${item}+`);

      const leftBorder = plainOptions.findIndex(item => item === transformedAges[0]);
      const rightBorder = plainOptions.findIndex(item => item === transformedAges[1]);
      
      const completedCheckboxes: string[] = [];
      
      plainOptions.forEach((item, index) => {
        if (index >= leftBorder && index <= rightBorder) {
          completedCheckboxes.push(item);
        }
      })

      setAgeRating(completedCheckboxes);
    } else {
      setAgeRating([`${value}+`]);
    }
  }

  useEffect(() => {
    const ratingValue = retrieveParams("ageRating");
    if (ratingValue) {
      transformBackToSelectForm(ratingValue);
    }
  }, [])

  return (
    <div>
      <div className="filter-title">Возрастной рейтинг</div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column", gap: 4 }}
        options={plainOptions}
        value={ageRating}
        onChange={(value) => {
          setAgeRating(value)
        }}
      />
    </div>
  );
};

export default AgeRatingFilter;
