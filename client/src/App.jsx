import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './App.css';
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Footer from "./components/Footer/Footer";
import Brandpatner from "./pages/Brandpatner";
import Application from "./pages/Application";
import DiscoverUs from "./pages/DiscoverUs";
import Software from "./pages/Resources/Software";
import HowToBuy from "./pages/Resources/HowToBuy";
import DataSheet from "./pages/Resources/DataSheet";
import SolutionSupport from "./pages/Resources/SolutionSupport";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/Profile/UserProfile";
import ErrorPage from "./pages/ErrorPage";
import Product from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import TempArchitecture from "./pages/Products/LightingFixtures/Architecture/TempArchitecture";
import Entertainment from "./pages/Products/LightingFixtures/Entertainment/Entertainment";
import LEDPixels from "./pages/Products/LightingFixtures/LEDPixels/LedPixels";
import Decorative from "./pages/Products/LightingFixtures/Decorative/Decorative";
import TheaterStudioTelevision from "./pages/Products/LightingFixtures/TheaterStudioTelevision/TheaterStudioTelevision";
import SignalDistributionAndPowerSupply from "./pages/Products/ControllersDistributionInterfaces/SignalDistribution&PowerSupply/SignalDistribution&PowerSupply";
import AdminLayout from "./layout/Admin/AdminLayout";
import AdminUser from "./components/Admin/AdminUser";
import AdminCarousel from "./components/Admin/AdminCarousel/AdminCarousel";
import AdminApplication from "./components/Admin/AdminApplication/AdminApplication";
import AdminContact from "./components/Admin/AdminContact";
import AdminQuerry from "./components/Admin/AdminQuerry";
import AdminNewsLetter from "./components/Admin/AdminNewsLetter";
import AdminProducts from "./components/Admin/AdminProduct/AdminProducts";
import AddAdminCarousel from "./components/Admin/AdminCarousel/AddAdminCarousel";
import EditAdminCarousel from "./components/Admin/AdminCarousel/EditAdminCarousel";
import AddAdminApplication from "./components/Admin/AdminApplication/AddAdminApplication";
import EditAdminApplication from "./components/Admin/AdminApplication/EditAdminApplication";
import AddAdminProduct from "./components/Admin/AdminProduct/AddAdminProduct";
import EditAdminProduct from "./components/Admin/AdminProduct/EditAdminProduct";
import FAQs from "./pages/HelpfulLinks/FAQs";
import ShippingAndReturns from "./pages/HelpfulLinks/ShippingAndReturn";
import PrivacyPolicy from "./pages/HelpfulLinks/PrivacyPolicy";
import BackToTop from "./components/BackToTop/BackToTop";

function App() {

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#ffc221",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "#ffc221",
      border: "#ffc221",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
      small_laptop: "1440px",
    },
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          zIndex: 99999999,
          width: '300px',
          fontSize: '16px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
        }}
        toastOptions={{
          duration: 3000,
        }}
      />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/arkaya" element={<Home />} />
            <Route path="/brandsPatner" element={<Brandpatner />} />
            <Route path="/application" element={<Application />} />
            <Route path="/discover" element={<DiscoverUs />} />

            {/* <Route path="/architecture" element={<Architecture />} /> */}
            <Route path="/temparchitecture" element={< TempArchitecture />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/ledpixels" element={<LEDPixels />} />
            <Route path="/decorative" element={<Decorative />} />
            <Route path="/theaterstudiotelevision" element={<TheaterStudioTelevision />} />
            <Route path="/signaldistributionandpowersupply" element={<SignalDistributionAndPowerSupply />} />

            <Route path="/products" element={<Product />} />
            <Route path="/singleproduct/:id" element={<SingleProduct />} />

            <Route path="/software" element={<Software />} />
            <Route path="/howtobuy" element={<HowToBuy />} />
            <Route path="/datasheet" element={<DataSheet />} />
            <Route path="/solutionsupport" element={<SolutionSupport />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<ErrorPage />} />

            <Route path="/faqs" element={<FAQs />} />
            <Route path="/shippingandreturn" element={<ShippingAndReturns />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />


            <Route path="/admin" element={<AdminLayout />} >
              <Route path="user" element={<AdminUser />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="query" element={<AdminQuerry />} />
              <Route path="newsletter" element={<AdminNewsLetter />} />
              <Route path="carousel" element={<AdminCarousel />} />
              <Route path="addcarousel" element={<AddAdminCarousel />} />
              <Route path="editcarousel/:id" element={<EditAdminCarousel />} />
              <Route path="application" element={<AdminApplication />} />
              <Route path="addapplication" element={<AddAdminApplication />} />
              <Route path="editapplication/:id" element={<EditAdminApplication />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="addproducts" element={<AddAdminProduct />} />
              <Route path="editproducts/:id" element={<EditAdminProduct />} />
            </Route>
          </Routes>
          <BackToTop/>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );

}

export default App

