import React from "react";
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
// custom routes path
import { ROUTE_HOME, ROUTE_PLANETS, ROUTE_PEOPLE } from "./constants"
// custom components
import LayoutRoute from "../components/LayoutRoute";
import LayoutContainer from "../components/LayoutContainer";
// custom pages
import Home from "../pages/Home";
import Planets from "../pages/Planets";
import People from "../pages/People";

// routes config array
const routes = [
  {exact: true,  path:ROUTE_HOME, layout:LayoutContainer, component:Home},
  {exact: true,  path:ROUTE_PLANETS, layout:LayoutContainer, component:Planets},
  {exact: true,  path:ROUTE_PEOPLE, layout:LayoutContainer, component:People},
]

// helper function
const routesBuilder = items => {
  let array = [];
  for(let index=0; index<items.length; index++){
    const item = items[index];
    array.push(
      <LayoutRoute
        key={index}
        exact={item.exact}
        path={item.path}
        layout={item.layout}
        component={item.component}
      />
    );
  }
  return array;
}

// main Route component
const Router = () => {
  const basename = `/${process.env.PUBLIC_URL.split('/').pop()}`;
  const htmlRoutes = routesBuilder(routes);
  return (
    <BrowserRouter basename={basename}>
      <Switch>
  			{htmlRoutes}
        <Redirect to={ROUTE_HOME} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
