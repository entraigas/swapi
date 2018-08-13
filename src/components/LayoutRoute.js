import React from 'react';
import { Route } from 'react-router-dom';

const LayoutRoute = ({ props, component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return <Layout> <Component {...props} /> </Layout>
    }
  }
  />
);

export default LayoutRoute;
