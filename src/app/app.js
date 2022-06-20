// libraries
import React       from "react";
import { connect } from "react-redux";

// components
import Users from "../components/users";


// redux state
const mapStateToProps = (store) => ({
    usersList: store.usersState.list
});


const App = ({ usersList }) => {

    /** Render */
    return (
        <div className="container">
            <div className="header">
                <div className="title">Test APP</div>
                <div className="length">user length: { usersList.length }</div>
            </div>

            <div className="components">
                <Users/>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, null)(App);