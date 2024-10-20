import React from "react";
import styled from "styled-components";
import {
  FaPlus,
  FaPause,
  FaSpotify,
  FaVolumeUp,
  FaMobileAlt,
} from "react-icons/fa";
import { WiDaySunny, WiCloudy, WiRain, WiDayCloudy } from "react-icons/wi";

const SmartHomeContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("/livingpic.jpeg");
  background-size: cover;
  background-position: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  overflow: hidden;
  padding: 10px;
`;

const RoomMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: rgba(208, 208, 208, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 10px;
`;

const RoomList = styled.div`
  display: flex;
  gap: 15px;
`;

const RoomItem = styled.div`
  padding: 10px 15px;

  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const AddNewSpace = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  height: 14vh;
`;

const SpotifyContainer = styled.div`
  background-color: rgba(208, 208, 208, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  width: 52%;
`;

const AlbumCover = styled.div`
  width: 60px;
  height: 60px;
  background-color: #333;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

const SongInfo = styled.div`
  flex-grow: 1;
`;

const SongName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ArtistName = styled.div`
  font-size: 0.9em;
  color: #aaa;
`;

const SpotifyLogo = styled(FaSpotify)`
  font-size: 24px;
  margin-right: 15px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #555;
  border-radius: 2px;
  margin-top: 10px;
  position: relative;
`;

const Progress = styled.div`
  width: 30%;
  height: 100%;
  background-color: #1db954;
  border-radius: 2px;
`;

const TimeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #aaa;
  margin-top: 5px;
`;

const SpeakerContainer = styled.div`
  background-color: rgba(208, 208, 208, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 10px;
  width: 23%;
`;

const SpeakerTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const SpeakerName = styled.div`
  font-size: 1em;
  margin-bottom: 10px;
`;

const ConnectedDevice = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  color: #aaa;
`;

const WeatherContainer = styled.div`
  background-color: rgba(208, 208, 208, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 10px;
  width: 23%;
`;

const Temperature = styled.div`
  font-size: 2em;
  margin-bottom: 10px;
`;

const WeatherForecast = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8em;
`;

function SmartHome() {
  return (
    <SmartHomeContainer>
      <RoomMenu>
        <RoomList>
          <RoomItem>Living Room</RoomItem>
          <RoomItem>Kitchen</RoomItem>
          <RoomItem>Bedroom</RoomItem>
          <RoomItem>Bathroom</RoomItem>
          <RoomItem>Office</RoomItem>
          <RoomItem>Garden</RoomItem>
        </RoomList>
        <AddNewSpace>
          <FaPlus style={{ marginRight: "5px" }} />
          New Space
        </AddNewSpace>
      </RoomMenu>
      <BottomContainer>
        <SpotifyContainer>
          <AlbumCover>
            <FaPause color="#fff" size={24} />
          </AlbumCover>
          <SongInfo>
            <SongName>Song Name</SongName>
            <ArtistName>Artist Name</ArtistName>
            <ProgressBar>
              <Progress />
            </ProgressBar>
            <TimeInfo>
              <span>0:53</span>
              <span>2:38</span>
            </TimeInfo>
          </SongInfo>
          <SpotifyLogo />
        </SpotifyContainer>
        <SpeakerContainer>
          <SpeakerTitle>
            <FaVolumeUp style={{ marginRight: "5px" }} />
            Speaker
          </SpeakerTitle>
          <SpeakerName>Sonos</SpeakerName>
          <ConnectedDevice>
            <FaMobileAlt style={{ marginRight: "5px" }} />
            Lily's iPhone
          </ConnectedDevice>
        </SpeakerContainer>
        <WeatherContainer>
          <Temperature>22°C</Temperature>
          <WeatherForecast>
            <ForecastItem>
              <WiDaySunny size={24} />
              <div>Now</div>
            </ForecastItem>
            <ForecastItem>
              <WiCloudy size={24} />
              <div>11AM</div>
            </ForecastItem>
            <ForecastItem>
              <WiRain size={24} />
              <div>12PM</div>
            </ForecastItem>
            <ForecastItem>
              <WiDayCloudy size={24} />
              <div>1PM</div>
            </ForecastItem>
            <ForecastItem>
              <WiDaySunny size={24} />
              <div>2PM</div>
            </ForecastItem>
          </WeatherForecast>
        </WeatherContainer>
      </BottomContainer>
    </SmartHomeContainer>
  );
}

export default SmartHome;
