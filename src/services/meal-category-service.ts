import type {
  
  MealCategoryResponse,
  MealCategoryType,
} from "../types/meal-category.types";

// ============= getMealCategory =============//
export const getMealCategory = async (): Promise<MealCategoryType[]> => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    if (!response.ok) {
      throw new Error("No Response Found!");
    }
    const data: MealCategoryResponse = await response.json();
    return data.categories;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Failed to fetch data ${err.message}`);
      throw new Error(`Failed to Fetch Data ${err.name}`);
    } else {
      console.error(`Unknown Error Occurred  ${err}`);
      throw new Error(`Unknown Error Found!`);
    }
  }
};


// ============= getMealType ========//
