import {createSelector} from "reselect";
import {IRootState} from "../../Interfaces";

const selectHomePage = (state: IRootState) => state.homePage;

export const makeSelectAnimePage = createSelector(selectHomePage, (homePage) => homePage.animePage);
// console.log("makeSelectAnimePage:", makeSelectAnimePage);
