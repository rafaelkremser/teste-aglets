// CartContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number; // Adicionando a propriedade de quantidade
}

interface CartState {
  items: CartItem[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Product) => void;
  removeItem: (item: CartItem) => void;
}

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: { type: string; payload: CartItem }): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + 1 } // Incrementa a quantidade
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] }; // Adiciona novo item com quantidade 1
    }
    case 'REMOVE_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity - 1 } // Decrementa a quantidade
                : item
            ),
          };
        }
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id), // Remove o item se a quantidade for 1
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } });
  };

  const removeItem = (item: CartItem) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
