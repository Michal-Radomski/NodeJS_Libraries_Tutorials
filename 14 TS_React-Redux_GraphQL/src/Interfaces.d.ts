// -Types and Interfaces

import {ThunkAction, Action} from "@reduxjs/toolkit";

import {store} from "./redux/store";
import {IHomePageState} from "./containers/HomePage/types";

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

interface IHomePageProps {}

interface IRootState {
  homePage: IHomePageState;
}
