import React, { Component } from 'react';
import colors from '../utils/colors';

const AccountInfo = ({id, email}) => (
  <div style={{padding: '10px'}}>
    <strong>{email}</strong><br />
    <span style={{color: colors.gray }}>{id}</span>
  </div>
);

export default AccountInfo;
