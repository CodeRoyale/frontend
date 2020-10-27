import React, { useEffect } from 'react';
import Navbar from '../../components/navBar/NavBar';
import { useHistory } from 'react-router-dom';
import VetoBody from './VetoBody';
import { Loader } from 'rsuite';
import { connect } from 'react-redux';
import { vetoStop, vetoVoting } from '../../actions/vetoActions';
import VetoRight from './VetoRight';
import './VetoMain.css';

const VetoMain = ({ socketData, vetoData, vetoStop, vetoVoting }) => {
  const history = useHistory();
  const socket = socketData.socket;

  // To check if veto has ended
  useEffect(() => {
    if (socket !== null) {
      vetoStop(socket);
    }
  }, [socket, vetoStop]);

  // Checking if the socket is null
  // if (socket === null) {
  //   return <Redirect to='/lobby' />;
  // }

  if (vetoData.vetoEnded) {
    history.push('/arena');
  }

  // Send votes to server
  const handleConfirmVetoVotes = () => {
    // Only send votes if the votes array is not empty
    if (vetoData.vetoVotedQuestions.length !== 0) {
      vetoVoting(socket, vetoData.vetoVotedQuestions);
    }
  };

  // Default content
  let content = (
    <div className='veto-page'>
      <Navbar loggedIn={true} />
      <div className='veto-section'>
        <div className='veto-question-cards'>
          <VetoBody
            isLoading={vetoData.quesApiLoading}
            questions={vetoData.vetoQuestions}
          />
        </div>
        <div className='veto-right'>
          <VetoRight confirmVetoVotes={handleConfirmVetoVotes} />
        </div>
      </div>
    </div>
  );

  // Loading while fetching questions
  if (!vetoData.quesApiLoading) {
    content = (
      <div className='veto-page'>
        <Navbar loggedIn={true} />
        <div className='veto-section'>
          <div className='veto-question-cards'>
            <VetoBody
              isLoading={vetoData.quesApiLoading}
              questions={vetoData.vetoQuestions}
            />
          </div>
          <div className='veto-right'>
            <VetoRight confirmVetoVotes={handleConfirmVetoVotes} />
          </div>
        </div>
      </div>
    );
  }

  // Loading after user voted
  if (vetoData.userVoted) {
    content = (
      <div className='veto-page'>
        <Navbar />
        <div className='veto-page-loading'>
          <Loader size='sm' content='Waiting for others to vote...' />
        </div>
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  vetoData: state.vetoData,
  socketData: state.socketData,
});

export default connect(mapStateToProps, { vetoStop, vetoVoting })(VetoMain);
