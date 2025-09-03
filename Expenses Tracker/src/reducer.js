export const addTransaction = (payload) => ({ type: "ADD", payload });
export const deleteTransaction = (id) => ({ type: "DELETE", payload: id }); 
export const editTransaction = (payload) => ({ type: "EDIT", payload });

const initialState = { transactions: [], };

export function reducer(state = initialState, action) { 
    switch (action.type) { case "ADD": return { ...state, transactions: [...state.transactions, action.payload] }; 
    case "DELETE": return { ...state, transactions: state.transactions.filter((t) => t.id !== action.payload), }; 
    case "EDIT": return { ...state, transactions: state.transactions.map((t) => t.id === action.payload.id ? { ...t, ...action.payload } : t ), }; default: return state; } }
