import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice"; 
import { authApi } from "./ApiController/authApi";
import { thesisApi } from "./ApiController/thesisApi";


const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [thesisApi.reducerPath]:thesisApi.reducer,
    auth:authReducer, 
});
export default rootRedcuer;