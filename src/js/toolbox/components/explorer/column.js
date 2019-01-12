import React from "react";
import styled from 'styled-components';
import constants from '../../constants';

const { color } = constants;

const Column = styled.div`
   width: 240px;
   height: 100%;
   flex: 0 0 auto;
   border-right: 1px solid ${color.gray[4]};
   overflow-y: auto;
`;

export default Column;
