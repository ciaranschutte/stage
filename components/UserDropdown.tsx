import React, { useEffect, useState, useRef } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';

import defaultTheme from './theme';
import { Avatar, ChevronDown } from './theme/icons';

const CurrentUser = ({ userName = 'TestUser' }: { userName?: string }) => (
  <div
    css={(theme) =>
      css`
        color: ${theme.colors.accent2_dark};
        display: flex;
        align-items: center;
        justify-content: center;
      `
    }
  >
    <span
      css={css`
        padding-left: 5px;
        padding-right: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 142px;
      `}
    >
      Hello, {userName}
    </span>
  </div>
);

const StyledListLink = styled('a')`
  text-decoration: none;
  height: 40px;
  display: flex;
  align-items: center;
  background: ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.white)};
  padding: 6px 12px;
  color: ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.black)};
  border: 1px solid ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.grey_3)};
  outline: none;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.grey_1)};
  }
`;

const UserDropdown = () => {
  const node: any = useRef();

  const [open, setOpen] = useState(false);

  const handleClickOutside = (e: any) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);
  const theme: typeof defaultTheme = useTheme();
  return (
    <div
      ref={node}
      css={css`
        position: relative;
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      `}
      onClick={() => setOpen(!open)}
    >
      <Avatar
        fill={theme.colors.accent2_dark}
        width={16}
        height={16}
        style={css`
          padding-left: 4px;
        `}
      />

      <CurrentUser />
      {open ? (
        <ChevronDown
          fill={theme.colors.accent2_dark}
          width={12}
          height={12}
          style={css`
            transform: rotate(180deg) translateY(-2px);
          `}
        />
      ) : (
        <ChevronDown
          fill={theme.colors.accent2_dark}
          width={12}
          height={12}
          style={css`
            transform: translateY(1px);
          `}
        />
      )}
      {open && (
        <ul
          css={css`
            width: 100%;
            list-style: none;
            padding: 0;
            position: absolute;
            top: 51px;
            left: 0;
            margin: 0;
          `}
        >
          <li>
            <StyledListLink href="/user">Profile & Token</StyledListLink>
          </li>
          {/* TODO: implement logout */}
          <li>
            <StyledListLink>Logout</StyledListLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
