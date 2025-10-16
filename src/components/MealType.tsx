import { useEffect, useState } from "react";
import type { MealType } from "../types/meal-category.types";
import { useParams } from "react-router";
import { getMealType } from "../services/meal-category-service";
import { UtensilsCrossed } from "lucide-react";

const MealType = () => {
  const [meals, setMeals] = useState<MealType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

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
  }, []);
  console.log(meals);

  return (
    <div>
        {/* ============ title ======== */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 text-center pb-4 raleway flex items-center justify-center gap-x-2 md:gap-x-4">Food Lists of <span className="flex items-center gap-x-2"><UtensilsCrossed /> {strCategory}</span> </h2>
    </div>
  );
};

export default MealType;
