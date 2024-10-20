import React from "react";
import styled from "styled-components";

const AssistantContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 255, 255, 0.3);
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  color: #00ffff;
  overflow: hidden;
`;

const AssistantColumn = styled.div`
  background-color: rgba(0, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 255, 255, 0.2);
  overflow: auto;
`;

const LargeColumn = styled(AssistantColumn)`
  grid-row: span 2;
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

function Assistant() {
  return (
    <AssistantContainer>
      <LargeColumn>
        <Title>AI Chat Interface</Title>
        <PlaceholderText>
          The main chat interface for interacting with the AI assistant will be
          implemented here.
        </PlaceholderText>
      </LargeColumn>
      <AssistantColumn>
        <Title>Quick Actions</Title>
        <PlaceholderText>
          Buttons for common security actions will be placed in this section.
        </PlaceholderText>
      </AssistantColumn>
      <AssistantColumn>
        <Title>Recent Alerts</Title>
        <PlaceholderText>
          A list of recent security alerts and notifications will be displayed
          here.
        </PlaceholderText>
      </AssistantColumn>
    </AssistantContainer>
  );
}

export default Assistant;
