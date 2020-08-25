import React from 'react';
import Button from '../../components/button/Button';

function StartCompetitionButton({ socket }) {
  const onClickStartCompetition = () => {
    //TODO: Do your work here....
  };
  return (
    <div className='start-competition-view'>
      <div className='start-competition-view-text'>
        <b>Start Competition</b>
      </div>
      <div className='start-competition-view-button'>
        <Button
          type='button'
          onClick={onClickStartCompetition}
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default StartCompetitionButton;