import { CHANGE_MENU_PROPS } from "../actions/actionTypes";

const initialState = {
	selected: 0
}

export default function planetReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_MENU_PROPS:
			return Object.assign({}, state, action.props);
		default:
			return state;
	}
}
