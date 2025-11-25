import Reducer from "../component/Reducer";
import { createStore } from "redux";
import { incrementReducer } from "./Reducer";

const store = createStore(incrementReducer);
export default store;
