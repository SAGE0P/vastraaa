import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existing) {
        return {
          items: state.items.map((cartItem) =>
            cartItem.id === item.id && cartItem.size === item.size
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                }
              : cartItem
          ),
        };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),

  updateItemQuantity: (itemId, newQuantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      ),
    })),

  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),

  clearCart: () => set({ items: [] }),

  getCartCount: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));

export default useCartStore;