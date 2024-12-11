import React, { useEffect, useState } from 'react';
import { FaBars, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import styled from 'styled-components';
import TopCarousel from './TopCarousel';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../styles/Button';
import { useCategoryContext } from '../../context/category-context';

const Hero = () => {
    const [showCategories, setShowCategories] = useState(true);
    const { category, setCategoryinlocalStorage, getHeroSearchProducts, setHeroCategoryProduct } = useCategoryContext()
    const navigate = useNavigate()

    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        // Function to handle resizing of the window
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setShowCategories(false);
            } else {
                setShowCategories(true);
            }
        };

        // Initial check to set the state based on the current window size
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const handleSearch = (e) => {
        e.preventDefault()
        setHeroCategoryProduct(searchText)
        navigate(`/searchProducts`)
    }

    // For Placeholder

    const words = ["Controllers", "Lights", "DMX", "Connectors", "Indoor", "Outdoor", "Power Supply"]; // Words to cycle through
    const [placeholder, setPlaceholder] = useState("");
    const [index, setIndex] = useState(0); // Tracks current word
    const [charIndex, setCharIndex] = useState(0); // Tracks character position
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[index];
        let speed = isDeleting ? 100 : 200; // Speed of typing or deleting

        const timeout = setTimeout(() => {
            if (!isDeleting && charIndex < currentWord.length) {
                setCharIndex((prev) => prev + 1);
                setPlaceholder(currentWord.slice(0, charIndex + 1));
            } else if (isDeleting && charIndex > 0) {
                setCharIndex((prev) => prev - 1);
                setPlaceholder(currentWord.slice(0, charIndex - 1));
            } else if (!isDeleting) {
                setIsDeleting(true);
                speed = 1000; // Pause before deleting
            } else {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % words.length); // Move to next word
                setCharIndex(0);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, index, words]);

    return (
        <HeroWrapper>
            <div className="container">
                <div className="hero-content">
                    <div className="hero__categories">
                        <div className="hero__categories__all" onClick={toggleCategories}>
                            <FaBars />
                            <span>All Categories</span>
                        </div>
                        {showCategories && (
                            <ul className="hero__categories__list">
                                {
                                    category && category?.map((item, index) => (
                                        <li key={index}>
                                            <Link to="/products" onClick={() => setCategoryinlocalStorage(item)}>{item}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        )}
                    </div>
                    <div className="hero__search-container">
                        <div className="hero__box">
                            <div className="hero__search">
                                <form className="hero__search__form" onSubmit={handleSearch}>
                                    <input type="text" placeholder={placeholder} name="searchText" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                                    <Button type="submit">SEARCH</Button>
                                </form>
                                <div className="hero__contact">
                                    <div className="hero__contact__icon">
                                        <FaPhoneAlt />
                                        <FaEnvelope />
                                    </div>
                                    <div className="hero__contact__text">
                                        <span><a href="tel:+919873241041">+91 9873241041</a></span>
                                        <span><a href="mailto:sales@arkayalighting.com">sales@arkayalighting.com</a></span>
                                    </div>
                                </div>
                            </div>
                            <div className="hero-carousel">
                                <TopCarousel />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HeroWrapper>
    );
};

export default Hero;


const HeroWrapper = styled.section`
margin-top: 5rem;
margin-bottom: 5rem;

.hero-content {
    display: flex;
    flex-wrap: wrap; 
    width: 100%; 
    gap:2rem;
}

.hero__categories {
    background-color: #ffffff;
    border: 1px solid #ebebeb;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 1; /* This allows the div to grow */
    width: 33.33%; /* One-third width */
    position: relative;
}

.hero__categories__all {
    background-color: #ffc221;
    /* background-color: #7fad39; */
    padding: 10px 25px;
    cursor: pointer;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 2rem;
    // position: relative;
}

.hero__categories__all svg{
    font-size: 15px;
}

.hero__categories__all span{
    font-size: 15px;
}

.hero__categories__list {
    z-index:1;
    width: 90%;
    height: 80%;
    background-color: #ffffff;
    position:absolute;
    padding: 1.5rem 0;
    list-style: none;
    overflow-y: auto;
}

.hero__categories ul li {
    margin: 0;
}

.hero__categories ul li a {
    display: block;
    padding: 5px 10px;
    color: #1c1c1c;
    text-decoration: none;
    font-size: 14px;
    transition: background 0.3s;
    text-transform: uppercase;

    @media (max-width: 950px) {
        font-size: 11px;
    }
}

.hero__categories ul li a:hover {
    color:#ffc221;
    background-color: #f5f5f5;
}

.hero__search-container {
    flex: 2; /* This allows the div to grow proportionally more */
    width: 66.67%; /* Two-thirds width */
}

.hero__box{
    display: flex;
    flex-wrap: wrap; 
    flex-direction: column;
    width: 100%; 
}

.hero__search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    flex: 1; /* This allows the div to grow */
    gap: 2rem;
}

.hero__search__form {
    display: flex;
    width: 70%;
    border: 1px solid #ebebeb;
    padding: 5px;
    background-color: #ffffff;
}

.hero__search__form input {
    width: 70%;
    border: none;
    padding: 10px;
    font-size: 12px;
}

.hero__search__form input::placeholder {
    color: #b2b2b2;
}

.hero__search__form Button {
    background-color: #ffc221;
    width:30%;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero__contact {
    display: flex;
    gap:0.75rem;
    margin-top:10px;
}

.hero__contact__icon, .hero__contact__text {
    display:flex;
    flex-direction:column;
    gap: 0.5rem;
}

.hero__contact__icon svg {
    font-size: 15px;
    color: #ffc221;
}

.hero__contact__text span a {
    font-size: 12px;
    color: #6f6f6f;
}

.hero-carousel {
    width: 100%;
    flex: 1;
}

@media (max-width: 768px) {
    .hero-content .hero__categories,
    .hero-content .hero__search-container {
        width: 100%; /* Both divs take 100% of width */
    }

    .hero__categories__list{
        height: 50vh;
    }

    .hero__categories ul li a {
        font-size: 14px;
    }

    .hero__contact {
        margin-top:10px;
    }

    .hero__search__form input {
        width: 80%;
        font-size: 12px;
    }

    .hero__search__form Button {
        width:30%;
        padding: 7px 14px;
        font-size: 10px;
    }
}

@media (max-width: 461px) {

    .hero__categories ul li a {
        font-size: 10px;
    }

    .hero__search {
        display: none;
    }

   .hero__search__form input {
        width: 80%;
        font-size: 8px;
    }

    .hero__search__form Button {
        width:30%;
        padding: 3px 6px;
        font-size: 8px;
    }

    .hero__contact__icon svg {
        font-size: 10px;
        color: #ffc221;
}

    .hero__contact__text span a {
        font-size: 10px;
        color: #6f6f6f;
    }
}

`