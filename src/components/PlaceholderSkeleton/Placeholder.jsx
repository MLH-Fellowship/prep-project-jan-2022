import React from 'react';
import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';

const Wrapper = styled.div`
  margin: 5px auto;
  padding: 3px;
  border: 2px solid #4fbdba;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
`;

function PlaceholderSkeleton() {
  return (
    <Wrapper>
      <FlexContainer>
        <Skeleton variant="circular" width={75} height={75} />
        <Skeleton variant="text" width={800} height={30} />
      </FlexContainer>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={900}
        height={180}
      />
    </Wrapper>
  );
}

export default PlaceholderSkeleton;
