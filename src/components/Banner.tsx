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
      className="mt-2 rounded-md flex justify-center items-center"
    >
        {/* =============== banner title ============ */}
      <div className="">
      <h2 className="text-white text-2xl md:text-4xl">Welcome to Dish Dash
        
      </h2>
      <p> Fast. Fresh. Delicious.</p>
      </div>

    </div>
  );
};

export default Banner;
