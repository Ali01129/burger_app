// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import type { ReactNode } from "react";

type RootState = ReturnType<typeof store.getState>;

type ProtectedRouteProps={
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const currentUser = useSelector((state: RootState) => state.user.email);
  return currentUser ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
