import { CHANGE_PLANETS_PROPS } from "../actions/actionTypes";

const initialState = {
	items: [],
	total: 0,
	loading: false,
}

export default function planetReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_PLANETS_PROPS:
			return Object.assign({}, state, action.props);
		default:
			return state;
	}
}
