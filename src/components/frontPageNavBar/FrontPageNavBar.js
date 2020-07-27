import React from 'react';
import LogoContainer from '../logoContainer/LogoContainer';
import { useHistory } from 'react-router-dom';
import './FrontPageNavBar.css';
import Button from '../button/Button';

function FrontPageNavBar() {
  // Redirect to /login
  const history = useHistory();
  const loginRedirect = () => {
    let path = `login`;
    history.push(path);
  };

  return (
    <div className='frontpage-navbar'>
      <LogoContainer />
      <div className='frontpage-navbar-links'>
        <ul>
          <li>
            Play
            <div className='play-menu'>
              <div className='play-menu-options'>
                <div className='play-item-with-friend'>
                  <img
                    alt='programming'
                    src='images/friends.svg'
                    width='150px'
                    height='150px'
                  />
                  <h4>Play with a friend</h4>
                  <p>Challenge a friend to a 1v1 coding competition.</p>
                </div>
                <div className='play-item-with-random'>
                  <img
                    alt='programming'
                    src='images/random.svg'
                    width='150px'
                    height='150px'
                  />
                  <h4>Play with a random coder</h4>
                  <p>Compete with a random coder from around the globe.</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Button
        type='button'
        onClick={loginRedirect}
        buttonStyle='btn--primary--normal'
        buttonSize='btn--small'
      >
        Sign in
      </Button>
    </div>
  );
}

export default FrontPageNavBar;