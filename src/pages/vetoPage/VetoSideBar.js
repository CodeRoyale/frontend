import React from 'react';
import Chat from '../../components/chat/Chat';
import VetoStatus from './VetoStatus';
import './VetoMain.css';

const VetoSideBar = ({
  vetoUsers,
  userProfilePictures,
  vetoCompletedUsers,
}) => {
  return (
    <div className='veto-side-bar'>
      <VetoStatus
        vetoUsers={vetoUsers}
        userProfilePictures={userProfilePictures}
        vetoCompletedUsers={vetoCompletedUsers}
      />
      <hr />
      <p className='chat-head'>Team Chat</p>
      <Chat />
    </div>
  );
};

export default VetoSideBar;
