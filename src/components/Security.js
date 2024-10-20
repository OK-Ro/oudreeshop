import React from "react";
import styled from "styled-components";
import CameraPage from "./CameraPage";

const SecurityContainer = styled.div`
  flex: 1;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 255, 255, 0.3);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  color: #00ffff;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

const SecurityColumn = styled.div`
  background-color: rgba(0, 255, 255, 0.1);
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 255, 255, 0.2);
`;

const LargeColumn = styled(SecurityColumn)`
  grid-column: span 2;
`;

const Title = styled.h3`
  font-size: 1.2em;
  margin-bottom: 10px;
  text-align: center;
`;

const PlaceholderText = styled.p`
  text-align: center;
  color: rgba(0, 255, 255, 0.7);
`;

function Security() {
  return (
    <SecurityContainer>
      <LargeColumn>
        <Title>Security Status</Title>
        <PlaceholderText>
          System status, arm/disarm controls, and alert notifications will be
          displayed here.
        </PlaceholderText>
      </LargeColumn>
      <SecurityColumn>
        <CameraPage />
      </SecurityColumn>
      <SecurityColumn>
        <Title>Smart Locks</Title>
        <PlaceholderText>
          Control and status of smart locks for doors and windows will be
          managed here.
        </PlaceholderText>
      </SecurityColumn>
      <SecurityColumn>
        <Title>Activity Log</Title>
        <PlaceholderText>
          A detailed log of security-related events and activities will be
          displayed in this area.
        </PlaceholderText>
      </SecurityColumn>
      <SecurityColumn>
        <Title>System Settings</Title>
        <PlaceholderText>
          Configure alarm sensitivity, notification preferences, and other
          security system settings.
        </PlaceholderText>
      </SecurityColumn>
    </SecurityContainer>
  );
}

export default Security;
