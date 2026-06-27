import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'

import Notfound from './components/Notfound/Notfound'
import AllDestinations from './components/AllDestinations/AllDestinations'
import DestinationDetails from './components/DestinationDetails/DestinationDetails'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Booking from './components/Booking/Booking'
import ContactUs from './components/ContactUs/ContactUs'
import Blog from './components/Blog/Blog'
import BlogDetails from './components/BlogDetails/BlogDetails'
import ContactContextProvider from './components/ContactContext/ContactContext.jsx';
import AuthContextProvider from './components/AuthContext/AuthContext.jsx';
import ThemeContextProvider from './components/ThemeContext/ThemeContext.jsx';
import NotificationProvider from './components/NotificationContext/NotificationContext.jsx';

let routers = createBrowserRouter([ 
  {
    path: '', 
    element: <Layout />, 
    children: [ 
      
      { index: true, element: <Home /> }, 
       
      
    
      { path: 'destinations', element: <AllDestinations /> }, 
      { path: 'destination/:id', element: <DestinationDetails /> }, 
      { path: 'login', element: <Login /> }, 
      { path: 'register', element: <Register /> }, 
      { path: 'booking', element: <Booking /> }, 
      { path: 'contact', element: <ContactUs /> }, 
      { path: 'blog', element: <Blog /> }, 
      { path: 'blog/:id', element: <BlogDetails /> }, 
      
      
      { path: '*', element: <Notfound /> } 
    ]
  } 
]) 
function App() { 
  return (
    <ThemeContextProvider>
      <NotificationProvider>
        <AuthContextProvider>
          <ContactContextProvider>
            <RouterProvider router={routers} />
          </ContactContextProvider>
        </AuthContextProvider>
      </NotificationProvider>
    </ThemeContextProvider>
  )
}
export default App