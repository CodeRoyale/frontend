import React from 'react';
import DashboardNavBar from '../../components/dashboardNavBar/DashboardNavBar';
import ShareLinkCardFriend from '../../components/shareLinkCardFriend/ShareLinkCardFriend';
import './LobbyMain.css';

function LobbyMain() {
  const friendLink = 'Share this link'; // Get this from API...
  const profileData = {
    imageUrl:
      'https://media-exp1.licdn.com/dms/image/C5103AQHuIxezqseoGQ/profile-displayphoto-shrink_200_200/0?e=1597276800&v=beta&t=tREaHG412Mr99Tfke80DMtuQtVQyB4378ptl3SlwDvI',
    username: 'Sawarni Swaroop',
    email: 'sawarni99@gmail.com',
  }; // Get this from API...;
  return (
    <div className='lobby'>
      <div className='lobby-header'>
        <DashboardNavBar profileData={profileData} />
      </div>
      <div className='lobby-body'>
        <ShareLinkCardFriend
          profileData={profileData}
          sharableLink={friendLink}
        />
      </div>
    </div>
  );
}

export default LobbyMain;