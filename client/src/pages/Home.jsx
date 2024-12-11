import FeatherProduct from "../components/Home/FeatherProduct"
import Hero from "../components/Home/Hero"
import HomeText from "../components/Home/HomeText"
import NewsLestter from "../components/Home/NewsLestter"
import Services from "../components/Home/Services"
import TestimonialSection from "../components/Home/Testimonial"

const Home = () => {
    return (
        <>
            <Hero />
            <HomeText />
            <FeatherProduct />
            <Services />
            <TestimonialSection />
            <hr />
            <NewsLestter />
        </>
    )
}

export default Home

