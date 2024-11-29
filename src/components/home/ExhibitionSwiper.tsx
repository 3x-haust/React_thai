import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

interface ExhibitionSwiperProps {
  imgIndex: number;
}

const Container = styled.div`
  background-color: #000;
  color: #fff;
  padding: 20px;
  margin-bottom: 300px;
`;

const Title = styled.h2<{ isVisible: boolean }>`
  margin: 0 0 30px 30px;
  text-align: left;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? 0 : 50}px);
  transition: all 0.8s ease-out;
`;

const Subtitle = styled.h4<{ isVisible: boolean }>`
  margin: 0 0 5px 30px;
  color: #cccccc;
  text-align: left;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? 0 : 50}px);
  transition: all 0.8s ease-out;
`;

const SlideWrapper = styled.div<{ isVisible: boolean }>`
  padding: 0 10px;
  text-align: center;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? 0 : 50}px);
  transition: all 0.8s ease-out;
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const DotsWrapper = styled.div`
  position: relative;
  bottom: -25px;
  display: flex;
  justify-content: center;
`;

const DotsList = styled.ul`
  display: flex;
  padding: 0;
  list-style: none;
  gap: 10px;
`;

const CustomDot = styled.button<{ isActive: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? "#fff" : "rgba(255, 255, 255, 0.2)")};
  border: none;
`;

const ExhibitionSwiper: React.FC<ExhibitionSwiperProps> = ({ imgIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const { t } = useTranslation() as { t: (key: string) => string };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 1 }
    );

    const currentRef = containerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleBeforeChange = (oldIndex: number, newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  const responsiveSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    waitForAnimate: false,
    arrows: false,
    customPaging: (i: number) => <CustomDot isActive={i === currentIndex} />,
    appendDots: (dots: React.ReactNode) => (
      <DotsWrapper>
        <DotsList>
          {Array.isArray(dots) && dots.map((dot, index) => (
            <li key={index} onClick={() => setCurrentIndex(index)}>
              {dot}
            </li>
          ))}
        </DotsList>
      </DotsWrapper>
    ),
    beforeChange: handleBeforeChange,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const images = [
    `assets/img/exhibition/${imgIndex}/1.png`,
    `assets/img/exhibition/${imgIndex}/2.png`,
    `assets/img/exhibition/${imgIndex}/3.png`,
    `assets/img/exhibition/${imgIndex}/4.png`,
    `assets/img/exhibition/${imgIndex}/5.png`,
    `assets/img/exhibition/${imgIndex}/6.png`,
    `assets/img/exhibition/${imgIndex}/7.png`,
  ];

  return (
    <Container ref={containerRef}>
      {t(`exhibition.${imgIndex}.subtitle`) && t(`exhibition.${imgIndex}.subtitle`) !== `exhibition.${imgIndex}.subtitle` ? (
          <Subtitle isVisible={isVisible}>
            {t(`exhibition.${imgIndex}.subtitle`)}
          </Subtitle>
        ) : null}
      <Title isVisible={isVisible}>
        {t(`exhibition.${imgIndex}.title`)}
      </Title>
      <Slider {...responsiveSettings}>
        {images.map((src, index) => (
          <SlideWrapper 
            key={index} 
            isVisible={isVisible}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <SlideImage src={src} alt={`slide-${index}`} />
          </SlideWrapper>
        ))}
      </Slider>
    </Container>
  );
};

export default ExhibitionSwiper;
