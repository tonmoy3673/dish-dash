const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/src/assets/images/bg.jpg')",
        width: "100%",
        height:"500px" ,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        
      }}
      className="mt-2 rounded-md"
    ></div>
  );
};

export default Banner;
