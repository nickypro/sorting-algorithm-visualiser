import React from 'react'
import styled from 'styled-components';

const DisplayArea = styled.div`
  display: grid;
  width: 95%;
  height: 80vh;
  align-items: flex-end;
  margin: auto;
  margin-top: 10vh;
  @media (max-width: 800px) {
    margin-top: 2vh;
    height: 50vh;
  }
`

export default DisplayArea