import React, { useState, useRef } from 'react';
import './ArenaMain.css';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/snippets/c_cpp';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/snippets/java';

import 'ace-builds/src-noconflict/ext-language_tools';
import Button from '../../components/button/Button';
import Popper from '@material-ui/core/Popper';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import PropTypes from 'prop-types';
import SettingsIcon from '@material-ui/icons/Settings';
import { Row, Col } from 'antd';

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

function Solution() {
  const [ideLanguage, setLanguage] = useState('c_cpp');
  const [ideFontSize, setFontSize] = useState('12');
  const [ideTheme, setTheme] = useState('terminal');
  const [ideCode, setCode] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const Alan = useRef('ace');

  const open = Boolean(anchorEl);
  const id = open ? 'spring-popper' : undefined;

  function onChangeIDE(newValue) {
    //console.log('change', newValue);
    setCode(newValue);
  }

  const SendCode = () => {
    console.log(ideCode);
  };

  return (
    <div>
      <div className='solution-body'>
        <div className='solution-header'>
          <div className='solution-title'>SOLUTION</div>

          <div className='solution-heading-right'>
            <div className='language-options'>
              <select onChange={(e) => setLanguage(e.target.value)}>
                <option value='c_cpp'>c++</option>
                <option value='java'>java</option>
                <option value='python'>python</option>
              </select>
            </div>

            <div className='ide-options'>
              <div>
                <SettingsIcon
                  aria-describedby={id}
                  onClick={handleClick}
                ></SettingsIcon>

                <Popper id={id} open={open} anchorEl={anchorEl} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps}>
                      <div className='ide-options-popup'>
                        <>
                          <Row className='ide-options-row'>
                            <Col span={20}>
                              <div>FontSize:</div>
                            </Col>
                            <Col span={20}>
                              <div>
                                <select
                                  onChange={(e) =>
                                    setFontSize(Number(e.target.value))
                                  }
                                >
                                  <option value='10'>10</option>
                                  <option value='12'>12</option>
                                  <option value='14'>14</option>
                                  <option value='16'>16</option>
                                  <option value='18'>18</option>
                                  <option value='20'>20</option>
                                  <option value='22'>22</option>
                                  <option value='24'>24</option>
                                </select>
                              </div>
                            </Col>
                          </Row>
                          <Row className='ide-options-row'>
                            <Col span={20}>
                              <div>Theme:</div>
                            </Col>
                            <Col span={20}>
                              <div>
                                <select
                                  onChange={(e) => setTheme(e.target.value)}
                                >
                                  <option value='tomorrow'>tomorrow</option>
                                  <option value='terminal'>terminal</option>
                                  <option value='monokai'>monokai</option>
                                </select>
                              </div>
                            </Col>
                          </Row>
                        </>
                      </div>
                    </Fade>
                  )}
                </Popper>
              </div>
            </div>
          </div>
        </div>

        <div id='MyAceEditor' className='solution-content'>
          <AceEditor
            ref={Alan}
            height='100%'
            width='100%'
            mode={ideLanguage}
            theme={ideTheme}
            fontSize={ideFontSize}
            showGutter={true}
            showPrintMargin={false}
            editorProps={{ $blockScrolling: Infinity }}
            onChange={onChangeIDE}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: false,
              enableSnippets: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>
      <div className='button-container'>
        <Button
          type='button'
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
          onClick={SendCode}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
}

export default Solution;
