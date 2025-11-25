import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          name,
          image,
          cost: parseFloat(cost.replace('$', '')),
          quantity: 1
        });
      }
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      state.items = state.items.filter(item => item.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, type } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        if (type === 'increase') {
          item.quantity += 1;
        } else if (type === 'decrease') {
          item.quantity = Math.max(0, item.quantity - 1);
          if (item.quantity === 0) {
            state.items = state.items.filter(i => i.name !== name);
          }
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
