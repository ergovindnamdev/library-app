import { createContext, lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../../src/layouts/dashboard';
import { userDetails } from '../utils/user-decoder';

export const DashboardPage = lazy(() => import('../pages/dashboard'));
export const LoginPage = lazy(() => import('../../src/pages/login'));
export const ForgetPassword = lazy(() => import('../../src/pages/forget-password'));
export const Registration = lazy(() => import('../../src/pages/registration'));
export const ResetPassword = lazy(() => import('../../src/pages/reset-password'));
export const Users = lazy(() => import('../../src/pages/users'));
export const Books = lazy(() => import('../../src/pages/books'));
export const ProfilePage = lazy(() => import('../../src/pages/profile'));
export const LibraryTrans = lazy(() => import('../../src/pages/library-trans'));
export const Page404 = lazy(() => import('../../src/pages/page-not-found'));


export const LoginContext = createContext();

// ----------------------------------------------------------------------

export default function Router() {
  const isAuthenticated = localStorage.getItem('loginToken');
  
  let LoginUserDetail = userDetails();
  

  const routes = useRoutes([
    {
      element: isAuthenticated ? (
        <LoginContext.Provider value={{LoginUserDetail}} >
        <DashboardLayout>
          
          <Suspense>
            <Outlet />
          </Suspense>

        </DashboardLayout>
        </LoginContext.Provider>
      ) : (
        <Navigate to="/" replace />
      ),
      children: [
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'users-list', element: <Users /> },
        { path: 'books-list', element: <Books /> },
        { path: 'library-trans', element: <LibraryTrans /> },
      ],
    },
    {
      path: '/',
      element: isAuthenticated ? <Navigate to="/profile" replace /> : <LoginPage />,
    },
    {
      path: '/signup',
      element: isAuthenticated ? <Navigate to="/profile" replace /> : <Registration />,
    },
    {
      path: '/forget-password',
      element: isAuthenticated ? <Navigate to="/profile" replace /> : <ForgetPassword />,
    },
    {
      path: '/reset-password',
      element: isAuthenticated ? <Navigate to="/profile" replace /> : <ResetPassword />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
