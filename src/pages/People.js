import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Loadable from "react-loading-overlay"
// material
import Typography from '@material-ui/core/Typography';
// custom
import { changePeoplePropsAction, getPeopleListAction } from "../actions/peopleActions"
import PaginatedGrid from "../components/PaginatedGrid"
import InputFilter from "../components/InputFilter"

const Loader = props => (
  <Loadable active spinner text='Loading your content...' >
  {props.children}
  </Loadable>
)

class People extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      search: '',
    };
    const { total, loading } = this.props.people;
    if(total === 0 && !loading){
      this.props.changePeoplePropsAction({loading: true});
      this.props.getPeopleListAction(data => {
        this.props.changePeoplePropsAction({loading: false})
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
    const { loading, items } = this.props.people;
    const { search } = this.state;
    const display = {
      name: "Person",
      height: "height",
      mass: "mass",
      birth_year: "height",
    }
    const data = this.getData(items, search);
    let retval = (
      <div>
      <Typography component="div" style={{ padding: 8 * 3 }}>
        This is the people page.
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
    people: store.people,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePeoplePropsAction,
      getPeopleListAction,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(People);
