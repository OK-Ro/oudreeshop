import React from "react";
import styled from "styled-components";
import { FaFingerprint, FaHistory, FaPlus } from "react-icons/fa";

const BiometricsContainer = styled.div`
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
  display: flex;
  align-items: center;
`;

const FingerprintIcon = styled(FaFingerprint)`
  font-size: 1.2em;
  margin-right: 10px;
  color: #00ffff;
`;

const LogIcon = styled(FaHistory)`
  font-size: 1.2em;
  color: #00ffff;
  cursor: pointer;
`;

const SecurityText = styled.p`
  font-size: 0.9em;
  color: #00ffff;
  margin-bottom: 20px;
`;

const ProfilesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfilePic = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #00ffff;
  margin-right: 10px;
`;

const LastEntryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LastEntryText = styled.p`
  font-size: 0.9em;
`;

const AddButton = styled.button`
  background-color: #00ffff;
  color: #000000;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #00cccc;
  }
`;

const PlusIcon = styled(FaPlus)`
  margin-right: 5px;
`;

function Biometrics() {
  return (
    <BiometricsContainer>
      <Header>
        <Title>
          <FingerprintIcon />
          Biometric Access
        </Title>
        <LogIcon />
      </Header>
      <SecurityText>Security: Enhanced</SecurityText>
      <ProfilesContainer>
        <ProfilePic />
        <ProfilePic />
        <ProfilePic />
      </ProfilesContainer>
      <LastEntryContainer>
        <LastEntryText>Last entry: 07:34 AM</LastEntryText>
        <AddButton>
          <PlusIcon />
          Add
        </AddButton>
      </LastEntryContainer>
    </BiometricsContainer>
  );
}

export default Biometrics;
