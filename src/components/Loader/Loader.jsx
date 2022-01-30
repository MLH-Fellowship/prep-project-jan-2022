import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function Loader() {
  return (
    <Wrapper>
      <CircularProgress color="success" />
    </Wrapper>
  );
}

export default Loader;
