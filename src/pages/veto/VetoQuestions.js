import React from 'react';
import VetoQuestionCard from './VetoQuestionCard';
import { Flex, Skeleton } from '@chakra-ui/react';

const VetoQuestions = ({ questionsLoading, questions, userVoted }) => {
  let questionsArray = null;
  let questionCards = null;

  // Mapping questions to the QuestionCard component
  if (questions !== undefined) {
    questionsArray = questions.payload.data;
    questionCards = questionsArray.map((item, index) => {
      return (
        <VetoQuestionCard
          key={index}
          questionNumber={index}
          questionTitle={item.questionTitle}
          questionDesc={item.description}
          questionID={item._id}
          questionTags={item.tags}
          userVoted={userVoted}
        />
      );
    });
  }

  // Default content
  let content = (
    <Flex
      justifyContent='center'
      alignItems='center'
      bgColor='whitesmoke'
      flexDir='column'
      padding='5px'
    >
      {questionCards}
    </Flex>
  );

  // Loading while fetching questions
  if (questionsLoading) {
    content = (
      <Flex padding='35px' flexDir='column'>
        <Skeleton height='20px' />
        <Skeleton height='20px' marginTop='0.5em' />
        <Skeleton height='20px' marginTop='0.5em' />
        <Skeleton height='20px' marginTop='1em' />
        <Skeleton height='20px' marginTop='0.5em' />
        <Skeleton height='20px' marginTop='0.5em' />
        <Skeleton height='20px' marginTop='1em' />
        <Skeleton height='20px' marginTop='0.5em' />
        <Skeleton height='20px' marginTop='0.5em' />
      </Flex>
    );
  }

  return content;
};

export default VetoQuestions;
