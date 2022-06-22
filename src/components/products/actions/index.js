export const addProductAction = (actionType) => ({ id, name = '', type = '', price = '' }) => ({
    type: actionType,
    payload: { id, name, type, price }
})