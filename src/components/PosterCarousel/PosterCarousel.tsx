import React, { FC, useEffect } from 'react';
import { Carousel } from 'antd';
import { useInView } from 'react-intersection-observer';
import { IPoster } from '@/api/specs/posters';
import {Splide, SplideSlide} from "@splidejs/react-splide";
import * as classes from "./posterCarousel.module.scss";

interface PosterCarouselProps {
  posters: Array<IPoster>
  fetchPosters: () => void;
}

const PosterCarousel: FC<PosterCarouselProps> = ({posters, fetchPosters}) => {
  const {ref} = useInView({
    triggerOnce: true,
    
    onChange: (inView) => {
      if (inView) {
        fetchPosters();
      }
    }
  })

  return (
    <div ref={ref}>
      <Splide options={{
        autoWidth: true,
        autoHeight: true,
        gap: 10,
        pagination: false
      }}>
        {posters.map(poster => {
          return (
          <SplideSlide key={poster.id}>
            <div className={classes.imgWrapper}>
              <img className={classes.img} src={poster.url}></img>
            </div>
          </SplideSlide>
          )
        })}
      </Splide>
    </div>
  );
};

export default PosterCarousel;
