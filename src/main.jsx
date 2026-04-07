import React from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

//import our pages
import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CreateFundraiserPage from "./pages/CreateFundraiserPage.jsx";
import EditFundraiserPage from "./pages/EditFundraiserPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

//import our components
import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage />},
      { path: "/login", element: <LoginPage />},
      { path: "/fundraiser", element: <CreateFundraiserPage />},
      { path: "/fundraiser/:id", element: <FundraiserPage />},
      { path: "/fundraiser/:id/edit", element: <EditFundraiserPage />},
      { path: "/about", element: <AboutPage />},
      { path: "/contact", element: <ContactPage />},
      { path: "/profile/:id", element: <ProfilePage />},
      { path: "*", element: <NotFoundPage /> },
    ]
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
        </AuthProvider>
  </React.StrictMode>
); //tells react where to put base content (comes from index.html <div> part)

