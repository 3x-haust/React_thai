import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  color: #fff;
  font-family: "Pretendard";
  margin: 8% 0;
  padding: 0 27%;

  @media (max-width: 768px) {
    padding: 0 18%;
  }
`;

const Timeline = styled.div`
  position: relative;
  width: 300%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-left: 4px solid #fff;

  @media (max-width: 768px) {
    border-left: 3px solid #fff;
    padding-left: 10px;
  }
`;

interface EventProps {
  isVisible: boolean;
}

const Event = styled.div<EventProps>`
  position: relative;
  padding-left: 180px;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(20px);
  animation: ${({ isVisible }) => (isVisible ? fadeIn : "none")} 0.8s ease-out
    forwards;

  @media (max-width: 768px) {
    padding-left: 30px;
    margin-bottom: 20px;
  }
`;

const Dot = styled.div`
  position: absolute;
  left: -16px;
  top: 5px;
  width: 25px;
  height: 25px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
    left: -20px;
  }
`;

const EventTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const EventDescription = styled.p`
  font-size: 1.6rem;
  margin: 5px 0 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export default function TimelineComponent() {
  const { i18n } = useTranslation();
  interface Event {
    title: string;
    description: string[];
  }

  let events: Event[] = i18n.getResourceBundle(i18n.language, 'translation').timeline;
  const [visibleEvents, setVisibleEvents] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleEvents((prev) =>
              prev.includes(entry.target.id)
                ? prev
                : [...prev, entry.target.id]
            );
          }
        });
      },
      { threshold: 0.8 }
    );

    const elements = document.querySelectorAll(".event");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <TimelineContainer>
      <Timeline>
        {events.map((event, index) => (
          <Event
            key={index}
            id={`event-${index}`}
            className="event"
            isVisible={visibleEvents.includes(`event-${index}`)}
          >
            <Dot />
            <EventTitle>{event.title}</EventTitle>
            {event.description.map((desc, i) => (
              <EventDescription key={i}>{desc}</EventDescription>
            ))}
          </Event>
        ))}
      </Timeline>
    </TimelineContainer>
  );
}
