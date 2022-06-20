// constants
import CONSTANTS from "../constants";

const initialState = {
    addingUser: {
        id:      null,
        name:    '',
        surname: '',
        age:     ''
    },
    list: []
};

export default function usersListReducer (state = initialState, action) {
    switch (action.type) {

    // ADDING
    case CONSTANTS.ACTIONS.SET_ADDING_FIELD:
        return {
            ...state,
            addingUser: {
                ...state.addingUser,
                [action.payload.field]: action.payload.value
            }
        };

    case CONSTANTS.ACTIONS.CLEAR_ADDING_FIELD:
        return {
            ...state,
            addingUser: initialState.addingUser
        };


    // LIST
    case CONSTANTS.ACTIONS.ADD_USER:
        return {
            ...state,
            list: [
                ...state.list,
                {
                    id:      action.payload.id,
                    name:    action.payload.name,
                    surname: action.payload.surname,
                    age:     action.payload.age
                }
            ]
        };

    case CONSTANTS.ACTIONS.SET_USERS_LIST:
        return {
            ...state,
            list: action.payload.array
        };


    // DEFAULT
    default:
        return state;
    }
}