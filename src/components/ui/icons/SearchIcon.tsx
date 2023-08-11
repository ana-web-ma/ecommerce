import React from 'react';
import { SvgIcon, type SvgIconProps } from '@mui/material';
import { type ReactElement } from 'react';

function SearchIcon(props: SvgIconProps): ReactElement {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
        <path
          d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.9996 13.9996L11.0996 11.0996"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

SearchIcon.propTypes = {};

export default SearchIcon;
