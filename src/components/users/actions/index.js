export const addUserAction = (type) => ({ id, name = '', surname = '', age = '' }) => ({
    type,
    payload: { id, name, surname, age }
})