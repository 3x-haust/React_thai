import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const GNBContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 15px 20px;
  position: fixed;
  width: 90%;
  z-index: 1000;

  @media (min-width: 768px) {
    padding: 15px 80px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;

    @media (min-width: 768px) {
      width: 80px;
      height: 80px;
    }
  }
`;

const Menu = styled.ul<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 70px;
  right: 20px;
  background-color: #000;
  border: 1px solid #333;
  padding: 10px;
  list-style: none;
  margin: 0;
  gap: 10px;
  z-index: 10;

  li {
    user-select: none;
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 800;
    color: #767676;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    position: static;
    background-color: transparent;
    border: none;
    padding: 0;
    gap: 50px;

    li {
      font-size: 20px;
    }
  }
`;

const Dropdown = styled.ul`
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #000;
  border: 1px solid #333;
  padding: 10px;
  list-style: none;
  margin: 0;
  gap: 10px;
  z-index: 10;

  li {
    font-family: "Pretendard";
    font-size: 14px;
    font-weight: 700;
    color: #767676;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
`;

const LanguageMenu = styled.li`
  position: relative;

  &:hover {
    color: #fff;

    ${Dropdown} {
      display: flex;
    }
  }
`;

const HamburgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;

  span {
    width: 25px;
    height: 3px;
    background-color: #fff;
    transition: all 0.3s ease-in-out;
    transform-origin: center;
  }

  &.open span:nth-child(1) {
    transform: rotate(45deg) translate(7px, 5px);
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -7px);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const GNB: React.FC = () => {
  const { t, i18n } = useTranslation() as { t: (key: string) => string, i18n: any };

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const changeLanguage = (language: string) => {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  };

  return (
    <GNBContainer>
      <Logo onClick={() => (window.location.href = "/")}>
        <img src="assets/logo.svg" alt="Logo" />
      </Logo>
      <Menu isOpen={menuOpen}>
        <li onClick={() => (window.location.href = "/map")}>{t("nav.map")}</li>
        {/* <li onClick={() => (window.location.href = "/exhibition")}>{t("nav.exhibition")}</li> */}
        <li onClick={() => (window.location.href = "/about-us")}>{t("nav.aboutUs")}</li>
        <LanguageMenu>
          {t("nav.language")}
          <Dropdown>
            <li onClick={() => changeLanguage("ko")}>한국어</li>
            <li onClick={() => changeLanguage("en")}>English</li>
            <li onClick={() => changeLanguage("th")}>ไทย</li>
          </Dropdown>
        </LanguageMenu>
      </Menu>
      <HamburgerMenu onClick={toggleMenu} className={menuOpen ? "open" : ""}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerMenu>
    </GNBContainer>
  );
};

export default GNB;
