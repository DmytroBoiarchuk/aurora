import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import MastersPage from './pages/MastersPage/MastersPage';
import MastersSettingPage from './pages/MastersSettingPage/MastersSettingPage';
import RootLayout from './pages/RootLayout/RootLayout';
import BookingsPage from './pages/BookingsPage/BookingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <MastersPage /> },
      { path: '/setting', element: <MastersSettingPage /> },
      { path: '/bookings', element: <BookingsPage /> },
    ],
  },
]);

function App(): JSX.Element {
  return (

    <RouterProvider router={router} />
  );
}

export default App;
