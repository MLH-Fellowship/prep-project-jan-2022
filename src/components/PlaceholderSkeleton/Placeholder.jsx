import React from 'react';
import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';

const Wrapper = styled.div`
  border: 2px solid #4fbdba;
  border-radius: 1vw;
  height: 100%;
  width: 100%;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30%;
  width: 100%;
  padding: 0.5em;
  gap: 1em;
`;

const CircularContainer = styled.div`
  height: 100%;
  aspect-ratio: 1;
`;

function PlaceholderSkeleton() {
  return (
    <Wrapper>
      <FlexContainer>
        <CircularContainer>
          <Skeleton variant="circular" height="100%" />
        </CircularContainer>
        <Skeleton variant="text" height="70%" style={{ flex: '1' }} />
      </FlexContainer>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height="70%"
      />
    </Wrapper>
  );
}

export default PlaceholderSkeleton;
