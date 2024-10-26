import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaPowerOff,
  FaFan,
  FaClock,
  FaCog,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

const AirConditionerContainer = styled.div`
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
`;

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

const GreenDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #00ff00;
  border-radius: 50%;
  margin-right: 10px;
  animation: ${blink} 1s infinite;
`;

const PowerButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #00ffff;
  }
`;

const RoomName = styled.div`
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const TemperatureDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const TemperatureCurve = styled.div`
  width: 100%;
  height: 100px;
  background: linear-gradient(to right, #00ffff, #ff00ff);
  border-radius: 50px;
  margin-bottom: 20px;
`;

const TemperatureControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #00ffff;
  }
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ControlItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ControlIcon = styled.div`
  font-size: 1.5em;
  margin-bottom: 5px;
`;

const ControlText = styled.div`
  font-size: 0.8em;
`;

function AirConditioner() {
  const [temperature, setTemperature] = useState(22);
  const [isPowerOn, setIsPowerOn] = useState(true);

  const increaseTemperature = () => {
    if (isPowerOn) {
      setTemperature((prev) => Math.min(prev + 1, 30));
    }
  };

  const decreaseTemperature = () => {
    if (isPowerOn) {
      setTemperature((prev) => Math.max(prev - 1, 16));
    }
  };

  const togglePower = () => {
    setIsPowerOn((prev) => !prev);
  };

  return (
    <AirConditionerContainer>
      <Header>
        <div style={{ display: "flex", alignItems: "center" }}>
          {isPowerOn && <GreenDot />}
          <Title>Air Conditioner</Title>
        </div>
        <PowerButton onClick={togglePower}>
          <FaPowerOff />
        </PowerButton>
      </Header>
      <RoomName>Living Room</RoomName>
      {isPowerOn ? (
        <>
          <TemperatureDisplay>{temperature}°C</TemperatureDisplay>
          <TemperatureCurve />
          <TemperatureControls>
            <ControlButton onClick={decreaseTemperature}>
              <FaMinus />
            </ControlButton>
            <ControlButton onClick={increaseTemperature}>
              <FaPlus />
            </ControlButton>
          </TemperatureControls>
          <ControlsRow>
            <ControlItem>
              <ControlIcon>
                <FaFan />
              </ControlIcon>
              <ControlText>Fan Speed</ControlText>
            </ControlItem>
            <ControlItem>
              <ControlIcon>
                <FaClock />
              </ControlIcon>
              <ControlText>Timer</ControlText>
            </ControlItem>
            <ControlItem>
              <ControlIcon>
                <FaCog />
              </ControlIcon>
              <ControlText>Mode</ControlText>
            </ControlItem>
          </ControlsRow>
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>The air conditioner is off.</p>
        </div>
      )}
    </AirConditionerContainer>
  );
}

export default AirConditioner;
