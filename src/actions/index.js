export const emptyAction = (type) => () => ({ type });

export const setArrayAction = (type) => (array) => ({
    type,
    payload: { array }
});

export const setFieldValue = (type) => ({ field = null, value = null }) => ({
    type,
    payload: { field, value }
});