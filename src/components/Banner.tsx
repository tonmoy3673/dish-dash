const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/src/assets/images/bg.jpg')",
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
      <h2 className="text-white text-2xl md:text-4xl font-bold">Welcome to <span className="text-amber-500">Dish Dash</span>
        
      </h2>
      <p className="text-center pt-3 text-white font-semibold text-xl leading-3 italic"> Fast. Fresh. Delicious.</p>
      </div>

    </div>
  );
};

export default Banner;
