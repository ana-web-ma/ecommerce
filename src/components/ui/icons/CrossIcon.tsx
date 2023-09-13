import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';
import { type ReactElement } from 'react';

function CrossIcon(props: SvgIconProps): ReactElement {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M15 5L5 15"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 5L15 15"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

CrossIcon.propTypes = {};

export default CrossIcon;
