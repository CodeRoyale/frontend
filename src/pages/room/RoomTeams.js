import React from 'react';
import { Flex } from '@chakra-ui/layout';
import CreateTeam from './CreateTeam';
import { connect } from 'react-redux';
import TeamCard from './TeamCard';
import profileData from '../../utils/profileData';

const RoomTeams = ({ roomData }) => {
  const userName = profileData().userName;
  let roomTeams, roomConfig, roomAdmin;

  if (roomData.data) {
    roomTeams = roomData.data.teams;
    roomConfig = roomData.data.config;
    roomAdmin = roomData.data.config.admin;
  }

  // Setting Team Cards...
  let teamCards = [];
  for (var teamName in roomTeams) {
    teamCards.push(
      <TeamCard
        key={teamName}
        teamName={teamName}
        totalUsers={roomConfig['max_perTeam']}
        users={roomTeams[teamName]}
      />
    );
  }

  return (
    <Flex padding='0.4em'>
      {teamCards}
      {userName === roomAdmin ? <CreateTeam /> : null}
    </Flex>
  );
};

export const mapStateToProps = (state) => ({
  roomData: state.roomData,
});

export default connect(mapStateToProps, null)(RoomTeams);
