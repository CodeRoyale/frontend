import React from 'react';
import { Flex } from '@chakra-ui/layout';
import CreateTeam from './CreateTeam';
import TeamCard from './TeamCard';
import profileData from '../../utils/profileData';
import useRoom from '../../global-stores/useRoom';

const RoomTeams = () => {
  const room = useRoom((state) => state.room);

  const userName = profileData().userName;

  let roomTeams, roomConfig, roomAdmin;
  if (room) {
    roomTeams = room.teams;
    roomConfig = room.config;
    roomAdmin = room.config.admin;
  }

  // Setting up the team cards
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

export default RoomTeams;
