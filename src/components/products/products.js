/** NOTE - This component use redux from hooks for get store and dispatches */

// libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

// constants
import CONSTANTS from "./constants";

// actions
import { emptyAction, setArrayAction, setFieldValue } from "../../actions";
import { addProductAction } from "./actions";


// component
const Products = () => {

    /** Store */
    const { fields, list } = useSelector(({ productsState }) => productsState);

    /** Dispatches */
    // main
    const dispatch = useDispatch();
    // adding product
    const setField      = setFieldValue(CONSTANTS.ACTIONS.SET_FIELD);
    const clearFields   = emptyAction(CONSTANTS.ACTIONS.CLEAR_FIELDS);
    // products list
    const addProduct    = addProductAction(CONSTANTS.ACTIONS.ADD_PRODUCT);
    const setProducts   = setArrayAction(CONSTANTS.ACTIONS.SET_PRODUCTS);
    const clearProducts = emptyAction(CONSTANTS.ACTIONS.CLEAR_PRODUCTS);


    /** Events */
    // set editable field for adding product
    const _setEditableField = (field) => ({ target }) => dispatch(setField({ field, value: target.value }));

    // event for add product by filled fields
    const _onAddProduct = () => {
        // add product
        dispatch(addProduct({
            ...fields,
            id: v4() // set new id for creating product
        }));

        // clear fields
        dispatch(clearFields());
    };

    // event for clear all products from list
    const _onClearProducts = () => dispatch(clearProducts());

    // event for delete product
    const _onDeleteProduct = (id) => {
        // filter products list by id for delete
        const updatedList = list.filter((product) => !(product.id === id));

        // set products list
        dispatch(setProducts(updatedList));
    };


    /** Render */
    // render form for adding product by filled fields
    const _renderForm = () => (
        <div className="form">
            <div>
                <span>name</span>
                <input type="text" value={ fields.name }  onChange={ _setEditableField('name') }/>
            </div>
            <div>
                <span>type</span>
                <input type="text" value={ fields.type }  onChange={ _setEditableField('type') }/>
            </div>
            <div>
                <span>price</span>
                <input type="text" value={ fields.price } onChange={ _setEditableField('price') }/>
            </div>
            <button className="btn-add"   onClick={ _onAddProduct }   >Add product</button>
            <button className="btn-clear" onClick={ _onClearProducts }>Clear product</button>
        </div>
    );

    // render products list
    const _renderList = () => (
        <div className="list">
            <div className="head">
                <span>Name</span>
                <span>Type</span>
                <span>Price</span>
            </div>
            <div className="body">
                { list.map(({ id, name, type, price }) => (
                    <div key={ id } className="item">
                        <span>{ name }</span>
                        <span>{ type }</span>
                        <span>{ price }</span>
                        <button onClick={ () => _onDeleteProduct(id) }>Delete</button>
                    </div>
                )) }
            </div>
        </div>
    )

    // render wrapper
    return (
        <div className="component">
            <div className="header">Products list</div>

            { _renderForm() }
            { _renderList() }

        </div>
    );
};

export default Products;