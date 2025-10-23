import { useEffect, useState } from "react";
import type { MealType } from "../types/meal-category.types";
import { useParams } from "react-router";
import { getMealType } from "../services/meal-category-service";
import { UtensilsCrossed } from "lucide-react";
import SelectedMeal from "./SelectedMeal";
import Loader from "../hooks/useLoader";

const MealType = () => {
  const [meals, setMeals] = useState<MealType[]>( []);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  const { strCategory } = useParams();
  // ================ loadMeal =======//
  useEffect(() => {
    if (!strCategory) return;
    setLoading(true);
    const fetchMeal = async (strCategory: string): Promise<void> => {
      try {
        const response  = await getMealType(strCategory);
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
  console.log('meals',meals);

  return (
    <div>
      {/* ============ title ======== */}
      <h2 className="text-xl md:text-2xl mt-2 md:mt-5 font-semibold text-gray-700 text-center pb-4 raleway flex items-center justify-center gap-x-2 md:gap-x-4">
        Food Lists of{" "}
        <span className="flex items-center gap-x-2">
          <UtensilsCrossed /> {strCategory}
        </span>{" "}
      </h2>

     

      {/* ================= selectedMeals =========== */}
      <div className="py-3 md:py-8">
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500 font-semibold text-xl text-center py-3">
            {error}
          </p>
        ) : meals && meals?.length > 0 ? (
          <div className="flex flex-wrap gap-5 md:gap-12 justify-center">
            {meals.map((meal)=> <SelectedMeal key={meal.idMeal} meal={meal}/>)}
            
          </div>
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
