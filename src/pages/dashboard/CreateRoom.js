import React, { useState } from 'react';
import {
  Stack,
  Text,
  Flex,
  Select,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Switch,
} from '@chakra-ui/react';
import { timeToString } from '../../utils/timeToString';

const CreateRoom = ({ getCreateRoomData }) => {
  const milliseconds = 60 * 60 * 1000;

  const [maxTeams, setMaxTeams] = useState(2);
  const [maxPerTeam, setMaxPerTeam] = useState(1);
  const [maxPerRoom, setMaxPerRoom] = useState(2);
  const [timeLimit, setTimeLimit] = useState(0.5 * milliseconds);
  const [maxQuestions, setMaxQuestions] = useState(3);
  const [maxVetoQuestions, setMaxVetoQuestions] = useState(3);
  const [maxVetoVotes, setMaxVetoVotes] = useState(1);
  const [privateRoom, setPrivateRoom] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const numberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const timeOptions = [0.5, 1, 3, 6, 12, 24, 48];
  const vetoVoteOptions = [];

  for (let i = 0; i < numberOptions.length; i++) {
    const number = numberOptions[i];
    numberOptions[i] = { label: number, value: number };
  }

  for (let i = 0; i < timeOptions.length; i++) {
    const time = timeOptions[i];
    timeOptions[i] = {
      label: timeToString(time),
      value: time * milliseconds,
    };
  }

  for (let i = 1; i < maxVetoQuestions; i++) {
    vetoVoteOptions.push({ label: i, value: i });
  }

  // Creating options for create room dialog
  const maxTeamOptions = numberOptions.map((item, index) => {
    return (
      <option key={index} value={item.value}>
        {item.label}
      </option>
    );
  });

  const maxRoomMemberOptions = numberOptions.map((item, index) => {
    return (
      <option key={index} value={item.value}>
        {item.label}
      </option>
    );
  });

  const maxTeamMemberOptions = numberOptions.map((item, index) => {
    return (
      <option key={index} value={item.value}>
        {item.label}
      </option>
    );
  });

  const maxQuestionsOption = numberOptions.map((item, index) => {
    return (
      <option key={index} value={item.value}>
        {item.label}
      </option>
    );
  });

  const maxVetoQuestionsOptions = numberOptions.map((item, index) => {
    return (
      <option key={index} value={item.value}>
        {item.label}
      </option>
    );
  });

  const maxVetoVotesOptions = vetoVoteOptions.map((item, index) => {
    return (
      <option key={index} value={item.value}>
        {item.label}
      </option>
    );
  });

  const maxTimeLimitOptions = timeOptions.map((item, index) => {
    return (
      <option key={index} value={item.value}>
        {item.label}
      </option>
    );
  });

  // Sending create room data into props
  const handleCreateRoom = () => {
    getCreateRoomData({
      max_teams: maxTeams,
      max_perTeam: maxPerTeam,
      max_perRoom: maxPerRoom,
      privateRoom,
      max_questions: maxQuestions,
      veto_quesCount: maxVetoQuestions,
      max_vote: maxVetoVotes,
      timeLimit,
    });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} marginRight='1em' colorScheme='codeRoyale'>
        Create Room
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Stack width='50%'>
                <Text>Maximum Teams</Text>
                <Select
                  value={maxTeams}
                  onChange={(e) => setMaxTeams(e.target.value)}
                >
                  {maxTeamOptions}
                </Select>
                <Text>Maximum Members in Room</Text>
                <Select
                  value={maxPerRoom}
                  onChange={(e) => setMaxPerRoom(e.target.value)}
                >
                  {maxRoomMemberOptions}
                </Select>
                <Text>Maximum Members in a Team</Text>
                <Select
                  value={maxPerTeam}
                  onChange={(e) => setMaxPerTeam(e.target.value)}
                >
                  {maxTeamMemberOptions}
                </Select>
                <Text>Private Room?</Text>
                <Switch
                  colorScheme='red'
                  isChecked={privateRoom}
                  onChange={() => setPrivateRoom(!privateRoom)}
                />
              </Stack>
              <Stack width='50%'>
                <Text>Maximum Questions</Text>
                <Select
                  value={maxQuestions}
                  onChange={(e) => setMaxQuestions(e.target.value)}
                >
                  {maxQuestionsOption}
                </Select>
                <Text>Maximum Veto Questions</Text>
                <Select
                  value={maxVetoQuestions}
                  onChange={(e) => setMaxVetoQuestions(e.target.value)}
                >
                  {maxVetoQuestionsOptions}
                </Select>
                <Text>Maximum Veto Votes</Text>
                <Select
                  value={maxVetoVotes}
                  onChange={(e) => setMaxVetoVotes(e.target.value)}
                >
                  {maxVetoVotesOptions}
                </Select>
                <Text>Time Limit</Text>
                <Select
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                >
                  {maxTimeLimitOptions}
                </Select>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='orange' mr={3} onClick={handleCreateRoom}>
              Create Room
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateRoom;
