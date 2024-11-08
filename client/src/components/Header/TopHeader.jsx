import React from 'react'
import styled from 'styled-components'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const TopHeader = () => {
  return (
    <>
      <Wrapper>
        <div className="top_header">
          <ul className="social_link">
            <li> <a target="_blank" href="https://www.facebook.com/profile.php?id=61550851665100"><strong><FaFacebook /></strong></a></li>
            {/* <li> <a target="_blank" href="#"><FaTwitter /></a></li> */}
            <li> <a target="_blank" href="https://www.instagram.com/arkayalighting/"><FaInstagram /></a></li>
            {/* <li> <a target="_blank" href="#"><FaLinkedin /></a></li> */}
          </ul>
          <div className="top-box">
            <p><b><strong>We Bright Your Space</strong></b></p>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default TopHeader

const Wrapper = styled.section`
 background: #ffc221;
 width: 100vw;
 height:50px;
 text-align: center;

.top_header {
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: space-between;
 padding:0 5rem;
 align-items: center;
    ul.social_link {
        li{
          display: inline-block;
            a {
              color: #000;
              width: 50px;
              height: 100%;
              float: left;
              text-align: center;
              line-height: 40px;
              border-radius: 100%;
              font-size: 18px;
              
              svg {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
                font-weight: 400;
              }
            }
            a:hover{
              color: #fff;
            }
        }
    }

    .top-box p{
      color: #000 !important;
      height: 100%;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
    }
}
@media (max-width: ${({ theme }) => theme.media.mobile}) {
  display: none;
}
`