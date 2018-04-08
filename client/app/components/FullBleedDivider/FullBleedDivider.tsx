import * as React from 'react';

import { Divider } from 'material-ui';
import styled, { StyledComponentClass } from 'styled-components';

const DividerWrapper = ({className, children}) => (
  <div className={className}>
    <Divider />
    {children}
  </div>
);

const FullBleedDivider: StyledComponentClass<any, any> = styled(DividerWrapper)`
  float: left;
  width: 100%;
`;

export default FullBleedDivider;
