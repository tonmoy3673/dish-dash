import { useEffect, useState } from "react";
import type { MealCategory } from "../types/meal-category.types";
import { getMealCategory } from "../services/meal-category-service";
import Loader from "../hooks/useLoader";
import Categories from "./Categories";

const MealCategory = () => {
  const [mealCategory, setMealCategory] = useState<MealCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  console.log("mealCategory", mealCategory);

  return (
    <div className="py-5 md:py-10">
      <div className="mt-2">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center pb-4 raleway">
          {" "}
          Our Food Categories{" "}
        </h2>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 font-semibold text-xl text-center py-3">
          {error}
        </p>
      ) :!loading && !error && mealCategory.length > 0 ? (
  <div className="flex flex-wrap gap-8 justify-center">
    {mealCategory.map((category) => (
      <Categories key={category.idCategory} category={category} />
    ))}
  </div>
) : (
  <p className="text-center text-gray-500 font-semibold text-2xl mt-6">
    No data Found.
  </p>
)}
      {/* ============= category titles ======== */}
    </div>
  );
};

export default MealCategory;
