import React from "react";
import styled from "styled-components";

const AnalysisContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  color: #00ffff;
  overflow: hidden;
`;

const AnalysisColumn = styled.div`
  background-color: rgba(0, 255, 255, 0.1);
  border-radius: 30px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow: auto;
  grid-row: span 2;
`;

const LargeColumn = styled(AnalysisColumn)`
  grid-column: span 2;
  grid-row: span 4;
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

function Analysis() {
  return (
    <AnalysisContainer>
      <LargeColumn>
        <Title>Security Event Trends</Title>
        <PlaceholderText>
          Comprehensive graphs and charts showing frequency of security events
          over time, including daily, weekly, and monthly reports.
        </PlaceholderText>
      </LargeColumn>
      <AnalysisColumn>
        <Title>Motion Detection</Title>
        <PlaceholderText>
          Movement patterns and heat maps of activity in different areas of the
          home.
        </PlaceholderText>
      </AnalysisColumn>
      <AnalysisColumn>
        <Title>Camera Insights</Title>
        <PlaceholderText>
          Summary of most active cameras and recent recordings.
        </PlaceholderText>
      </AnalysisColumn>
      <AnalysisColumn>
        <Title>Smart Lock Usage</Title>
        <PlaceholderText>
          Analysis of entry/exit times and frequently used access points.
        </PlaceholderText>
      </AnalysisColumn>
      <AnalysisColumn>
        <Title>Security Score</Title>
        <PlaceholderText>
          Overall security efficiency rating and performance breakdown.
        </PlaceholderText>
      </AnalysisColumn>
    </AnalysisContainer>
  );
}

export default Analysis;
