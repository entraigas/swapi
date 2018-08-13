import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
// material
import { AppBar, Tabs, Tab } from '@material-ui/core';
// custom
import { ROUTE_HOME, ROUTE_PLANETS, ROUTE_PEOPLE } from "../config/constants"
import { changeMenuPropsAction } from "../actions/menuActions"

class Header extends Component {
  handleChange = (event, value) => {
    this.props.changeMenuPropsAction({selected: value});
  };

  render (){
    return (
      <AppBar position="static" style={{ marginBottom: '25px'}}>
        <Tabs value={this.props.selected} onChange={this.handleChange}>
          <Tab label="Home" component={Link} to={ROUTE_HOME} />
          <Tab label="Planets" component={Link} to={ROUTE_PLANETS} />
          <Tab label="People" component={Link} to={ROUTE_PEOPLE} />
        </Tabs>
      </AppBar>
    )
  }
}

function mapStateToProps(store) {
  return {
    selected: store.menu.selected,
  }
}

function mapDispatchToProps(dispatch) {
 return bindActionCreators(
   {
      changeMenuPropsAction,
   },
   dispatch
 );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
//export default withStyles(styles)(Header);
