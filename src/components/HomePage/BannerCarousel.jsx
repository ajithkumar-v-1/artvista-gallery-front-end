import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { shuffleBanners } from '../slices/bannerSlice';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import './BannerCarousel.css';

const BannerCarousel = () => {
  const dispatch = useDispatch();
  const { list: banners } = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(shuffleBanners());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const displayBanners = banners.slice(0, 5);

  return (
    <div className="banner-carousel">
      <Slider {...settings}>
        {displayBanners.map((banner) => (
          <div key={banner.id} className="banner">
            <img src={banner.imageUrl} alt={banner.title} />
            <div className="banner-title">{banner.title}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
