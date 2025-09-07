import React from 'react';
import Home from './pages/Home';
import Carlisting from './pages/Carlisting';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'; // import Navigate
import Layout from './components/Layout';
import CarDetails from './pages/Cardetails';
import Booking from './pages/Booking';
import SearchFilter from './pages/Searchfilter';
import LoginPage from './components/Login';
import AdminPanel from './pages/Admin'; // import AdminPanel
import SignupPage from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import LocalCarDetails from './pages/Localcardetail';
import Wishlist from './components/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import Messages from './components/Messages';


const carListLoader = async () => {
  const res = await fetch("https://my-json-server.typicode.com/basil648/my_fake_api/cars");
  if (!res.ok) throw new Response("Failed to fetch cars", { status: res.status });
  return res.json();
};

// Component to protect admin route
function RequireAdmin() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) return <Navigate to="/login" replace />;
  return <AdminPanel />;
}

function App() {
  const routee = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/admin", element: <RequireAdmin /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/messages", element: <Messages /> },
    {
      path: "/", element: <Layout />,
      children: [
        { path: "/cars", element: <Carlisting />, loader: carListLoader },
        { path: "/cars/:id", element: <CarDetails /> },
        { path: "/local-car/:id", element: < LocalCarDetails /> },

        {
          path: "/booking/:id", element: (
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          )
        },
        { path: "/search", element: <SearchFilter /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },

      ]
    }
  ]);

  return <RouterProvider router={routee} />;
}

export default App;
