import _ from "lodash";
import { CHANGE_PLANETS_PROPS } from "./actionTypes";
import { fetchAll } from "../service/Api";

const endpoint = "https://swapi.co/api/planets";

export function changePlanetPropsAction(props){
  return dispatch => {
    dispatch({type: CHANGE_PLANETS_PROPS, props: props})
  }
}

export function getPlanetListAction(callback){
  return dispatch => {
    fetchAll(endpoint).then( data => {
      dispatch({
        type: CHANGE_PLANETS_PROPS,
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
