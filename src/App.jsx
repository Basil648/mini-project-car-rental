import React from 'react'
import Home from './pages/Home'
import Carlisting from './pages/Carlisting'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'


function App() {
  const routee = createBrowserRouter([

    {
      path: "/", element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/cars", element: <Carlisting /> }
      ]
    }

  ])
  return <RouterProvider router={routee} />
}

export default App