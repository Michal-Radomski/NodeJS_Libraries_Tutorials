import {configureStore} from "@reduxjs/toolkit";
import ReduxLogger from "redux-logger";
import HomePageReducer from "../containers/HomePage/homePageSlice";

const middleware = (getDefaultMiddleware: any) => getDefaultMiddleware().concat(ReduxLogger);

export const store = configureStore({
  middleware,
  reducer: {
    homePage: HomePageReducer,
  },
});
