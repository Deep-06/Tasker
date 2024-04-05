import { legacy_createStore, applyMiddleware, combineReducers } from "redux";

import {thunk} from "redux-thunk";
import { reducer as taskReducer } from "./Task/reducer";
import { reducer as authReducer } from "./Authentication/reducer";

 const rootReducer = combineReducers({
    taskReducer,
    authReducer,

});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));