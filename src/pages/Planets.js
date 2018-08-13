import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Loadable from "react-loading-overlay"
// material
import Typography from '@material-ui/core/Typography';
// custom
import { changePlanetPropsAction, getPlanetListAction } from "../actions/planetActions"
import PaginatedGrid from "../components/PaginatedGrid"
import InputFilter from "../components/InputFilter"

const Loader = props => (
  <Loadable active spinner text='Loading your content...' >
  {props.children}
  </Loadable>
)

class Planets extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      search: '',
    };
    const { total, loading } = this.props.planets;
    if(total === 0 && !loading){
      this.props.changePlanetPropsAction({loading: true});
      this.props.getPlanetListAction(data => {
        this.props.changePlanetPropsAction({loading: false})
      });
    }
  }

  onFilter = (search) => {
    this.setState({search});
  }

  getData = (items, search) => {
    if(search && search!==''){
      search = search.toLowerCase();
      return items.filter( row => {
        return row.name.toLowerCase().indexOf(search)!==-1
      })
    }
    return items;
  }

  render(){
    const { loading, items } = this.props.planets;
    const { search } = this.state;
    const display = {
      name: "Planet",
      gravity: "gravity",
      rotation_period: {
        th: "day",
        td: row => `${row.rotation_period} hs`
      },
      orbital_period: {
        th: "year",
        td: row => `${row.orbital_period} days`
      }
    }
    const data = this.getData(items, search);
    let retval = (
      <div>
      <Typography component="div" style={{ padding: 8 * 3 }}>
        This is the planets page.
        <InputFilter placeholder="Filter by name" onChange={this.onFilter}/>
      </Typography>
      <PaginatedGrid display={display} data={data} />
      </div>
    )
    if(loading){
      return <Loader>{retval}</Loader>
    }
    return retval;
  }

}

function mapStateToProps(store) {
  return {
    planets: store.planets,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePlanetPropsAction,
      getPlanetListAction,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Planets);
