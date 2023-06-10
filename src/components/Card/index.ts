import styled from 'styled-components';

export const Card = styled.div<{$width?: string}>`
  max-width: 100%;
  width: ${props => props.$width !== undefined ? props.$width : 'auto'};
  min-height: 100px;
  margin-top: 7px;
  padding: 16px;
  background-color: #ffff;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(73, 80, 87, 0.16);
`;