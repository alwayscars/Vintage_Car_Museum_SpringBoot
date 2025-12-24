import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Reg from './Reg.jsx'
import CreateStory from './CreateStory.jsx'
import Home from './Home.jsx'
import Fifties from './Fifties.jsx'
import CarDetails from './CarDetails.jsx'
import Twothousands from './Twothousands.jsx' 
import Twothousandten from './Twothousandten.jsx'
import Nineties from './Nineties.jsx'
import Eighties from './Eighties.jsx'
import Sixties from './Sixties.jsx'
import Seventies from './Seventies.jsx'
import Caradmin from './Caradmin.jsx'
import AdminRoute from './AdminRoute.jsx'

const route = createBrowserRouter([
  {
  path:"/",
  element: <App />,},
  
    {
      path:"/reg",
      element: <Reg />,
    },
    {
      path:"/home",
      element: <Home />,
    },
    {
      path:"/fifties",
      element: <Fifties />,
    },
    {
      path:"/cars/:id",
      element: <CarDetails />,
    },
    {
      path:"/twothousands",
      element: <Twothousands />,
    },
    {
      path:"/twothousandten",
      element: <Twothousandten />,
    },
    {
      path:"/nineties",
      element: <Nineties />,

    },
    {
      path:"/eighties",
      element: <Eighties />,
    },
    {
      path:"/sixties",
      element: <Sixties />,
    },
    {
      path:"/seventies",
      element: <Seventies />,
    },
    {
       path:"/admin",
  element:<AdminRoute><Caradmin/></AdminRoute>,
    },
   
    
]);
createRoot(document.getElementById('root')).render(
   <RouterProvider router={route}></RouterProvider>
)
