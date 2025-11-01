import { Eye } from "lucide-react";
import { Link } from "react-router";

interface SelectedMealProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface SelectedMealData {
  meal : SelectedMealProps;
}

const SelectedMeal = ({ meal }: SelectedMealData) => {
  const { idMeal, strMeal, strMealThumb } = meal;
 
  console.log('idMeal',idMeal);
  return (
    <div className="bg-gray-100 hover:bg-gray-300 w-full px-5 md:px-0 md:w-1/4 py-5 rounded-md transition-all duration-200 shadow hover:shadow-lg">
      <img
        className="object-cover mx-auto w-full md:w-11/12 rounded-lg transform transition duration-500 hover:scale-105 md:hover:scale-110"
        src={strMealThumb ? strMealThumb : "Meal Image"}
      />
      <h3 className="roboto text-lg md:text-xl py-1 mt-1 md:py-3 text-center">
        {strMeal}
      </h3>

      {/* =========== View Details Button ====== */}
      <div className="pt-2 mt-1 text-center flex justify-center">
        <Link to={`/strCategory/${idMeal}`}>
        <button className="flex gap-x-1 items-center justify-center raleway hover:scale-105 text-sm bg-blue-500 text-white transition-transform duration-300 shadow hover:shadow-2xl hover:bg-amber-500 px-4 py-1 mt-1 rounded-md cursor-pointer">
        <Eye size={19}/>  View Details
        </button></Link>
      </div>
    </div>
  );
};

export default SelectedMeal;
