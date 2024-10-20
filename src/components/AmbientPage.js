import React from "react";
import styled from "styled-components";
import {
  FaLightbulb,
  FaPalette,
  FaRegLightbulb,
  FaClock,
} from "react-icons/fa";

const AmbientPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(208, 208, 208, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
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
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  margin-left: 10px;
`;

const SubTitle = styled.h3`
  font-size: 1.2em;
  color: #00ffff;
  margin-bottom: 15px;
`;

const ColorSection = styled.div`
  margin-bottom: 20px;
`;

const ColorBar = styled.div`
  height: 30px;
  background: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  border-radius: 15px;
  margin-top: 10px;
`;

const IntensitySection = styled.div`
  margin-bottom: 20px;
`;

const IntensityBar = styled.div`
  height: 30px;
  background: linear-gradient(to right, #333333, #ffffff);
  border-radius: 15px;
  margin-top: 10px;
`;

const ScheduleSection = styled.div`
  margin-bottom: 20px;
`;

const ScheduleTime = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Icon = styled.div`
  font-size: 1.2em;
  margin-right: 10px;
  color: #00ffff;
`;

function AmbientPage() {
  return (
    <AmbientPageContainer>
      <Header>
        <FaLightbulb size={24} color="#00ffff" />
        <Title>Ambient LED</Title>
      </Header>
      <SubTitle>Focal 1</SubTitle>

      <ColorSection>
        <IconWrapper>
          <Icon>
            <FaPalette />
          </Icon>
          Color
        </IconWrapper>
        <ColorBar />
      </ColorSection>

      <IntensitySection>
        <IconWrapper>
          <Icon>
            <FaRegLightbulb />
          </Icon>
          Intensity
        </IconWrapper>
        <IntensityBar />
      </IntensitySection>

      <ScheduleSection>
        <IconWrapper>
          <Icon>
            <FaClock />
          </Icon>
          Schedule
        </IconWrapper>
        <ScheduleTime>
          <div>On at 8:00 PM</div>
          <div>Off at 1:00 PM</div>
        </ScheduleTime>
      </ScheduleSection>
    </AmbientPageContainer>
  );
}

export default AmbientPage;
