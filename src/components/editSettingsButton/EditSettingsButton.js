import React from 'react';
import './EditSettingsButton.css';

function EditSettingsButton() {
  const onClickSettings = () => {
    // TODO: Function to go to settings page...
  };
  return (
    <div>
      <button className='button-settings' onClick={onClickSettings}>
        Edit Settings
      </button>
    </div>
  );
}

export default EditSettingsButton;