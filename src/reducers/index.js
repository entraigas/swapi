import { combineReducers } from "redux";
// custom reducers
import menuReducer   from "./menuReducer"
import planetReducer from "./planetReducer"
import peopleReducer from "./peopleReducer"

const rootReducer = combineReducers({
  menu: menuReducer,
  planets: planetReducer,
  people: peopleReducer,
});

export default rootReducer;
