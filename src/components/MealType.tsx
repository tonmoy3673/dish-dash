import { useEffect, useState } from "react";
import type { MealTypeData } from "../types/meal-category.types";
import { useParams } from "react-router";
import { getMealType } from "../services/meal-category-service";
import { LoaderCircle, RotateCcw, UtensilsCrossed } from "lucide-react";
import Loader from "../hooks/useLoader";
import SelectedMeal from "./SelectedMeal";

const MealType = () => {
  const [meals, setMeals] = useState<MealTypeData[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");
  const [displayCount, setDisplayCount] = useState<number>(6);

  const { strCategory } = useParams();
  // ================ loadMeal =======//
  useEffect(() => {
    if (!strCategory) return;
    setLoading(true);
    const fetchMeal = async (strCategory: string): Promise<void> => {
      try {
        const response = await getMealType(strCategory);
        setMeals(response);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`Failed to Fetch Data ${err.message}`);
          setError(err.message);
        } else {
          console.error(`Unknown Error Found ${err}`);
          throw new Error(`Unknown Error Found`);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMeal(strCategory);
  }, [strCategory]);
  console.log("meals", meals);

  // ============= debounceSearch ==========//
  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebounceSearch(searchTerm.toLowerCase().trim());
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  // ============== filterSearch =========//
  if (!meals) return <Loader />;
  const filterSearch =
    meals &&
    meals.filter((meal) =>
      meal?.strMeal.toLowerCase().includes(debounceSearch)
    );

  // ========== filterToDisplay ==========//
  const filterToDisplay =
    debounceSearch === "" ? filterSearch.slice(0, displayCount) : filterSearch;

  // ============== handleLoad ==========//
  const handleLoad = () => {
    setDisplayCount((prev) => prev + 3);
  };

  // =============== handleReset ===========//
  const handleReset = () => {
    setDisplayCount(6);
  };

  return (
    <div>
      {/* ============ title ======== */}
      <h2 className="text-xl md:text-2xl mt-2 md:mt-5 font-semibold text-gray-700 text-center pb-4 raleway flex items-center justify-center gap-x-2 md:gap-x-4">
        Food Lists of{" "}
        <span className="flex items-center gap-x-2">
          <UtensilsCrossed /> {strCategory}
        </span>{" "}
      </h2>

      {/* ============= search Field =======  */}
      <div className="flex justify-center mb-5 mt-1 md:mt-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search Category ..."
          className="border px-4 py-2 rounded-md w-72 focus:border-1 focus:border-green-400 focus:outline-none focus:ring focus:ring-green-400"
        />
      </div>

      {/* ================= selectedMeals =========== */}
      <div className="py-3 md:py-3">
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500 font-semibold text-xl text-center py-3">
            {error}
          </p>
        ) : filterToDisplay && filterToDisplay?.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-5 md:gap-8 justify-center">
              {filterToDisplay &&
                filterToDisplay
                  .slice(0, displayCount)
                  .map((meal) => (
                    <SelectedMeal key={meal.idMeal} meal={meal} />
                  ))}
            </div>

            {/* ============== load & reset button ======== */}
            {debounceSearch.trim() === "" && (
              <div className="flex justify-center gap-4 pt-2 md:pt-8">
                {displayCount <= filterToDisplay.length ? (
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
                      <RotateCcw /> Reset All
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
    </div>
  );
};

export default MealType;
