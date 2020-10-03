import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { veto, resetVetoAction } from '../../actions/vetoActions';
import { Loader, Alert, Button } from 'rsuite';

const StartCompetitionButton = ({
  socketData,
  vetoData,
  veto,
  resetVetoAction,
}) => {
  const socket = socketData.socket;

  const onClickStartCompetition = () => {
    veto(socket);
  };

  // To show alerts for errors
  useEffect(() => {
    if (vetoData.type === 'VETO_FAIL') {
      Alert.error(vetoData.error);
      resetVetoAction();
    }
  }, [vetoData.type, vetoData.error, resetVetoAction]);

  let content = (
    <div className='start-competition-view'>
      <div className='start-competition-view-button'>
        <Button onClick={onClickStartCompetition} appearance='primary'>
          Start Competition
        </Button>
      </div>
    </div>
  );

  // Show loading if veto is requested by admin
  if (vetoData.vetoRequested) {
    content = (
      <div className='start-competition-view'>
        <Loader size='md' content='Waiting for veto to start..' />
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  vetoData: state.vetoData,
});

export default connect(mapStateToProps, { veto, resetVetoAction })(
  StartCompetitionButton
);
