import type {
  MealCategoryResponse,
  MealCategoryType,

  MealTypeData,

  SingleMealResponse,
  SingleMealType,
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
export const getMealType = async (category: string): Promise<MealTypeData[]> => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    if (!response.ok) {
      throw new Error("Failed to Fetch Meal Data!");
    }
    const data = await response.json();

    return data.meals;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Failed to Fetch Meal Data ${err.message}`);
      throw new Error(`Failed to Fetch Data ${err.name}`);
    } else {
      console.error(`Unknown Error Found ${err}`);
      throw new Error(`Unknown Error Found`);
    }
  }
};

// ============= getSingleMeal ===========//
export const getSingleMeal = async (
  idMeal: number
): Promise<SingleMealType[] | null> => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    if (!response.ok) {
      throw new Error("Failed to Fetch Single Meal Data!");
    }
    const data: SingleMealResponse = await response.json();
    return data.meals || null;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Failed to Fetch Meal Data ${err.message}`);
      throw new Error(`Failed to Fetch Data ${err.name}`);
    } else {
      console.error(`Unknown Error Found ${err}`);
      throw new Error(`Unknown Error Found`);
    }
  }
};
