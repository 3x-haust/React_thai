import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface TeamMember {
  src: string;
  name: string;
  id: string;
}

const Container = styled.div`
  display: flex;
  padding: 20px;
  margin-top: 150px;
  margin-bottom: 300px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const TeamGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 25px;
  text-align: center;
  width: 100%;
  padding-bottom: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    padding-bottom: 100px;
  }
`;

const TeamMemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const MemberImage = styled.img`
  width: 17vw;
  height: auto;
  max-width: 250px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 50vw;
    max-width: 300px;
  }
`;

const MemberName = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  font-family: "Pretendard", sans-serif;
  font-weight: 800;
  color: #fff;
  padding: 0 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border: 1px solid #333;
  border-radius: 30px;
  background-color: #f5f5f5;
  width: 80%;
  max-width: 600px;
  gap: 50px;
  position: relative;
`;

const PopupImage = styled.img`
  width: 17vw;
  height: auto;
  object-fit: cover;
`;

const PopupDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PopupLeftDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  width: 100%;
`;

const PopupSection = styled.div`
  flex-direction: column;
  color: #000;
  font-family: 'Pretendard';
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
`;

const AboutUs: React.FC = () => {
  const { t, i18n } = useTranslation() as { t: (key: string) => string, i18n: any };
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const teamMembers: TeamMember[] = [
    { src: "assets/img/about-us/kwak.png", name: "kwak", id: "ja_kyeong_" },
    { src: "assets/img/about-us/lyu.png", name: "lyu", id: "3xhaust_" },
    { src: "assets/img/about-us/yoon.png", name: "yoon", id: "ekrud._30" },
    { src: "assets/img/about-us/yun.png", name: "yun", id: "y._sw08" },
    { src: "assets/img/about-us/jeong.png", name: "jeong", id: "yeona8516" },
  ];

  const handleClosePopup = () => setSelectedMember(null);

  const renderPopupContent = () => {
    if (!selectedMember) return null;

    return (
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <PopupDetails>
          <PopupImage src={selectedMember.src} alt={selectedMember.name} />
          <p style={{ 
            color: '#000', 
            textAlign: 'center', 
            fontFamily: 'Pretendard', 
            fontSize: '1.2rem', 
            fontWeight: 800,
            width: '100%'
          }}>
            {t(`aboutUs.${selectedMember.name}.name`)}
          </p>
        </PopupDetails>
        
        <PopupLeftDetails>
          <PopupSection>
            <p>MBTI</p>
            <p style={{ 
              color: '#000', 
              textAlign: 'left', 
              fontFamily: 'Pretendard', 
              fontSize: '1rem', 
              fontWeight: 500 
            }}>{t(`aboutUs.${selectedMember.name}.mbti`)}</p>
          </PopupSection>
        
          <PopupSection>
            <p>{t('aboutUs.birthday')}</p>
            <p style={{ 
              color: '#000', 
              textAlign: 'left', 
              fontFamily: 'Pretendard', 
              fontSize: '1rem', 
              fontWeight: 500 
            }}>{t(`aboutUs.${selectedMember.name}.birthday`)}</p>
          </PopupSection>
          
          <p style={{ 
            color: '#000', 
            textAlign: 'left', 
            fontFamily: 'Pretendard', 
            fontSize: '1.5rem', 
            fontWeight: 500 
          }}>{t(`aboutUs.${selectedMember.name}.description`)}</p>
        </PopupLeftDetails>

        <a href={`https://instagram.com/${selectedMember.id}`} target="_blank" rel="noopener noreferrer">
          <img src="assets/instagram.svg" alt="img" style={{ width: '100%', height: '100%' }} />
        </a>
        
        <CloseButton onClick={handleClosePopup}>×</CloseButton>
      </PopupContainer>
    );
  };

  return (
    <>
      <Container>
        <TeamGrid>
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              onClick={() => setSelectedMember(member)}
            >
              <MemberImage src={member.src} alt={member.name} />
              <MemberName>{t(`aboutUs.${member.name}.name`)}</MemberName>
            </TeamMemberCard>
          ))}
        </TeamGrid>
      </Container>

      {selectedMember && (
        <PopupOverlay onClick={handleClosePopup}>
          {renderPopupContent()}
        </PopupOverlay>
      )}
    </>
  );
};

export default AboutUs;