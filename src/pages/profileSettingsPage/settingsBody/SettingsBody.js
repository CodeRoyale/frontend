import React from 'react';
import './SettingsBody.css';
import SaveButton from '../../../components/saveButton/SaveButton';
import SettingsField from '../../../components/settingsField/SettingsField';

function SettingsBody() {
  return (
    <div className='settings-container'>
      <div className='settings-forms'>
        <div className='settings-title'>Profile Settings</div>

        <SettingsField heading='First Name' value='Alan' disabled={false} />
        <SettingsField heading='Last Name' value='Henry' disabled={false} />
        <SettingsField
          heading='Email'
          value='alanhenry@gmail.com'
          disabled={true}
        />

        <SaveButton />
      </div>

      <img
        className='settings-image'
        alt='setting illustration'
        src='/images/settings.svg'
      />
    </div>
  );
}

export default SettingsBody;
