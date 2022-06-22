// constants
import CONSTANTS from "../constants";

const initialState = {
    // fields for adding product
    fields: {
        id:      null,
        name:  '',
        type:  '',
        price: ''
    },
    // products list
    list: []
};

export default function productsListReducer (state = initialState, action) {
    switch (action.type) {

    // ADDING PRODUCTS FIELDS
    case CONSTANTS.ACTIONS.SET_FIELD:
        return {
            ...state,
            fields: {
                ...state.fields,
                [action.payload.field]: action.payload.value
            }
        };

    case CONSTANTS.ACTIONS.CLEAR_FIELDS:
        return {
            ...state,
            fields: initialState.fields
        };


    // PRODUCTS LIST
    case CONSTANTS.ACTIONS.ADD_PRODUCT:
        return {
            ...state,
            list: [
                ...state.list,
                {
                    id:    action.payload.id,
                    name:  action.payload.name,
                    type:  action.payload.type,
                    price: action.payload.price
                }
            ]
        };

    case CONSTANTS.ACTIONS.SET_PRODUCTS:
        return {
            ...state,
            list: action.payload.array
        };

    case CONSTANTS.ACTIONS.CLEAR_PRODUCTS:
        return {
            ...state,
            list: initialState.list
        };


    // DEFAULT
    default:
        return state;
    }
}