import { combineReducers } from "redux";
import { Reducer$BasicInfo } from "./BasicInfo/reducer";
import { Reducer$ModalState } from "./ModalState/reducer";
import { Reducer$RootUser } from "./RootUser/reducer";
import { Reducer$SelectedGroup } from "./SelectedGroup/reducer";

const rootReducer = combineReducers({
  rootUser: Reducer$RootUser,
  basicInfo: Reducer$BasicInfo,
  modalState: Reducer$ModalState,
  selectedGroup: Reducer$SelectedGroup,
});

export default rootReducer;
