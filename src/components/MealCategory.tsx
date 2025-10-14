import { useState } from "react";
import type { MealCategoryType } from "../types/meal-category.types";


const MealCategory = () => {
  const [mealCategories,setMealCategories] = useState<MealCategoryType[]>([]);
  const [count,setCount] = useState<number>(6);
  const [searchTerm,setSearchTerm] = useState<string>("");

  

  // ============== Load FoodCategories ===========//


  return (
    <div>
      
    </div>
  );
};

export default MealCategory;