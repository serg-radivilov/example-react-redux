/** NOTE - This component use redux from connect (mapStateToProps, mapDispatchToProps) for get store and dispatches */

// libraries
import React       from "react";
import PropTypes   from "prop-types";
import { connect } from "react-redux";
import { v4 }      from "uuid";

// constants
import CONSTANTS from "./constants";

// actions
import { emptyAction, setArrayAction, setFieldValue } from "../../actions";
import { addUserAction } from "./actions";


// redux state
const mapStateToProps = ({ usersState }) => ({
    // adding user
    fields: usersState.fields,
    // users list
    list:   usersState.list
});
// redux dispatch
const mapDispatchToProps = {
    // adding user
    setField:    setFieldValue(CONSTANTS.ACTIONS.SET_FIELD),
    clearFields: emptyAction(CONSTANTS.ACTIONS.CLEAR_FIELDS),
    // users list
    addUser:     addUserAction(CONSTANTS.ACTIONS.ADD_USER),
    setUsers:    setArrayAction(CONSTANTS.ACTIONS.SET_USERS),
    clearUsers:  emptyAction(CONSTANTS.ACTIONS.CLEAR_USERS)
};


// component
const Users = (props) => {

    /** Props */
    const {
        // adding user
        fields,
        setField,
        clearFields,
        // users list
        list,
        addUser,
        setUsers,
        clearUsers
    } = props;


    /** Events */
    // set editable field for adding user
    const _setEditableField = (field) => ({ target }) => setField({ field, value: target.value });

    // event for add user by filled fields
    const _onAddUser = () => {
        // add user
        addUser({
            ...fields,
            id: v4() // set new id for creating user
        });

        // clear fields
        clearFields();
    };

    // event for clear all users from list
    const _onClearUsers = () => clearUsers();

    // event for delete user
    const _onDeleteUser = (id) => {
        // filter users list by id for delete
        const updatedList = list.filter((user) => !(user.id === id));

        // set users list
        setUsers(updatedList);
    };


    /** Render */
    // render form for adding user by filled fields
    const _renderForm = () => (
        <div className="form">
            <div>
                <span>name</span>
                <input type="text" value={ fields.name }    onChange={ _setEditableField('name') }/>
            </div>
            <div>
                <span>surname</span>
                <input type="text" value={ fields.surname } onChange={ _setEditableField('surname') }/>
            </div>
            <div>
                <span>age</span>
                <input type="text" value={ fields.age }     onChange={ _setEditableField('age') }/>
            </div>
            <button className="btn-add"   onClick={ _onAddUser }   >Add user</button>
            <button className="btn-clear" onClick={ _onClearUsers }>Clear users</button>
        </div>
    );

    // render users list
    const _renderList = () => (
        <div className="list">
            <div className="head">
                <span>Name</span>
                <span>Surname</span>
                <span>Age</span>
            </div>
            <div className="body">
                { list.map(({ id, name, surname, age }) => (
                    <div key={ id } className="item">
                        <span>{ name }</span>
                        <span>{ surname }</span>
                        <span>{ age }</span>
                        <button onClick={ () => _onDeleteUser(id) }>Delete</button>
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

Users.prototype = {
    // adding user
    fields:      PropTypes.object,
    setField:    PropTypes.func,
    clearFields: PropTypes.func,
    // users list
    list:        PropTypes.array,
    addUser:     PropTypes.func,
    setUsers:    PropTypes.func,
    clearUsers:  PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);