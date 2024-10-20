import React from "react";
import styled from "styled-components";
import { FaTv, FaPowerOff, FaPlus } from "react-icons/fa";

const TvContentContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(208, 208, 208, 0.3);
  v
  color: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const TvIcon = styled(FaTv)`
  margin-right: 10px;
  color: #00ffff;
`;

const PowerButton = styled.button`
  background: none;
  border: none;
  color: #ff4136;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ff0000;
  }
`;

const TvType = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #00ffff;
`;

const StreamingLogs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const StreamingService = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  color: #ffffff;
`;

const ServiceIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const AddButton = styled.button`
  background-color: #00ffff;
  color: #000000;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 1em;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  flex-direction: row;

  &:hover {
    background-color: #00cccc;
  }
`;

const PlusIcon = styled(FaPlus)`
  margin-right: 5px;
`;

function TvContent() {
  return (
    <TvContentContainer>
      <Header>
        <Title>
          <TvIcon />
          TV
        </Title>
        <PowerButton>
          <FaPowerOff />
        </PowerButton>
      </Header>
      <TvType>Samsung Smart TV</TvType>
      <StreamingLogs>
        <StreamingService>
          <ServiceIcon src="/images/netflix-logo.png" alt="Netflix" />
          Netflix
        </StreamingService>
        <StreamingService>
          <ServiceIcon src="/images/disney-plus-logo.png" alt="Disney+" />
          Disney+
        </StreamingService>
        <StreamingService>
          <ServiceIcon src="/images/hbo-max-logo.png" alt="HBO Max" />
          HBO Max
        </StreamingService>
        <StreamingService>
          <ServiceIcon src="/images/prime-video-logo.png" alt="Prime Video" />
          Prime Video
        </StreamingService>
      </StreamingLogs>
      <AddButton>
        <PlusIcon />
        Add
      </AddButton>
    </TvContentContainer>
  );
}

export default TvContent;
