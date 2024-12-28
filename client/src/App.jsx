import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import { useAuthContext } from "./context/auth-context";
import Header from "./pages/Header";
import Footer from "./components/Footer/Footer";
import BackToTop from "./components/BackToTop/BackToTop";
import AdminButton from "./components/Admin/AdminButton/AdminButton";
import Preloader from "./components/Loading/Preloader";

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
import AdminWrapper from "./Wrapper/AdminWrapper";
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
import LandingPage from "./pages/LandingPage";
import ThemeProduct from "./pages/ThemeProduct";


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
            <title>Arkaya Lighting - Innovative & Custom Lighting Solutions for Any Space</title>
            <meta
              name="description"
              content="Explore Arkaya Lighting's customizable, energy-efficient lighting solutions. Discover premium products designed to enhance any space, from homes to offices."
            />
            <meta
              name="keywords"
              content="Arkaya Lighting, custom lighting solutions, energy-efficient lighting, LED lights, smart home lighting, modern lighting designs, premium lighting, home lighting, office lighting, sustainable lighting"
            />
          </Helmet>
          <Preloader />

          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={
              <>
                <Helmet>
                  <title>Home - Arkaya Lighting: Transform Your Space with Custom Lighting</title>
                  <meta
                    name="description"
                    content="Explore Arkaya Lighting's custom solutions for homes and businesses. Discover stylish, energy-efficient lighting products designed to elevate any space."
                  />
                  <meta
                    name="keywords"
                    content="home lighting solutions, commercial lighting, LED lighting, smart lighting, modern lighting, energy-efficient lighting, sustainable lighting, premium lighting, lighting for spaces"
                  />
                </Helmet>
                <Home />
              </>
            } />
            <Route path="/technologyPatner" element={
              <>
                <Helmet>
                  <title>TECHNOLOGIES PARTNERS - Arkaya Lighting: Collaborations & Trusted Brands</title>
                  <meta
                    name="description"
                    content="Discover Arkaya Lighting's trusted technologies partners and collaborations, bringing innovative and premium lighting solutions to the market."
                  />
                  <meta
                    name="keywords"
                    content="Arkaya Lighting partners, trusted lighting brands, lighting collaborations, innovative lighting solutions, lighting industry partnerships, sustainable lighting, leading lighting brands, lighting business collaborations"
                  />
                </Helmet>
                <Brandpatner />
              </>
            } />
            <Route path="/application" element={
              <>
                <Helmet>
                  <title>Application - Arkaya Lighting: Streamline Your Service Requests</title>
                  <meta
                    name="description"
                    content="Easily apply for Arkaya Lighting services. Discover how to request customized lighting solutions and energy-efficient products for your needs."
                  />
                  <meta
                    name="keywords"
                    content="Arkaya Lighting application, lighting service request, customized lighting solutions, energy-efficient lighting, service application process, lighting product application, lighting installation request"
                  />
                </Helmet>
                <Application />
              </>
            } />
            <Route path="/discover" element={
              <>
                <Helmet>
                  <title>Discover Us - Arkaya Lighting: Who We Are</title>
                  <meta
                    name="description"
                    content="Learn about Arkaya Lighting's vision and mission. Explore our commitment to sustainability, innovation, and providing high-quality lighting solutions."
                  />
                  <meta
                    name="keywords"
                    content="about Arkaya Lighting, lighting innovation, sustainable lighting, company mission, lighting solutions, green lighting technology, lighting brand values"
                  />
                </Helmet>
                <DiscoverUs />
              </>
            } />
            <Route path="/software" element={
              <>
                <Helmet>
                  <title>Software - Arkaya Lighting: Free Tools & Resources</title>
                  <meta
                    name="description"
                    content="Access free lighting design software and tools by Arkaya Lighting. Enhance your projects with innovative, professional-grade resources."
                  />
                  <meta
                    name="keywords"
                    content="lighting software, free tools, Arkaya Lighting, lighting design, download lighting resources, professional lighting tools, lighting CAD software"
                  />
                </Helmet>
                <Software />
              </>
            } />
            <Route path="/howtobuy" element={
              <>
                <Helmet>
                  <title>How to Buy - Arkaya Lighting: Smooth Online Shopping</title>
                  <meta
                    name="description"
                    content="Learn how to purchase Arkaya Lighting products with ease. Enjoy a smooth online shopping experience and get great deals on premium lighting solutions."
                  />
                  <meta
                    name="keywords"
                    content="how to buy lighting, Arkaya Lighting products, online shopping, premium lighting, buy lighting online, lighting purchase guide, affordable lighting"
                  />
                </Helmet>
                <HowToBuy />
              </>
            } />
            <Route path="/datasheet" element={
              <>
                <Helmet>
                  <title>Data Sheets - Arkaya Lighting: Product Specifications</title>
                  <meta
                    name="description"
                    content="Explore detailed datasheets for Arkaya Lighting products. Access specifications, features, and technical information to make informed choices."
                  />
                  <meta
                    name="keywords"
                    content="product datasheets, Arkaya Lighting specs, lighting product details, technical sheets, lighting specifications, product features, lighting solutions"
                  />
                </Helmet>
                <DataSheet />
              </>
            } />
            <Route path="/solutionsupport" element={
              <>
                <Helmet>
                  <title>Solution Support - Arkaya Lighting: Product Assistance</title>
                  <meta
                    name="description"
                    content="Get expert solution support for Arkaya Lighting products. Find troubleshooting tips, guides, and answers to common product and software issues."
                  />
                  <meta
                    name="keywords"
                    content="Arkaya Lighting support, lighting troubleshooting, product solutions, software assistance, technical support, product help, lighting issues resolution"
                  />
                </Helmet>
                <SolutionSupport />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Helmet>
                  <title>Solution Support - Arkaya Lighting: Product Assistance & Troubleshooting</title>
                  <meta
                    name="description"
                    content="Get support for Arkaya Lighting products and software. Find solutions, troubleshooting tips, and expert guidance to resolve your issues efficiently."
                  />
                  <meta
                    name="keywords"
                    content="Arkaya Lighting support, product solution support, troubleshooting lighting products, software solutions, product assistance, customer service Arkaya Lighting, lighting product help, common lighting issues, lighting software support, technical product support, Arkaya Lighting troubleshooting tips"
                  />
                </Helmet>
                <Contact />
              </>
            } />
            <Route path="/architecture" element={
              <>
                <Helmet>
                  <title>Architecture Lighting Fixtures - Arkaya Lighting</title>
                  <meta
                    name="description"
                    content="Discover Arkaya Lighting's architecture lighting fixtures, ideal for events, exhibitions, and architectural displays."
                  />
                  <meta
                    name="keywords"
                    content="architecture lighting fixtures, lighting for events, event lighting solutions, exhibition lighting, lighting for architecture, custom lighting for displays"
                  />
                </Helmet>
                <TempArchitecture />
              </>
            } />
            <Route path="/entertainment" element={
              <>
                <Helmet>
                  <title>Entertainment Lighting Fixtures - Arkaya Lighting</title>
                  <meta
                    name="description"
                    content="Discover Arkaya Lighting's entertainment lighting fixtures, perfect for productions, events, and stage setups. Illuminate your performances with style."
                  />
                  <meta
                    name="keywords"
                    content="entertainment lighting, stage lighting, production lighting, event lighting solutions, lighting for productions, performance lighting, stage setup lighting, custom event lighting"
                  />
                </Helmet>
                <Entertainment />
              </>
            } />
            <Route path="/ledpixels" element={
              <>
                <Helmet>
                  <title>LED Pixels - High-Quality Lighting for Every Project</title>
                  <meta
                    name="description"
                    content="Explore premium LED pixels from Arkaya Lighting, perfect for your lighting projects, displays, and installations."
                  />
                  <meta
                    name="keywords"
                    content="LED pixels, lighting pixels, LED display, LED lighting for events, pixel lighting solutions, custom LED displays, high-quality LED lights, LED installations"
                  />
                </Helmet>
                <LEDPixels />
              </>
            } />
            <Route path="/decorative" element={
              <>
                <Helmet>
                  <title>Decorative Lighting Fixtures - Arkaya Lighting</title>
                  <meta
                    name="description"
                    content="Browse Arkaya Lighting’s decorative lighting solutions, designed to enhance your space with stylish and functional lighting fixtures."
                  />
                  <meta
                    name="keywords"
                    content="decorative lighting, interior lighting, lighting design, stylish lighting, lighting for home decor, custom decorative lights, modern lighting solutions, functional lighting fixtures"
                  />
                </Helmet>
                <Decorative />
              </>
            } />
            <Route path="/theaterstudiotelevision" element={
              <>
                <Helmet>
                  <title>Theater, Studio & Television Lighting - Arkaya Lighting</title>
                  <meta
                    name="description"
                    content="Discover Arkaya Lighting’s specialized lighting solutions for theaters, studios, and television productions to create the perfect ambiance."
                  />
                  <meta
                    name="keywords"
                    content="theater lighting, studio lighting, television lighting, stage lighting, lighting for studios, production lighting, lighting for TV sets, professional lighting solutions"
                  />
                </Helmet>
                <TheaterStudioTelevision />
              </>
            } />
            <Route path="/signaldistributionandpowersupply" element={
              <>
                <Helmet>
                  <title>Signal Distribution & Power Supply - Arkaya Lighting</title>
                  <meta
                    name="description"
                    content="Explore reliable signal distribution and power supply solutions for your equipment, ensuring optimal performance and efficiency."
                  />
                  <meta
                    name="keywords"
                    content="signal distribution, power supply solutions, equipment power, signal transmission, reliable power supply, electrical distribution, power solutions, professional signal equipment"
                  />
                </Helmet>
                <SignalDistributionAndPowerSupply />
              </>
            } />
            {/* Theme Product Routes */}
            <Route path="/themeproducts" element={
              <>
                <Helmet>
                  <title>Theme Products - Arkaya Lighting</title>
                  <meta
                    name="description"
                    content="Explore our exclusive range of theme-based lighting products, crafted to enhance every ambiance. Discover premium decorative, functional, and custom lighting solutions tailored to your design needs."
                  />
                  <meta
                    name="keywords"
                    content="theme lighting products, decorative lights, functional lighting, custom lighting solutions, Arkaya Lighting, premium LED products, lighting themes, ambiance lighting, lighting collection"
                  />
                </Helmet>

                <ThemeProduct />
              </>
            } />
            {/* Product Search and Details Routes */}
            <Route path="/searchProducts" element={
              <>
                <Helmet>
                  <title>Search Products - Arkaya Lighting</title>
                  <meta
                    name="description"
                    content="Easily search and find products from our extensive lighting collection, tailored to your needs and preferences."
                  />
                  <meta
                    name="keywords"
                    content="search products, find lighting products, lighting solutions, shop lighting, product search, lighting store, find LED lights, premium lighting products"
                  />
                </Helmet>
                <SearchProduct />
              </>
            } />
            {/* Product and Single Product Routes */}
            <Route path="/products" element={
              <>
                <Helmet>
                  <title>Products - Arkaya Lighting</title>
                  <meta
                    name="description"
                    content="Browse through a wide range of premium lighting products and accessories designed to meet all your lighting needs."
                  />
                  <meta
                    name="keywords"
                    content="lighting products, premium lighting fixtures, lighting accessories, shop lighting, decorative lights, LED lights, lighting solutions, home lighting"
                  />
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
                  <meta
                    name="description"
                    content="Discover Arkaya Lighting's clear and simple shipping and return policies, ensuring a hassle-free shopping experience."
                  />
                  <meta
                    name="keywords"
                    content="shipping policy, returns policy, return process, delivery information, easy returns, shipping guidelines, lighting store shipping, return conditions"
                  />
                </Helmet>
                <ShippingAndReturns />
              </>
            } />
            <Route path="/privacypolicy" element={
              <>
                <Helmet>
                  <title>Privacy Policy - Arkaya Lighting</title>
                  <meta
                    name="description"
                    content="Read Arkaya Lighting's privacy policy to learn how we protect your personal data and ensure confidentiality."
                  />
                  <meta
                    name="keywords"
                    content="privacy policy, data protection, personal information security, user privacy, secure data handling, Arkaya Lighting privacy"
                  />
                </Helmet>
                <PrivacyPolicy />
              </>
            } />
            <Route path="/term&condition" element={
              <>
                <Helmet>
                  <title>Terms & Conditions - Arkaya Lighting</title>
                  <meta
                    name="description"
                    content="Read Arkaya Lighting's terms and conditions to understand our website usage policies and user agreements."
                  />
                  <meta
                    name="keywords"
                    content="terms and conditions, user agreement, website policies, usage terms, Arkaya Lighting terms, legal agreement"
                  />
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
                  <meta
                    name="description"
                    content="Create an account on Arkaya Lighting to access exclusive features, promotions, and updates on our lighting solutions."
                  />
                  <meta
                    name="keywords"
                    content="sign up, register, account creation, join Arkaya Lighting, lighting account, create account, register for lighting services"
                  />
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
              <Route path="profile" element={<UserProfile />} />
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
              <Route path="editproduct/:id" element={<EditAdminProduct />} />
            </Route>

            {/* Error Page */}
            <Route path="*" element={
              <>
                <Helmet>
                  <title>404 - Page Not Found - Arkaya Lighting</title>
                  <meta
                    name="description"
                    content="Oops! The page you are looking for doesn't exist. Return to the homepage or explore our lighting solutions."
                  />
                  <meta
                    name="keywords"
                    content="404 error, page not found, Arkaya Lighting, lighting solutions, page error, website navigation"
                  />
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