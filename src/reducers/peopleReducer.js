import { CHANGE_PEOPLE_PROPS } from "../actions/actionTypes";

const initialState = {
	items: [],
	total: 0,
	loading: false,
}

export default function peopleReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_PEOPLE_PROPS:
			return Object.assign({}, state, action.props);
		default:
			return state;
	}
}
