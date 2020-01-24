import React from 'react'
import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: green;
  background-color: rgba(255, 200, 180, 0.5);
  font-size: 2rem;

  @media (max-width: 800px) {
    display: grid;
    font-size: 1.8rem;
    grid-template:
      'header'
      'sort1 sort2'
      'sort3 sort4'
      'slider'
      'sort';
    }
  }
`

export default Menu