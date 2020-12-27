import { createStore } from "redux";
import rootReducer from "./reducer";

const store = createStore(rootReducer);

store.subscribe(() => {
  console.log("Store Updated");
  console.table(store.getState());
});

export default store;
