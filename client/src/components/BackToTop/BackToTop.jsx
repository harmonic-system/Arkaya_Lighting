import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowUp } from "react-icons/io";

const BackToTop = () => {

    const [isVisible, setIsVisible] = useState(false);
    const scrollTopRef = useRef(null);

    // Function to handle scroll and toggle button visibility
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top smoothly
    const handleClick = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Call handleScroll initially to set the correct state
        handleScroll();

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    return (
        <BackToTopWrapper>
            <a
                ref={scrollTopRef}
                className={`scroll-top ${isVisible ? 'active' : ''} scroll-top`} onClick={handleClick} >
                <IoIosArrowUp />
            </a>
        </BackToTopWrapper>
    )
}

export default BackToTop

const BackToTopWrapper = styled.section`
.scroll-top {
  position: fixed;
  visibility: hidden;
  opacity: 1;
  right: 15px;
  bottom: 15px;
  z-index: 99999;
  background-color: #ffc221;
  width: 40px;
  height: 40px;
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.4s;
}
  
.scroll-top svg {
  font-size: 24px;
  line-height: 0;
}
  
.scroll-top:hover {
  background-color: #ffdd73;
}
  
.scroll-top.active {
  visibility: visible;
  opacity: 1;
}
`