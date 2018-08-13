import _ from "lodash";
import { CHANGE_PEOPLE_PROPS } from "./actionTypes";
import { fetchAll } from "../service/Api";

const endpoint = "https://swapi.co/api/people";

export function changePeoplePropsAction(props){
  return dispatch => {
    dispatch({type: CHANGE_PEOPLE_PROPS, props: props})
  }
}

export function getPeopleListAction(callback){
  return dispatch => {
    fetchAll(endpoint).then( data => {
      dispatch({
        type: CHANGE_PEOPLE_PROPS,
        props: {
          items: data ? data : [],
          total: !_.isEmpty(data) ? data.length : 0
        }
      })
      if(_.isFunction(callback)){
        callback(data);
      }
    }).catch(error => {
      if(_.isFunction(callback)){
        callback(error);
      }
    });
  }
}
