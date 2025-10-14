import { useEffect, useState } from "react";
import type { MealCategoryType } from "../types/meal-category.types";
import { getMealCategory } from "../services/meal-category-service";
import Loader from "../hooks/useLoader";
import Categories from "./Categories";

const MealCategory = () => {
  const [mealCategory, setMealCategory] = useState<MealCategoryType[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ================ loadMealCategory ==============//
  useEffect(() => {
    const loadMealCategory = async (): Promise<void> => {
      setLoading(true);
      try {
        const mealCategory = await getMealCategory();
        setMealCategory(mealCategory);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`Error Occurred ${err.message}`);
          setError(`Error Occurred ${err.name}`);
        } else {
          console.error(`Unknown Error Found ${err}`);
          setError(`Unknown Error Found!`);
        }
      } finally {
        setLoading(false);
      }
    };
    loadMealCategory();
  }, []);

  const handleLoad = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // ✅ Filtered list
  const filteredCategories = mealCategory.filter((category) =>
    category.strCategory.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  // ✅ Which list to render
  const categoriesToShow =
    searchTerm.trim() === ""
      ? filteredCategories.slice(0, visibleCount) // default case with load more
      : filteredCategories; // search করলে সব দেখাবে

  return (
    <div className="py-5 md:py-10">
      <div className="mt-2">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center pb-4 raleway">
          Our Food Categories
        </h2>
      </div>

      {/* ============= search Field ======= */}
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Search Category ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-md w-72 focus:outline-none focus:ring focus:ring-green-400"
        />
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 font-semibold text-xl text-center py-3">
          {error}
        </p>
      ) : categoriesToShow.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-8 justify-center">
            {categoriesToShow.map((category) => (
              <Categories key={category.idCategory} category={category} />
            ))}
          </div>

          {/* // =========== Load More Button (শুধু search না করলে দেখাবে) ==============// */}
          {searchTerm.trim() === "" && visibleCount < filteredCategories.length && (
            <div className="flex justify-center pt-5 md:pt-8">
              <button
                onClick={handleLoad}
                className="px-6 py-2 cursor-pointer bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-amber-600 transition hover:scale-105 duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 font-semibold text-2xl mt-6">
          No data Found.
        </p>
      )}
    </div>
  );
};

export default MealCategory;
