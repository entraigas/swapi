import React from 'react';
import { Paper } from  "@material-ui/core";
import Header from "./Header"

const LayoutContainer = ({ children, ...restProps }) => (
  <div>
    <Header />
    <Paper {...restProps}>
      {children}
    </Paper>
  </div>
);

export default LayoutContainer;
