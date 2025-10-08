import { useEffect, useState } from "react";
import type { MealCategory } from "../types/meal-category.types";
import { getMealCategory } from "../services/meal-category-service";

const MealCategory = () => {
  const [mealCategory, setMealCategory] = useState<MealCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
          throw new Error(`Error Occurred ${err.name}`);
        } else {
          console.error(`Unknown Error Found ${err}`);
          throw new Error(`Unknown Error Found!`);
        }
      }
      finally{
        setLoading(false)
      }
    };
    loadMealCategory();
  }, []);

  console.log('mealCategory',mealCategory);
  return (
    <div>
        MealCategory

    </div>
  );
};

export default MealCategory;
