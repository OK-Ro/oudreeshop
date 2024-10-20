import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import {
  FaPowerOff,
  FaCircle,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
  FaRecordVinyl,
} from "react-icons/fa";
import { GiOldMicrophone } from "react-icons/gi";
import { TbCaptureFilled } from "react-icons/tb";
import { BsSoundwave } from "react-icons/bs";

const CameraPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(208, 208, 208, 0.3);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #333;
`;

const LeftHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const LiveIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  font-weight: bold;
  color: #00ffff;
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

const RedDot = styled(FaCircle)`
  color: #ff0000;
  margin-right: 5px;
  font-size: 0.8em;
  animation: ${pulse} 2s infinite, ${blink} 1s infinite;
  filter: brightness(1.5) drop-shadow(0 0 5px #ff0000);
`;

const PowerButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: -40px;
  margin-left: -40px;

  &:hover {
    color: #ff4136;
  }
`;

const CameraFeed = styled.div`
  flex: 1;
  background-color: #000;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VoiceIndicator = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  border-radius: 15px;
`;

const SoundwaveIcon = styled(BsSoundwave)`
  color: ${(props) => (props.active ? "#00ffff" : "#555")};
  font-size: 1.2em;
  margin-right: 5px;
  animation: ${(props) => (props.active ? pulse : "none")} 0.5s infinite;
`;

const TimeStamp = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 0.9em;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  border-radius: 15px;
  color: #00ffff;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  background-color: rgba(208, 208, 208, 0.3);
  border-top: 1px solid #333;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
  margin: 0 30px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    color: #ffffff;
    background-color: rgba(0, 255, 255, 0.1);
  }

  ${(props) =>
    props.active &&
    css`
      color: #ff4136;
      background-color: rgba(255, 65, 54, 0.1);
    `}
`;

const ControlLabel = styled.span`
  font-size: 0.8rem;
  margin-top: 5px;
`;

const RoomSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8em;
  color: #ffffff;
  margin-top: 5px;
  width: 100%;
`;

const RoomSelectorButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.2em;
  padding: 5px;

  &:hover {
    color: #00ffff;
  }
`;

const RoomName = styled.div`
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
  margin: 0 120px;
`;
const RecordingIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 65, 54, 0.7);
  padding: 5px 10px;
  border-radius: 15px;
  color: #ffffff;
`;

const RecordingDot = styled(FaCircle)`
  color: #ffffff;
  margin-right: 5px;
  font-size: 0.8em;
  animation: ${blink} 1s infinite;
`;

const ErrorMessage = styled.div`
  color: #ff4136;
  font-size: 1em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ErrorIcon = styled(FaExclamationTriangle)`
  font-size: 2em;
  margin-bottom: 10px;
`;

function CameraPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true); // Set to true by default
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVoiceDetected, setIsVoiceDetected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(0);
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const rooms = ["Living Room", "Kitchen", "Bedroom", "Front Door"];
  const videoSources = [
    "/videos/livingroom.mp4",
    "/videos/kitchenroom.mp4",
    "/videos/bedroom.mp4",
    "/videos/frontdoor.mp4",
  ];

  useEffect(() => {
    let timer;
    if (isPowerOn && !isRecording) {
      timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPowerOn, isRecording]);

  useEffect(() => {
    const voiceDetectionTimer = setInterval(() => {
      setIsVoiceDetected(Math.random() > 0.5);
    }, 3000);

    return () => {
      clearInterval(voiceDetectionTimer);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMicOn;
    }
  }, [isMicOn]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordingStartTime(null);
    } else {
      setIsRecording(true);
      setRecordingStartTime(new Date());
    }
  };

  const toggleMic = () => setIsMicOn(!isMicOn);
  const togglePower = () => setIsPowerOn(!isPowerOn);
  const captureScreenshot = () => {
    console.log("Screenshot captured");
    // In a real app, you'd implement actual screenshot functionality here
  };

  const changeRoom = (direction) => {
    setCurrentRoom((prevRoom) => {
      const newRoom =
        direction === "next"
          ? (prevRoom + 1) % rooms.length
          : (prevRoom - 1 + rooms.length) % rooms.length;
      resetVideoError();
      return newRoom;
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getDisplayTime = () => {
    if (isRecording && recordingStartTime) {
      const elapsedTime = new Date(currentTime - recordingStartTime);
      return formatTime(elapsedTime);
    }
    return formatTime(currentTime);
  };

  const handleVideoError = (e) => {
    console.error("Video failed to load:", e);
    console.error("Video source:", videoSources[currentRoom]);
    console.error("Error name:", e.target.error.name);
    console.error("Error message:", e.target.error.message);
    setVideoError(true);
  };

  const resetVideoError = () => {
    setVideoError(false);
  };

  return (
    <CameraPageContainer>
      <Header>
        <LeftHeader>
          <LiveIndicator>
            <RedDot />
            Live camera
          </LiveIndicator>
          <RoomSelector>
            <RoomSelectorButton onClick={() => changeRoom("prev")}>
              <FaChevronLeft />
            </RoomSelectorButton>
            <RoomName>{rooms[currentRoom]}</RoomName>
            <RoomSelectorButton onClick={() => changeRoom("next")}>
              <FaChevronRight />
            </RoomSelectorButton>
          </RoomSelector>
        </LeftHeader>
        <PowerButton onClick={togglePower}>
          <FaPowerOff />
        </PowerButton>
      </Header>
      <CameraFeed>
        {isPowerOn ? (
          <>
            {videoError ? (
              <ErrorMessage>
                <ErrorIcon />
                <div>Failed to load video for {rooms[currentRoom]}</div>
                <div>
                  Error: {videoRef.current?.error?.message || "Unknown error"}
                </div>
              </ErrorMessage>
            ) : (
              <video
                ref={videoRef}
                src={videoSources[currentRoom]}
                autoPlay
                loop
                playsInline
                onError={handleVideoError}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            <VoiceIndicator>
              <SoundwaveIcon active={isVoiceDetected && isMicOn} />
            </VoiceIndicator>
            <TimeStamp>{getDisplayTime()}</TimeStamp>
            {isRecording && (
              <RecordingIndicator>
                <RecordingDot />
                REC
              </RecordingIndicator>
            )}
          </>
        ) : (
          <ErrorMessage>Camera Off</ErrorMessage>
        )}
      </CameraFeed>
      <ControlBar>
        <ControlButton onClick={toggleMic} active={isMicOn}>
          <GiOldMicrophone />
          <ControlLabel>Micro</ControlLabel>
        </ControlButton>
        <ControlButton onClick={toggleRecording} active={isRecording}>
          <FaRecordVinyl />
          <ControlLabel>Record</ControlLabel>
        </ControlButton>
        <ControlButton onClick={captureScreenshot}>
          <TbCaptureFilled />
          <ControlLabel>Capture</ControlLabel>
        </ControlButton>
      </ControlBar>
    </CameraPageContainer>
  );
}

export default CameraPage;
