import { Link } from "react-router";

import type { MealCategoryType } from "../types/meal-category.types";

interface CategoryProps {
  category: MealCategoryType;
}

const Categories = ({ category }: CategoryProps) => {
  const { strCategory, strCategoryThumb, strCategoryDescription } = category;

  return (
    <div className="bg-gray-100 hover:bg-gray-300 w-full md:w-1/3 lg:w-1/4 p-5 rounded-md transition-all duration-200 shadow hover:shadow-lg">
      <img
        src={strCategoryThumb ? strCategoryThumb : "Food Image"}
        className="object-cover rounded-lg transform transition duration-500 hover:rotate-3 hover:scale-105"
      />
      <h3 className="roboto text-lg md:text-xl py-1 md:py-3 text-center">
        {strCategory}
      </h3>
      <p className="inter text-center">
        Description :{" "}
        {strCategoryDescription.length > 50 ? (
          <>
            {strCategoryDescription.slice(0, 50)}
            <span className="text-blue-700 cursor-pointer"> More ...</span>
          </>
        ) : (
          strCategoryDescription
        )}
      </p>
      {/* ============ Button ========== */}
      <div className="pt-2 mt-1 text-center">
        <Link to={`mealCategories/${strCategory}`}>
          <button className="raleway hover:scale-105 text-sm bg-blue-500 text-white transition-transform duration-300 shadow hover:shadow-2xl hover:bg-amber-500 px-4 py-1 mt-1 rounded-md cursor-pointer">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
