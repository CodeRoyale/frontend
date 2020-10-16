import React from 'react';
import ChooseRoomCard from './ChooseRoomCard';
import './LobbyMain.css';
import NavBar from '../../components/navBar/NavBar';
import profileData from '../../utils/examples';

const LobbyMain = () => {
  return (
    <div className='lobby'>
      <div className='lobby-header'>
        <NavBar loggedIn={true} />
      </div>
      <div className='lobby-body'>
        <ChooseRoomCard
          profileData={profileData}
          sharableLink='Share this link'
        />
      </div>
    </div>
  );
};

export default LobbyMain;
