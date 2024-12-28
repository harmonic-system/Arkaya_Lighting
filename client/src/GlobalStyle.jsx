import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* General Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Work Sans", sans-serif;
    user-select: ${(props) => (props.isAdmin ? "text" : "none")};
  }

  html {
    font-size: 62.5%;
    overflow-x: hidden;
  }

  body {
    overflow-x: hidden;
    scrollbar-color: rgb(98 84 243);
    scrollbar-width: thin;
  }

  /* Scrollbar Styling */
  body::-webkit-scrollbar {
    width: 1.5rem;
  }

  body::-webkit-scrollbar-track {
    background-color: rgb(24 24 29);
  }

  body::-webkit-scrollbar-thumb {
    background: #fff;
    border: 5px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
  }

  /* Typography */
  h1, h2, h3, h4 {
    font-family: "Work Sans", sans-serif;
  }

  h1 {
    color: ${({ theme }) => theme.colors.heading};
    font-size: 6rem;
    font-weight: 900;
  }

  h2 {
    color: ${({ theme }) => theme.colors.heading};
    font-size: 4.4rem;
    font-weight: 300;
    white-space: normal;
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 400;
  }

  h4 {
    font-size: 1.4rem;
    font-weight: 400;
  }

  p, button {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.65rem;
    line-height: 1.5;
    font-weight: 400;
  }

  a {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  /* Reusable Code Section */
  .container {
    max-width: 130rem;
    margin: 0 auto;
    padding: 0 2rem; /* Default padding for smaller screens */
  }

  @media (min-width: 999px) and (max-width: 1370px) {
    .container {
      padding: 0 3.2rem; /* Adjust padding for medium screens */
    }
  }

  @media (max-width: 998px) {
    .container {
      max-width: 130rem;
      padding: 0 3.2rem; 
    }
  }

  /* Grid Layout */
  .grid {
    display: grid;
    gap: 9rem;
  }

  .grid-two-column {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-three-column {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-four-column {
    grid-template-columns: 1fr 1.2fr .5fr .8fr;
  }

  .grid-five-column {
    grid-template-columns: repeat(5, 1fr);
  }

  .grid-tem-view {
    grid-template-columns: repeat(4, 1fr);
  }

  /* Common Heading */
  .common-heading {
    font-size: 3.8rem;
    font-weight: 600;
    margin-bottom: 6rem;
    text-transform: capitalize;
  }

  /* Intro Data */
  .intro-data {
    margin-bottom: 0;
    text-transform: uppercase;
    color: #ffc221;
  }

  /* Caption */
  .caption {
    position: absolute;
    top: 15%;
    right: 10%;
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.helper};
    padding: 0.8rem 2rem;
    font-size: 1.2rem;
    border-radius: 2rem;
  }

  /* Input and Textarea */
  input, textarea {
    color: ${({ theme }) => theme.colors.black};
    padding: 1.6rem 2.4rem;
    border: none;
    outline: none;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
  }

  /* Submit Button */
  input[type="submit"] {
    max-width: 16rem;
    margin-top: 2rem;
    background-color: ${({ theme }) => theme.colors.btn};
    color: ${({ theme }) => theme.colors.white};
    padding: 1.4rem 2.2rem;
    border-style: solid;
    border-width: .1rem;
    text-transform: uppercase;
    font-size: 1.8rem;
    cursor: pointer;
  }

  input[type="checkbox"] {
    box-shadow: none; 
    outline: none;   
  }

  input[type="checkbox"]:focus {
    outline: none;  
    box-shadow: none; 
  }

  /* For Webkit browsers (Chrome, Safari, Edge) */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; /* Removes any margin */
  }

  /* For Firefox */
  input[type="number"] {
    -moz-appearance: textfield; /* Hides the spinner */
  }

  /* Media Queries for Grid Layout */
  @media (min-width: 200px) and (max-width: 549px) {
    .grid-tem-view {
      grid-template-columns: repeat(1, 1fr);
      gap: 2rem;
    }
  }

  @media (min-width: 550px) and (max-width: 767px) {
    .grid-tem-view {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .grid-tem-view {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }

  @media (min-width: 1025px) and (max-width: 1920px) {
    .grid-tem-view {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    html {
      font-size: 50%;
    }

    .grid {
      gap: 3.2rem;
    }

    .grid-two-column, .grid-three-column, .grid-four-column {
      grid-template-columns: 1fr;
    }
  }

  /* Title Styling */
  .title {
    text-align: center;
    padding-bottom: 60px;
  }

  .title h1 {
    font-size: 50px;
    line-height: 55px;
    color: #ffc221;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 27px;
    position: relative;
    padding-bottom: 8px;
  }

  .title span {
    color: #070500;
    font-size: 28px;
    line-height: 28px;
    margin-top: 20px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .title h1 {
      font-size: 47px;
    }

    .title span {
      font-size: 21px;
    }
  }

  @media (max-width: 575px) {
    .title h1 {
      font-size: 34px;
      line-height: 47px;
    }

    .title span {
      font-size: 21px;
    }
  }

  /* Disabled Button */
  .disabled-button {
    opacity: 0.5;
    pointer-events: none;
    visibility: hidden;
  }

`;
