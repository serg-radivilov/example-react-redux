/** NOTE - This component use redux from connect (mapStateToProps) for get store */

// libraries
import React       from "react";
import { connect } from "react-redux";

// components
import Users    from "../components/users";    // example redux (use connect)
import Products from "../components/products"; // example redux (use hooks)


// redux state
const mapStateToProps = (store) => ({
    usersList:    store.usersState.list,
    productsList: store.productsState.list
});


const App = ({ usersList, productsList }) => {

    /** Render */
    return (
        <div className="container">
            <div className="header">
                <div className="title">Test APP</div>
                <div className="length">
                    <div>users length: { usersList.length }</div>
                    <div>prods length: { productsList.length }</div>
                </div>
            </div>

            <div className="components">
                <Users/>
                <Products/>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, null)(App);