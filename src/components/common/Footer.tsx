import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #171717;
  color: #fff;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FooterText = styled.p`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 15px;
  color: #ccc;
  margin-top: 10px;
  
  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 10px;
    font-size: 20px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 30px;
`;

const Icon = styled.img`
  width: 90%;
  height: 90%;
  color: #fff;
  cursor: pointer;
  
  @media (max-width: 480px) {
    width: 80%;
    height: 80%;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <IconWrapper>
          <a href="https://github.com/3x-haust/React_thai" target="_blank" rel="noopener noreferrer">
            <Icon src='assets/github.svg' alt="GitHub"/>
          </a>
        </IconWrapper>
        <FooterText>Made By 3xhaust</FooterText>
      </FooterContent>
    </FooterContainer>
  );
}
