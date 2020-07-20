import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "../reducers";

const initState = {};
const middleware = [thunk];

const store = createStore(reducers, initState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;