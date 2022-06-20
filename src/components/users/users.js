// libraries
import React       from "react";
import { connect } from "react-redux";
import { v4 }      from "uuid";

// constants
import CONSTANTS from "./constants";

// actions
import { emptyAction, setArrayAction, setFieldValue } from "../../actions";
import { addUserAction } from "./actions";


// redux state
const mapStateToProps = ({ usersState }) => ({
    // adding
    addingUser: usersState.addingUser,
    // list
    list: usersState.list
});
// redux dispatch
const mapDispatchToProps = {
    // adding
    setAddingField:  setFieldValue(CONSTANTS.ACTIONS.SET_ADDING_FIELD),
    clearAddingUser: emptyAction(CONSTANTS.ACTIONS.CLEAR_ADDING_FIELD),
    // list
    addUser:         addUserAction(CONSTANTS.ACTIONS.ADD_USER),
    setUsersList:    setArrayAction(CONSTANTS.ACTIONS.SET_USERS_LIST)
};


// component
const Users = (props) => {

    /** Props */
    const {
        // adding
        addingUser,
        setAddingField,
        clearAddingUser,
        // list
        list,
        addUser,
        setUsersList
    } = props;


    /** Events */
    // set adding field
    const _setAddingField = (field) => ({ target }) => setAddingField({ field, value: target.value });

    // submit form
    const _submitForm = (event) => {
        event.preventDefault();

        // add user
        addUser({
            ...addingUser,
            id: v4() // set new id for creating user
        });

        // clear adding user
        clearAddingUser();
    };

    // delete user
    const _onDelete = (id) => {
        const updatedList = list.filter((user) => !(user.id === id));

        setUsersList(updatedList);
    };


    /** Render */
    // render form
    const _renderForm = () => (
        <form onSubmit={ _submitForm }>
            <div>
                <span>name</span>
                <input type="text" value={ addingUser.name }    onChange={ _setAddingField('name') }/>
            </div>
            <div>
                <span>surname</span>
                <input type="text" value={ addingUser.surname } onChange={ _setAddingField('surname') }/>
            </div>
            <div>
                <span>age</span>
                <input type="text" value={ addingUser.age }     onChange={ _setAddingField('age') }/>
            </div>
            <button>Add</button>
        </form>
    );

    // render list
    const _renderList = () => (
        <div className="list">
            <div className="head">
                <span>Name</span>
                <span>Surname</span>
                <span>Age</span>
            </div>
            <div className="body">
                { list.map((user) => (
                    <div key={ user.id } className="item">
                        <span>{ user.name }</span>
                        <span>{ user.surname }</span>
                        <span>{ user.age }</span>
                        <button onClick={ () => _onDelete(user.id) }>Delete</button>
                    </div>
                )) }
            </div>
        </div>
    )

    // render wrapper
    return (
        <div className="component">
            <div className="header">Users list</div>

            { _renderForm() }
            { _renderList() }

        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);