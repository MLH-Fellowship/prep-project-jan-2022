import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  position: absolute;
  left: 42%;
  top: 42%;
  transform: translate(-50%, -50%);
`;

function Loader() {
  return (
    <Wrapper>
      <CircularProgress color="success" />
    </Wrapper>
  );
}

export default Loader;
