import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Stack,
  Text,
} from '@chakra-ui/react';
import TeamScoreCard from './TeamScoreCard';
import { connect } from 'react-redux';

const ArenaScore = ({ arenaData, roomData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let questionsList;
  if (arenaData.questions) {
    questionsList = arenaData.questions.payload.data;
  }

  const teamsList = [];
  if (roomData.data) {
    for (let team in roomData.data.teams) {
      teamsList.push(team);
    }
  }

  const problemCodes = [];
  if (questionsList) {
    for (let i = 0; i < questionsList.length; i++) {
      problemCodes.push(questionsList[i].problemCode);
    }
  }

  let teamScoreCards;
  teamScoreCards = teamsList.map((team, index) => {
    return <TeamScoreCard key={index} teamName={team} />;
  });

  return (
    <>
      <Button
        marginRight='0.8em'
        marginTop='1em'
        marginBottom='1em'
        onClick={onOpen}
      >
        View Score
      </Button>

      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>Score</DrawerHeader>
            <DrawerBody>
              <Stack>
                {problemCodes.map((problemCode, index) => {
                  return (
                    <Stack key={index}>
                      <Text>{problemCode}</Text>
                      {teamScoreCards}
                    </Stack>
                  );
                })}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => ({
  arenaData: state.arenaData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, null)(ArenaScore);
