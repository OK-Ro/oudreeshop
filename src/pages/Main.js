import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaCalendarAlt, FaSearch, FaTimesCircle } from "react-icons/fa";
import { IoSettingsSharp, IoClose } from "react-icons/io5";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import Security from "../components/Security";
import Analysis from "../components/Analysis";
import Assistant from "../components/Assistant";
import CameraPage from "../components/CameraPage";
import AirConditioner from "../components/AirConditioner";
import Biometrics from "../components/Biometrics";
import TvContent from "../components/TvContent";
import AmbientPage from "../components/AmbientPage";
import SmartHome from "../components/SmartHome";

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 10px;
  position: relative;
  z-index: 0;
  overflow-y: auto;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 70px;
  height: 32vh;
  background-color: rgba(208, 208, 208, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  margin-right: 20px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 80px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    margin-right: 0;
    border-radius: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const BottomNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 35vw;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  position: absolute;
  bottom: 1rem;
  z-index: 1000;
  margin-left: 20rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 73px;
    margin-left: 0;
    border-radius: 0;
    justify-content: space-around;
  }
`;

const NavContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  z-index: 1001;
  background-color: rgba(208, 208, 208, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ active }) => (active ? "#00FFFF" : "#a0a0a0")};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 15px 30px;
  margin-right: 20px;
  border-radius: 30px;
  border: 2px solid ${({ active }) => (active ? "#00FFFF" : "transparent")};
  background-color: ${({ active }) =>
    active ? "rgba(0, 255, 255, 0.2)" : "transparent"};
  box-shadow: ${({ active }) => (active ? "0 0 15px #00FFFF" : "none")};

  &:hover {
    background-color: rgba(0, 255, 255, 0.1);
    color: #00ffff;
  }
  @media (max-width: 768px) {
    padding: 10px 30px;
  }
`;

const NavIcon = styled.div`
  margin: 10px 0;
  font-size: ${({ active }) => (active ? "30px" : "18px")};
  color: ${({ active }) => (active ? "#00FFFF" : "white")};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${({ active }) => (active ? "#00FFFF" : "transparent")};
  border-radius: 50%;
  padding: 5px;
  background-color: ${({ active }) =>
    active ? "rgba(0, 255, 255, 0.2)" : "transparent"};
  box-shadow: ${({ active }) => (active ? "0 0 15px #00FFFF" : "none")};

  &:hover {
    background-color: rgba(0, 255, 255, 0.1);
    transform: scale(1.1);
    border-color: #00ffff;
  }

  @media (max-width: 768px) {
    padding: 10px 10px;
    font-size: ${({ active }) => (active ? "45px" : "25px")};
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  width: 100%;
  height: 90vh;
  display: flex;
  margin-top: -1rem;
  z-index: 1;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 8px;
    height: 230vh;
    overflow-y: auto;
    margin-top: 96rem;
    position: absolute;
    margin-bottom: 10rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

const TopLeftContainer = styled.div`
  height: 50%;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const BottomLeftContainer = styled.div`
  height: 50%;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TopRightContainer = styled.div`
  height: 50%;
  margin-bottom: 10px;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const BottomRightContainer = styled.div`
  height: 50%;
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: column;
  }
`;

const BottomRightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 21.5vh;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-right: 0;
  }
`;

const BottomRightSmallContainer = styled.div`
  flex: 1;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  height: 21.5vh;
  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const BottomRightFullContainer = styled.div`
  flex: 1;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const SearchBarContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 55%;
  transform: translateX(-50%);
  width: 60%;
  z-index: 1002;
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 10px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 90%;
    top: 90px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 50px;
  font-size: 10px;
  border: none;
  border-radius: 25px;
  background-color: rgba(208, 208, 208, 0.3);
  color: #00ffff;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  }

  &::placeholder {
    color: rgba(0, 255, 255, 0.7);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 255, 255, 0.7);
  font-size: 10px;
`;

const SingleColumnContainer = styled.div`
  flex: 1;
  width: 100%;
  height: calc(100vh - 120px);
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
`;

const DropUpContainer = styled.div`
  position: absolute;
  top: 5.5%;
  left: 21.5%;
  height: 86.7%;
  transform: translateX(-50%);
  width: 27%;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 30px;
  padding: 20px;
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  z-index: 1000;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.1);
`;

const DropUpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DropUpTitle = styled.h2`
  color: #00ffff;
  font-size: 24px;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #00ffff;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const DropUpContent = styled.div`
  color: #ffffff;
  font-size: 18px;
  text-align: left;
  overflow-y: auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 255, 0.5);
    border-radius: 4px;
  }
`;

const SearchResultsContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 55%;
  transform: translateX(-50%);
  width: 60%;
  max-height: 70vh;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  z-index: 1001;
  display: ${({ show }) => (show ? "block" : "none")};
  padding: 20px;
  color: #00ffff;
  box-shadow: 0 10px 25px rgba(0, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 255, 0.1);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 255, 0.5);
    border-radius: 4px;
  }
`;

const SearchResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
`;

const SearchResultsTitle = styled.h3`
  font-size: 18px;
  color: #00ffff;
`;

const CloseSearchResults = styled.button`
  background: none;
  border: none;
  color: #00ffff;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const SearchResultItem = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  background-color: rgba(0, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const SearchResultTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 5px;
  color: #ffffff;
`;

const SearchResultDescription = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

function Main() {
  const [activeIcon, setActiveIcon] = useState("dashboard");
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [showDropUp, setShowDropUp] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchInput = useRef(null);

  useEffect(() => {
    if (showSearch && searchInput.current) {
      searchInput.current.focus();
    }
  }, [showSearch]);

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
    setShowDropUp(true);
    setShowSearch(false);
    setShowSearchResults(false);
    if (icon === "dashboard") {
      setActiveMenuItem("home");
    }
  };

  const handleSearchClick = () => {
    setActiveIcon("search");
    setShowSearch(true);
    setShowDropUp(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const handleSearchBlur = () => {
    if (!searchQuery) {
      setShowSearch(false);
      setShowSearchResults(false);
      setActiveIcon("dashboard");
    }
  };

  const handleCloseDropUp = () => {
    setShowDropUp(false);
  };

  const handleCloseSearchResults = () => {
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const searchResults = [
    {
      title: "Front Door Camera",
      description: "Live feed from the front door security camera",
    },
    {
      title: "Motion Sensor: Living Room",
      description: "Recent activity detected in the living room",
    },
    {
      title: "Smart Lock: Main Entrance",
      description: "Status and controls for the main entrance lock",
    },
    {
      title: "Security System Settings",
      description: "Configure your home security system preferences",
    },
  ];

  const renderDropUpContent = (icon) => {
    switch (icon) {
      case "dashboard":
        return "Dashboard content goes here...";
      case "calendar":
        return "Calendar content goes here...";
      case "settings":
        return "Settings content goes here...";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case "home":
        return (
          <>
            <ContentContainer>
              <LeftColumn>
                <TopLeftContainer>
                  <CameraPage />
                </TopLeftContainer>
                <BottomLeftContainer>
                  <AirConditioner />
                </BottomLeftContainer>
              </LeftColumn>
              <RightColumn>
                <TopRightContainer>
                  <SmartHome />
                </TopRightContainer>
                <BottomRightContainer>
                  <BottomRightColumn>
                    <BottomRightSmallContainer>
                      <TvContent />
                    </BottomRightSmallContainer>
                    <BottomRightSmallContainer>
                      <Biometrics />
                    </BottomRightSmallContainer>
                  </BottomRightColumn>
                  <BottomRightFullContainer>
                    <AmbientPage />
                  </BottomRightFullContainer>
                </BottomRightContainer>
              </RightColumn>
            </ContentContainer>
            {["dashboard", "calendar", "settings"].map((icon) => (
              <DropUpContainer
                key={icon}
                show={showDropUp && activeIcon === icon}
              >
                <DropUpHeader>
                  <DropUpTitle>
                    {icon.charAt(0).toUpperCase() + icon.slice(1)}
                  </DropUpTitle>
                  <CloseButton onClick={handleCloseDropUp}>
                    <IoClose />
                  </CloseButton>
                </DropUpHeader>
                <DropUpContent>{renderDropUpContent(icon)}</DropUpContent>
              </DropUpContainer>
            ))}
          </>
        );
      case "security":
        return (
          <SingleColumnContainer>
            <Security />
          </SingleColumnContainer>
        );
      case "analysis":
        return (
          <SingleColumnContainer>
            <Analysis />
          </SingleColumnContainer>
        );
      case "assistant":
        return (
          <SingleColumnContainer>
            <Assistant />
          </SingleColumnContainer>
        );
      default:
        return null;
    }
  };

  return (
    <OuterContainer>
      <NavContainer>
        <NavIcon
          active={activeIcon === "dashboard"}
          onClick={() => handleIconClick("dashboard")}
        >
          <TbLayoutDashboardFilled />
        </NavIcon>
        <NavIcon
          active={activeIcon === "calendar"}
          onClick={() => handleIconClick("calendar")}
        >
          <FaCalendarAlt />
        </NavIcon>
        <NavIcon
          active={activeIcon === "settings"}
          onClick={() => handleIconClick("settings")}
        >
          <IoSettingsSharp />
        </NavIcon>
        <NavIcon active={activeIcon === "search"} onClick={handleSearchClick}>
          <FaSearch />
        </NavIcon>
      </NavContainer>
      <SearchBarContainer show={showSearch}>
        <SearchInput
          ref={searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          onBlur={handleSearchBlur}
        />
        <SearchIcon />
      </SearchBarContainer>
      <SearchResultsContainer show={showSearchResults}>
        <SearchResultsHeader>
          <SearchResultsTitle>
            Search Results for: {searchQuery}
          </SearchResultsTitle>
          <CloseSearchResults onClick={handleCloseSearchResults}>
            <FaTimesCircle />
          </CloseSearchResults>
        </SearchResultsHeader>
        {searchResults.map((result, index) => (
          <SearchResultItem key={index}>
            <SearchResultTitle>{result.title}</SearchResultTitle>
            <SearchResultDescription>
              {result.description}
            </SearchResultDescription>
          </SearchResultItem>
        ))}
      </SearchResultsContainer>
      {renderContent()}
      <BottomNavContainer>
        <NavContentContainer>
          <MenuItem
            active={activeMenuItem === "home"}
            onClick={() => {
              setActiveMenuItem("home");
              setShowDropUp(false);
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            active={activeMenuItem === "security"}
            onClick={() => {
              setActiveMenuItem("security");
              setShowDropUp(false);
            }}
          >
            Security
          </MenuItem>
          <MenuItem
            active={activeMenuItem === "analysis"}
            onClick={() => {
              setActiveMenuItem("analysis");
              setShowDropUp(false);
            }}
          >
            Analysis
          </MenuItem>
          <MenuItem
            active={activeMenuItem === "assistant"}
            onClick={() => {
              setActiveMenuItem("assistant");
              setShowDropUp(false);
            }}
          >
            Assistant
          </MenuItem>
        </NavContentContainer>
      </BottomNavContainer>
    </OuterContainer>
  );
}

export default Main;
