import { AuthProvider } from '../features/auth/store/authStore';
import { CartProvider } from '../features/cart/store/cartStore';

export function AppProviders({ children }) {
  return <AuthProvider><CartProvider>{children}</CartProvider></AuthProvider>;
}
