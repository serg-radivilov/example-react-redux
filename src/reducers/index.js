// libraries
import { combineReducers } from "redux";


// reducers from components
import usersState    from "../components/users/reducer";
import productsState from "../components/products/reducer";


// export reducers
export default combineReducers({
    usersState,   // users reducer
    productsState // products reducer
});