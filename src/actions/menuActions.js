import { CHANGE_MENU_PROPS } from "./actionTypes";

export function changeMenuPropsAction(props){
  return dispatch => {
    dispatch({type: CHANGE_MENU_PROPS, props: props})
  }
}
