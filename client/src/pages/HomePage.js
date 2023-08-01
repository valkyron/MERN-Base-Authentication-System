import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import '../css/HomePage.css';

const HomePage = () => {
  const slides = [
    {url: './images/1.png', title: '1'},
    {url: './images/2.png', title: '2'},
    {url: './images/3.png', title: '3'},
    {url: './images/4.jpeg', title: '4'},
  ];

  const ImageSlider = ({slides}) => {
    const [currInd, setCurrInd] = useState(0);

    const sliderStyles = {
      height: '100%',
      position: 'relative',
    }

    const slideStyles = {
      width: '100%',
      height: '100%',
      borderRadius: '10px',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: `url(${process.env.PUBLIC_URL}${slides[currInd].url})`,
      transition: 'background-image 0.5s', // Add this line for the transition
    };

    const leftArrowStyles = {
      position: "absolute", 
      top: "50%", 
      transform: "translate(0, -50%)", 
      left: "32px", 
      fontSize: "45px", 
      color: "#fff", 
      zIndex: 1, 
      cursor: "pointer",
    };

    const rightArrowStyles = {
      position: "absolute", 
      top: "50%", 
      transform: "translate(0, -50%)", 
      right: "32px", 
      fontSize: "45px", 
      color: "#fff", 
      zIndex: 1, 
      cursor: "pointer",
    };

    const dotsContainerStyles = {
      display: "flex",
      justifyContent: "center",
    };

    const dotStyle = {
      margin: "0 3px",
      cursor: "pointer",
      fontSize: "20px",
    };

    const goToPrevious = () => {
      const isFirstSlide = currInd === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currInd - 1;
      setCurrInd(newIndex);
    };
    const goToNext = () => {
      const isLastSlide = currInd === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currInd + 1;
      setCurrInd(newIndex);
    };

    // Use useEffect to automatically switch to the next slide every 5 seconds
    useEffect(() => {
      const interval = setInterval(goToNext, 5000); // 5000ms = 5 seconds

      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currInd]); // Re-run the effect whenever currInd changes

    const goToSlide = (slideIndex) => {
      setCurrInd(slideIndex);
    };

    return (
      <div style={sliderStyles}>
        <div style={leftArrowStyles} onClick={goToPrevious}>❰</div>
        <div style={rightArrowStyles} onClick={goToNext}>❱</div>
        <div style={slideStyles}></div>
        <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div style={dotStyle} key={slideIndex} onClick={() => goToSlide(slideIndex)} > ● </div>
        ))}
      </div>

      </div>
    )
  }

  const containerStyles = {
  width: '750px', // 500px * 1.5
  height: '420px', // 280px * 1.5
    margin: "0 auto",
  };

  return (
    <Layout>
      <br/>
      <h1>Central Wool Development Board</h1>
      <h3>Ministry of Textiles - Govt. Of India</h3>

      <div style={containerStyles}>
        <ImageSlider slides={slides}></ImageSlider>
      </div>

      <br/><br/>
      <p>Welcome to Central Wool Development Board With a view to harmonize various diversified Interest among different sectors of wool 
      industry for an Integrated Policy Development of entire industry, the Central Wool Development Board was constituted in July, 1987 
      with its head quarter at Jodhpur, Rajasthan. The Board has started functions since 1989. The Board has been assigned functions for 
      growth and development of wool and woollens, marketing intelligence, marketing of wool and woollens, price stabilization, testing 
      sof wool and woollens, product development and advise to the Government on policy matters and coordination etc.</p>

    </Layout>
  );
};

export default HomePage;
