import styled from "styled-components";

export const Table = styled.table`
    padding: 8px;
    border: 0;
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.75);
`;

export const THead = styled.thead`
    color: #fff;
    background: var(--green);
    border: 2px solid var(--green);
`;

export const Th = styled.th`
    font-weight: 400;
`;

export const TBody = styled.tbody`
    border-left: 2px solid var(--green);
`;

export const Tr = styled.tr`
  :nth-child(odd) {
    background-color: #f5f5f5;
  }
`;

export const Td = styled.td`
    padding: 10px;
`;