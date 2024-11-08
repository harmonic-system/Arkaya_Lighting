import HomeText from "../components/Home/HomeText"
import NewsLestter from "../components/Home/NewsLestter"
import Services from "../components/Home/Services"
import TestimonialSection from "../components/Home/Testimonial"
import TopCarousel from "../components/Home/TopCarousel"

const Home = () => {
    return (
        <>
            <TopCarousel />
            <HomeText />
            <Services />
            <TestimonialSection />
            <hr/>
            <NewsLestter/>
        </>
    )
}

export default Home

