import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.id !== productId);
        },
        updateCartQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id === productId);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, updateCartQuantity } = cartSlice.actions
export const {reducer: cartReducer} = cartSlice
