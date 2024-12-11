import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import Header from "./pages/Header";
import Footer from "./components/Footer/Footer";
import BackToTop from "./components/BackToTop/BackToTop";
import AdminButton from "./components/Admin/AdminButton/AdminButton";

// Pages
import Home from "./pages/Home";
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
import ErrorPage from "./pages/ErrorPage";
import Product from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";
import SearchProduct from "./pages/SearchProduct";
import FAQs from "./pages/HelpfulLinks/FAQs";
import ShippingAndReturns from "./pages/HelpfulLinks/ShippingAndReturn";
import PrivacyPolicy from "./pages/HelpfulLinks/PrivacyPolicy";
import Term_Condition from "./pages/HelpfulLinks/Term_Condition";
import TempArchitecture from "./pages/Products/LightingFixtures/Architecture/TempArchitecture";
import Entertainment from "./pages/Products/LightingFixtures/Entertainment/Entertainment";
import LEDPixels from "./pages/Products/LightingFixtures/LEDPixels/LedPixels";
import Decorative from "./pages/Products/LightingFixtures/Decorative/Decorative";
import TheaterStudioTelevision from "./pages/Products/LightingFixtures/TheaterStudioTelevision/TheaterStudioTelevision";
import SignalDistributionAndPowerSupply from "./pages/Products/ControllersDistributionInterfaces/SignalDistribution&PowerSupply/SignalDistribution&PowerSupply";

// User Components
import Cart from "./pages/Cart";
import UserWrapper from "./Wrapper/UserWrapper";
import UserLayout from "./layout/User/UserLayout";
import UserProfile from "./components/User/UserProfile";
import ChangePassword from "./components/User/ChangePassword";
import DeleteAccount from "./components/User/DeleteAccount";
import Order from "./pages/Order";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Wishlist from "./pages/WishList";
import Checkout from "./pages/Checkout";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccess from "./pages/OrderSuccess";
import OrderFailure from "./pages/OrderFailure";

// Admin Components
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
import AdminWrapper from "./Wrapper/AdminWrapper";
import { useAuthContext } from "./context/auth-context";


// Theme
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


function App() {

  const { user } = useAuthContext()

  useEffect(() => {
    const handleRightClick = (event) => {
      if (!user?.isAdmin) {
        event.preventDefault(); // Prevent right-click for non-admin users
        return null;
      }
    };

    // Attach the right-click event listener
    document.addEventListener('contextmenu', handleRightClick);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
    };
  }, [user]);

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
          <GlobalStyle isAdmin={user?.isAdmin} />
          <Helmet>
            <title>Arkaya Lighting</title>
            <meta name="description" content="This is awesome website where you can find cool products and resources." />
            <meta name="keywords" content="website, products, services, resources" />
          </Helmet>
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Helmet>
                  <title>Home - Arkaya Lighting: Customizable Lighting Solutions for Every Space</title>
                  <meta name="description" content="Welcome to our homepage. Find everything you need here." />
                </Helmet>
                <Home />
              </>
            } />
            <Route path="/arkaya" element={
              <>
                <Helmet>
                  <title>Home - Arkaya Lighting: Customizable Lighting Solutions for Every Space</title>
                  <meta name="description" content="Welcome to our homepage. Find everything you need here." />
                </Helmet>
                <Home />
              </>
            } />
            <Route path="/brandsPatner" element={
              <>
                <Helmet>
                  <title>Brand Partners - Arkaya Lighting</title>
                  <meta name="description" content="Discover our brand partners and collaborations." />
                </Helmet>
                <Brandpatner />
              </>
            } />
            <Route path="/application" element={
              <>
                <Helmet>
                  <title>Application - Arkaya Lighting</title>
                  <meta name="description" content="Learn more about how to apply for our services." />
                </Helmet>
                <Application />
              </>
            } />
            <Route path="/discover" element={
              <>
                <Helmet>
                  <title>Discover Us - Arkaya Lighting</title>
                  <meta name="description" content="Learn about who we are and what we do." />
                </Helmet>
                <DiscoverUs />
              </>
            } />
            <Route path="/software" element={
              <>
                <Helmet>
                  <title>Software Resources - Arkaya Lighting</title>
                  <meta name="description" content="Find all our software resources here." />
                </Helmet>
                <Software />
              </>
            } />
            <Route path="/howtobuy" element={
              <>
                <Helmet>
                  <title>How To Buy - Arkaya Lighting</title>
                  <meta name="description" content="Learn how to buy our products online with ease." />
                  <meta name="keywords" content="buy, purchase, products, online shopping" />
                </Helmet>
                <HowToBuy />
              </>
            } />
            <Route path="/datasheet" element={
              <>
                <Helmet>
                  <title>Data Sheets - Arkaya Lighting</title>
                  <meta name="description" content="Find product data sheets for all of our products." />
                  <meta name="keywords" content="data sheets, product specs, technical sheets" />
                </Helmet>
                <DataSheet />
              </>
            } />
            <Route path="/solutionsupport" element={
              <>
                <Helmet>
                  <title>Solution Support - Arkaya Lighting</title>
                  <meta name="description" content="Get solution support for our products and services." />
                  <meta name="keywords" content="support, solution, help, customer service" />
                </Helmet>
                <SolutionSupport />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Helmet>
                  <title>Contact Us - Arkaya Lighting</title>
                  <meta name="description" content="Contact us for any queries or support." />
                  <meta name="keywords" content="contact, support, customer service" />
                </Helmet>
                <Contact />
              </>
            } />
            <Route path="/architecture" element={
              <>
                <Helmet>
                  <title>Architecture Lighting Fixtures</title>
                  <meta name="description" content="Explore our temporary architecture lighting fixtures for events and more." />
                  <meta name="keywords" content="temporary lighting, architecture lighting, event lighting" />
                </Helmet>
                <TempArchitecture />
              </>
            } />
            <Route path="/entertainment" element={
              <>
                <Helmet>
                  <title>Entertainment Lighting Fixtures</title>
                  <meta name="description" content="Explore our entertainment lighting fixtures for productions and events." />
                  <meta name="keywords" content="entertainment lighting, stage lighting, production lighting" />
                </Helmet>
                <Entertainment />
              </>
            } />
            <Route path="/ledpixels" element={
              <>
                <Helmet>
                  <title>LED Pixels - Arkaya Lighting</title>
                  <meta name="description" content="Find high-quality LED pixels for your lighting projects." />
                  <meta name="keywords" content="LED pixels, lighting pixels, LED display" />
                </Helmet>
                <LEDPixels />
              </>
            } />
            <Route path="/decorative" element={
              <>
                <Helmet>
                  <title>Decorative Lighting Fixtures</title>
                  <meta name="description" content="Browse decorative lighting solutions for your space." />
                  <meta name="keywords" content="decorative lighting, interior lighting, lighting design" />
                </Helmet>
                <Decorative />
              </>
            } />
            <Route path="/theaterstudiotelevision" element={
              <>
                <Helmet>
                  <title>Theater, Studio & Television Lighting</title>
                  <meta name="description" content="Explore lighting solutions for theaters, studios, and television." />
                  <meta name="keywords" content="theater lighting, studio lighting, television lighting" />
                </Helmet>
                <TheaterStudioTelevision />
              </>
            } />
            <Route path="/signaldistributionandpowersupply" element={
              <>
                <Helmet>
                  <title>Signal Distribution & Power Supply</title>
                  <meta name="description" content="Get the best signal distribution and power supply solutions for your equipment." />
                  <meta name="keywords" content="signal distribution, power supply, signal equipment" />
                </Helmet>
                <SignalDistributionAndPowerSupply />
              </>
            } />
            {/* Product Search and Details Routes */}
            <Route path="/searchProducts" element={
              <>
                <Helmet>
                  <title>Search Products - Arkaya Lighting</title>
                  <meta name="description" content="Search for products from our wide range of available products." />
                  <meta name="keywords" content="search, products, find, shop" />
                </Helmet>
                <SearchProduct />
              </>
            } />
            {/* Product and Single Product Routes */}
            <Route path="/products" element={
              <>
                <Helmet>
                  <title>Products - Arkaya Lighting</title>
                  <meta name="description" content="Explore our wide variety of products to suit your needs." />
                  <meta name="keywords" content="products, shop, lighting fixtures, accessories" />
                </Helmet>
                <Product />
              </>
            } />
            <Route path="/singleproduct/:id" element={<SingleProduct />} />

            {/* Helpful Links Routes */}
            <Route path="/faqs" element={
              <>
                <Helmet>
                  <title>FAQs - Arkaya Lighting</title>
                  <meta name="description" content="Find answers to the most frequently asked questions about our products and services." />
                  <meta name="keywords" content="FAQ, frequently asked questions, help, support" />
                </Helmet>
                <FAQs />
              </>
            } />
            <Route path="/shippingandreturn" element={
              <>
                <Helmet>
                  <title>Shipping & Returns - Arkaya Lighting</title>
                  <meta name="description" content="Learn about our shipping policies and returns process." />
                  <meta name="keywords" content="shipping, returns, policy" />
                </Helmet>
                <ShippingAndReturns />
              </>
            } />
            <Route path="/privacypolicy" element={
              <>
                <Helmet>
                  <title>Privacy Policy - Arkaya Lighting</title>
                  <meta name="description" content="Read our privacy policy to understand how we handle your personal data." />
                  <meta name="keywords" content="privacy, policy, data protection" />
                </Helmet>
                <PrivacyPolicy />
              </>
            } />
            <Route path="/term&condition" element={
              <>
                <Helmet>
                  <title>Terms & Conditions - Arkaya Lighting</title>
                  <meta name="description" content="Review our terms and conditions before using our website and services." />
                  <meta name="keywords" content="terms, conditions, agreement" />
                </Helmet>
                <Term_Condition />
              </>
            } />
            {/* Authentication Routes */}
            <Route path="/login" element={
              <>
                <Helmet>
                  <title>Login - Arkaya Lighting</title>
                  <meta name="description" content="Log in to your account to access exclusive features and settings." />
                  <meta name="keywords" content="login, sign in, account" />
                </Helmet>
                <Login />
              </>
            } />
            <Route path="/signup" element={
              <>
                <Helmet>
                  <title>Sign Up - Arkaya Lighting</title>
                  <meta name="description" content="Sign up to create an account and enjoy the full features of our website." />
                  <meta name="keywords" content="sign up, register, account creation" />
                </Helmet>
                <SignUp />
              </>
            } />

            {/* Cart Routes */}
            <Route path="/user/cart" element={
              <UserWrapper>
                <Cart />
              </UserWrapper>
            } />

            {/* Wishlist Routes */}
            <Route path="/user/wishlist" element={
              <UserWrapper>
                <Wishlist />
              </UserWrapper>
            } />

            {/* User Routes */}
            <Route path="/user" element={
              <UserWrapper>
                <UserLayout />
              </UserWrapper>
            }>
              <Route path="profile" element={
                <>
                  <Helmet>
                    <title>User Profile - Arkaya Lighting</title>
                    <meta name="description" content="Manage your profile and settings." />
                  </Helmet>
                  <UserProfile />
                </>
              } />
              <Route path="orders" element={<Order />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="delete-account" element={<DeleteAccount />} />
              <Route path="forgot-password" element={<ForgetPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="proceedtopayment" element={<PaymentPage />} />
              <Route path="order-success" element={<OrderSuccess />} />
              <Route path="order-failure" element={<OrderFailure />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminWrapper>
                <AdminLayout />
              </AdminWrapper>
            }>
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
            </Route>

            {/* Error Page */}
            <Route path="*" element={
              <>
                <Helmet>
                  <title>404 - Page Not Found - ArkayaLighting</title>
                  <meta name="robots" content="noindex" />
                </Helmet>
                <ErrorPage />
              </>
            } />
          </Routes>
          <AdminButton />
          <BackToTop />
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;


