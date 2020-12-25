import { createStore } from "redux";
import rootReducer from "./reducer";

const store = createStore(rootReducer);

store.subscribe(() => console.log("Store Updated"));

export default store;
