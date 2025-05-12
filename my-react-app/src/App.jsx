import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home"; 
import SignIn from "./pages/SignIn/SignIn";


const Layout = () => (
  <>
    <Navbar />
    <div>
      <Outlet /> {}
    </div>
    <Footer />
  </>
);


const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <Home />, 
      },
      {
        path: "/signIn", 
        element: <SignIn />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
