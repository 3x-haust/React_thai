import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import TimelineComponent from "../components/home/TimelineComponent";
import ExhibitionSwiper from "../components/home/ExhibitionSwiper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  overflow: hidden;
  position: relative;
  padding: 30px;
  margin-top: 100px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 150px;
    padding-left: 100px;
    padding-right: 70px;
  }
`;

const TitleWrapper = styled.div`
  flex: 0 0 auto;
  z-index: 2;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const TitleLine = styled.div`
  color: #fff;
  font-family: "Pretendard";
  font-size: 40px;
  font-weight: 900;
  line-height: 1.35;
  text-align: start;
  white-space: pre-line;
  opacity: 0;
  transform: translateX(-100%);
  animation: slide-in 0.8s ease-in-out forwards;

  @keyframes slide-in {
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &:nth-child(1) {
    animation-delay: 0.2s;
  }
  &:nth-child(2) {
    animation-delay: 0.4s;
  }
  &:nth-child(3) {
    animation-delay: 0.6s;
  }

  @media (min-width: 768px) {
    font-size: 65px;
    text-align: left;
  }
`;

const SliderWrapper = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 40%;
  position: relative;

  @media (min-width: 768px) {
    height: 60%;
  }
`;

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  currentIndex: number;
  totalImages: number;
}

const Slider = styled.div.attrs<SliderProps>((props) => ({
  style: {
    transform: `translateX(${-props.currentIndex * 100}%)`,
    width: `${props.totalImages * 100}%`,
  },
}))`
  border-radius: 10px;
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.img`
  flex: 0 0 100%;
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

export default function Home() {
  const { t, i18n } = useTranslation() as { t: (key: string) => string, i18n: any };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const images = [
    "/assets/img/home/1.png",
    "/assets/img/home/2.png",
    "/assets/img/home/3.png",
    "/assets/img/home/4.png",
    "/assets/img/home/5.png",
  ];

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(images.length);
      }, 500);
    } else if (currentIndex === images.length + 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
    }
  }, [currentIndex, images.length]);

  const titleLines = t("welcome_title").split("\n");

  return (
    <>
      <Container>
        <TitleWrapper>
          {titleLines.map((line, index) => (
            <TitleLine key={index}>{line}</TitleLine>
          ))}
        </TitleWrapper>
        <SliderWrapper>
          <Slider
            currentIndex={currentIndex}
            totalImages={extendedImages.length}
            style={{
              transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
            }}
          >
            {extendedImages.map((src, index) => (
              <Slide key={index} src={src} alt={`Slide ${index + 1}`} />
            ))}
          </Slider>
        </SliderWrapper>
      </Container>
      <TimelineComponent />
      <ExhibitionSwiper imgIndex={1} />
      <ExhibitionSwiper imgIndex={2} />
      <ExhibitionSwiper imgIndex={3} />
    </>
  );
}
