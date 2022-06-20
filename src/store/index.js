// libraries
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'; // dev tool for browser
import thunk from "redux-thunk";

// reducers
import rootReducer from "../reducers";


// export store
export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));