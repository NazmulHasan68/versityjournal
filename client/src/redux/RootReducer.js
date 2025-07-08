import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice"; 
import { authApi } from "./ApiController/authApi";
import { thesisApi } from "./ApiController/thesisApi";
import { assignApi } from "./ApiController/assignApi";


const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [thesisApi.reducerPath]:thesisApi.reducer,
    [assignApi.reducerPath]:assignApi.reducer,
    auth:authReducer, 
});
export default rootRedcuer;