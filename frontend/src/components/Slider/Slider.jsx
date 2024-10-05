import React from "react";
import Slider from "react-slick";


// custom arrows 
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex",marginRight:"-20px",justifyContent:"center",alignItems:"center", borderRadius:"50%" ,background: "gray",height:"40px",width:"40px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex",marginLeft:"-20px",justifyContent:"center",alignItems:"center", borderRadius:"50%" ,background: "gray",height:"40px",width:"40px" }}
      onClick={onClick}
    />
  );
}

function ProjectSlider({gallery,cur}) {
  var settings = {
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container " >
      <Slider {...settings}>
        {gallery?.map((img,i)=>{
            console.log(gallery)
          return <div key={i} className="slider-item   ">
            <div >
                
              <img src={img} alt=""  className="w-[80%] h-[300px] object-contain ml-20 rounded-2xl max-h-full"/>
            </div>
        
          </div>
        })}
      </Slider>
    </div>
  );
}

export default ProjectSlider;