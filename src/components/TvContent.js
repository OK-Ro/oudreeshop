import React from "react";
import styled from "styled-components";
import { FaTv, FaPowerOff, FaPlus } from "react-icons/fa";

const TvContentContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(208, 208, 208, 0.3);
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
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
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
  border-radius: 5px;
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
          <ServiceIcon
            src="https://vignette2.wikia.nocookie.net/logopedia/images/b/b2/NetflixIcon2016.jpg/revision/latest/scale-to-width-down/2000?cb=20160620223003"
            alt="Netflix"
          />
        </StreamingService>
        <StreamingService>
          <ServiceIcon
            src="https://static1.srcdn.com/wordpress/wp-content/uploads/2019/07/Disney-Plus-Logo.jpg"
            alt="Disney+"
          />
        </StreamingService>
        <StreamingService>
          <ServiceIcon
            src="https://logos-marcas.com/wp-content/uploads/2022/01/HBO-Max-Emblema.jpg"
            alt="HBO Max"
          />
        </StreamingService>
        <StreamingService>
          <ServiceIcon
            src="https://yt3.ggpht.com/a-/AAuE7mApuIUDPof3J4qtVrHcgcTOF1U80erjdmZnLg=s900-mo-c-c0xffffffff-rj-k-no"
            alt="Prime Video"
          />
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
