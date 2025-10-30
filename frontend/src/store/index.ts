import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Cart, CartItem } from '../types';
import api from '../lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (email: string, password: string) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        set({ user: data, token: data.token });
      },

      register: async (name: string, email: string, password: string) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        localStorage.setItem('token', data.token);
        set({ user: data, token: data.token });
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useCartStore = create<CartState>()((set, get) => ({
  cart: null,
  isLoading: false,

  fetchCart: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get<Cart>('/cart');
      set({ cart: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch cart:', error);
    }
  },

  addToCart: async (productId: string, quantity: number) => {
    try {
      const { data } = await api.post<Cart>('/cart', { productId, quantity });
      set({ cart: data });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  },

  updateCartItem: async (itemId: string, quantity: number) => {
    try {
      const { data } = await api.put<Cart>(`/cart/${itemId}`, { quantity });
      set({ cart: data });
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw error;
    }
  },

  removeFromCart: async (itemId: string) => {
    try {
      const { data } = await api.delete<Cart>(`/cart/${itemId}`);
      set({ cart: data });
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  },

  clearCart: () => {
    set({ cart: null });
  },
}));
