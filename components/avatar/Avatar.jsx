import React from 'react';
import propTypes from 'prop-types';

// TODO: Change alt of image to userName
const UserAvatar = ({ avatarImage, ...props }) => (
  <div {...props}>
    <img
      className='rounded-full cursor-pointer'
      src={avatarImage}
      alt='User Avatar'
      width={45}
      height={45}
    />
  </div>
);

const RoomUserAvatar = ({ avatarImage }) => (
  <img
    className='rounded-full cursor-pointer'
    src={avatarImage}
    alt='Room User Avatar'
    width={60}
    height={60}
  />
);

export { UserAvatar, RoomUserAvatar };

UserAvatar.propTypes = {
  avatarImage: propTypes.string.isRequired,
};

RoomUserAvatar.propTypes = {
  avatarImage: propTypes.string.isRequired,
};