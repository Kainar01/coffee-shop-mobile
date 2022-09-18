import { useAppSelector } from 'store';

export const useAuth = () => {
  const { user, token } = useAppSelector((state) => state.authSlice);

  return { user, token, isLoggedIn: !!user };
};
