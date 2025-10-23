import { useEffect, useState } from "react";
import type { MealCategoryType } from "../types/meal-category.types";
import { getMealCategory } from "../services/meal-category-service";
import Loader from "../hooks/useLoader";
import Categories from "./Categories";
import { LoaderCircle, RotateCcw } from "lucide-react";

const MealCategory = () => {
  const [mealCategories, setMealCategories] = useState<MealCategoryType[]>([]);
  const [count, setCount] = useState<number>(6);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [debounceSearch, setDebounceSearch] = useState<string>("");

  // ============== Load FoodCategories ===========//

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const response = await getMealCategory();
        setMealCategories(response);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`Failed to fetch categories ${err.message}`);
          setError(err.name);
        } else {
          console.error(`Unknown Error Found ${err}`);
          throw new Error(`Unknown `);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // ============ debounceSearch ============//
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(searchTerm.trim().toLowerCase());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // ============= Filtered list =================//
  const filteredCategories = mealCategories.filter((category) =>
    category.strCategory.toLowerCase().includes(debounceSearch)
  );

  // ============ Which list to render ===========//
  const categoriesToShow =
    debounceSearch === ""
      ? filteredCategories.slice(0, count)
      : filteredCategories;

  // ============== handleLoad =========//
  const handleLoad = () => {
    setCount((pre) => pre + 3);
  };

  // ========== handleReset ========//
  const handleReset =()=>{
    setCount(6)
  }

  return (
    <div className="py-5 md:py-10 px-5">
      <div className="mt-2">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center pb-4 raleway">
          Our Food Categories
        </h2>
      </div>

      {/* ============= search Field =======  */}
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Search Category ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-md w-72 focus:border-1 focus:border-green-400 focus:outline-none focus:ring focus:ring-green-400"
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

          {/* ========== Load More Button ========= */}

          {debounceSearch.trim() === "" && (
            <div className="flex justify-center gap-4 pt-2 md:pt-8">
              {count < mealCategories.length ? (
                <div className="flex justify-center pt-5 md:pt-8">
                  <button
                    onClick={handleLoad}
                    className="px-6 flex justify-center items-center gap-x-2 py-2 cursor-pointer bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-amber-600 transition hover:scale-105 duration-300"
                  >
                 <LoaderCircle /> Load More
                  </button>
                </div>
              ) : (
                <div className="flex justify-center pt-5 md:pt-8">
                  <button
                    onClick={handleReset}
                    className="px-6 flex justify-center items-center gap-x-2 py-2 cursor-pointer bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-amber-600 transition hover:scale-105 duration-300"
                  >
                   <RotateCcw /> Reset Category
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 font-semibold text-2xl mt-6">
          No Data Found.
        </p>
      )}
    </div>
  );
};

export default MealCategory;
