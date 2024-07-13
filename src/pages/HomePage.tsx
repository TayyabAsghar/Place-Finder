import Footer from "../components/Footer";
import Listings from "../components/Listings";
import Categories from "../components/Categories";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Categories />
            <Listings />
            <Footer />
        </>
    );
};

export default HomePage;