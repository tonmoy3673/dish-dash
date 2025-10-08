import type { MealCategory } from "../types/meal-category.types";

interface CategoryProps {
  category: MealCategory;
}

const Categories = ({ category }: CategoryProps) => {
  const { strCategory, strCategoryThumb, strCategoryDescription } = category;

  return (
    <div className="bg-gray-100 hover:bg-gray-300 w-full md:w-1/3 lg:w-1/4 p-5 rounded-md transition-all duration-200 shadow hover:shadow-lg">
      <img src={strCategoryThumb ? strCategoryThumb : "Food Image"} />
      <h3 className="roboto text-lg md:text-xl py-1 md:py-3 text-center">
        {strCategory}
      </h3>
      <p className="inter text-center">
        Description :{" "}
        {strCategoryDescription.length > 100 ? (
          <>
            {strCategoryDescription.slice(0, 90)}
            <span className="text-blue-700 cursor-pointer"> More ...</span>
          </>
        ) : (
          strCategoryDescription
        )}
      </p>
      {/* ============ Button ========== */}
      <div className="pt-2 mt-1 text-center">
        <button className="raleway text-sm bg-blue-500 text-white shadow hover:shadow-2xl hover:bg-amber-500 px-4 py-1 mt-1 rounded-md cursor-pointer">
          Explore
        </button>
      </div>
    </div>
  );
};

export default Categories;
