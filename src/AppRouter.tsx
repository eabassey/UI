import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen } from './components/LoginScreen/LoginScreen';
import { SignupScreen } from './components/SignupScreen/SignupScreen';
import { TodoApp } from './components/TodoApp';
import { PrivateRouteGuard } from './guards/PrivateRouteGuard';
import { PublicRouteGuard } from './guards/PublicRouteGuard';



export const AppRouter = () => {
    return (
      <Routes>
        <Route
          path="todos"
          element={
            <PrivateRouteGuard>
              <TodoApp />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="login"
          element={
            <PublicRouteGuard path="/login">
              <LoginScreen />
            </PublicRouteGuard>
          }
        />
        <Route
          path="signup"
          element={
            <PublicRouteGuard path="/signup">
              <SignupScreen />
            </PublicRouteGuard>
          }
        />
        <Route path="*" element={<Navigate to="todos" />} />
      </Routes>
    );
  };
  